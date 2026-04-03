"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureActivityCallback = exports.microsoftMcpServers = void 0;
exports.extractActivityInfo = extractActivityInfo;
exports.buildMcpToolName = buildMcpToolName;
exports.createMicrosoftAgentApplication = createMicrosoftAgentApplication;
exports.getMicrosoftMcpTools = getMicrosoftMcpTools;
exports.disposeActivityResources = disposeActivityResources;
exports.configureAdapterProcessCallback = configureAdapterProcessCallback;
const agents_hosting_1 = require("@microsoft/agents-hosting");
const n8n_workflow_1 = require("n8n-workflow");
const agents_a365_observability_1 = require("@microsoft/agents-a365-observability");
const agents_activity_1 = require("@microsoft/agents-activity");
const uuid_1 = require("uuid");
const langchain_utils_1 = require("./langchain-utils");
const agents_a365_tooling_1 = require("@microsoft/agents-a365-tooling");
const n8n_core_1 = require("n8n-core");
const utils_1 = require("../../mcp/shared/utils");
const utils_2 = require("../../mcp/McpClientTool/utils");
function extractActivityInfo(activity) {
    return {
        id: activity.id,
        type: activity.type,
        channelId: activity.channelId,
        conversationId: activity.conversation?.id,
        from: activity.from
            ? {
                id: activity.from.id,
                name: activity.from.name,
            }
            : undefined,
        recipient: activity.recipient
            ? {
                id: activity.recipient.id,
                name: activity.recipient.name,
            }
            : undefined,
        timestamp: activity.timestamp instanceof Date ? activity.timestamp.toISOString() : activity.timestamp,
        locale: activity.locale,
    };
}
exports.microsoftMcpServers = [
    { name: 'Admin 365', value: 'mcp_Admin365_GraphTools' },
    { name: 'Admin Tools', value: 'mcp_AdminTools' },
    { name: 'Calendar', value: 'mcp_CalendarTools' },
    { name: 'DA Search', value: 'mcp_DASearch' },
    { name: 'Excel', value: 'mcp_ExcelServer' },
    { name: 'Knowledge', value: 'mcp_KnowledgeTools' },
    { name: 'M365 Copilot', value: 'mcp_M365Copilot' },
    { name: 'Mail', value: 'mcp_MailTools' },
    { name: 'OneDrive', value: 'mcp_OneDriveRemoteServer' },
    { name: 'OneDrive & SharePoint', value: 'mcp_ODSPRemoteServer' },
    { name: 'Planner', value: 'mcp_PlannerServer' },
    { name: 'SharePoint', value: 'mcp_SharePointRemoteServer' },
    { name: 'SharePoint Lists', value: 'mcp_SharePointListsTools' },
    { name: 'Task Personalization', value: 'mcp_TaskPersonalizationServer' },
    { name: 'Teams', value: 'mcp_TeamsServer' },
    { name: 'Teams Canary', value: 'mcp_TeamsCanaryServer' },
    { name: 'Teams V1', value: 'mcp_TeamsServerV1' },
    { name: 'Web Search', value: 'mcp_WebSearchTools' },
    { name: 'Windows 365 Computer Use', value: 'mcp_W365ComputerUse' },
    { name: 'Word', value: 'mcp_WordServer' },
];
const MS_TENANT_ID_HEADER = 'x-ms-tenant-id';
const MAX_MCP_TOOL_NAME_LENGTH = 64;
function buildMcpToolName(serverName, toolName) {
    const sanitizedServerName = serverName.replace(/[^a-zA-Z0-9]/g, '_');
    const fullName = `${sanitizedServerName}_${toolName}`;
    if (fullName.length <= MAX_MCP_TOOL_NAME_LENGTH) {
        return fullName;
    }
    const maxPrefixLen = MAX_MCP_TOOL_NAME_LENGTH - toolName.length - 1;
    return maxPrefixLen > 0 ? `${sanitizedServerName.slice(0, maxPrefixLen)}_${toolName}` : toolName;
}
function isMicrosoftObservabilityEnabled() {
    return (process.env.ENABLE_OBSERVABILITY === 'true' &&
        process.env.ENABLE_A365_OBSERVABILITY_EXPORTER === 'true');
}
function createMicrosoftAgentApplication(credentials) {
    const authConfig = createAuthConfig(credentials);
    const adapter = new agents_hosting_1.CloudAdapter(authConfig);
    const storage = new agents_hosting_1.MemoryStorage();
    const agent = new agents_hosting_1.AgentApplication({
        adapter,
        storage,
        authorization: {
            agentic: {
                type: 'agentic',
                scopes: ['https://graph.microsoft.com/.default'],
            },
        },
    });
    return agent;
}
async function getMicrosoftMcpTools(turnContext, authorization, mcpAuthToken, selectedTools) {
    const configService = new agents_a365_tooling_1.McpToolServerConfigurationService();
    let servers = await configService.listToolServers(turnContext, authorization, 'agentic', mcpAuthToken);
    if (servers.length === 0)
        return undefined;
    if (selectedTools?.length) {
        servers = servers.filter((server) => selectedTools.includes(server.mcpServerName));
    }
    const tenantId = turnContext.activity.recipient?.tenantId || turnContext.activity?.channelData?.tenant?.id;
    const toolkits = [];
    const clients = [];
    const mcpToolCallLogs = [];
    const timeout = 60000;
    for (const server of servers) {
        const headers = {};
        if (mcpAuthToken) {
            headers['Authorization'] = `Bearer ${mcpAuthToken}`;
        }
        if (tenantId) {
            headers[MS_TENANT_ID_HEADER] = tenantId;
        }
        const clientResult = await (0, utils_1.connectMcpClient)({
            serverTransport: 'httpStreamable',
            endpointUrl: server.url,
            headers,
            name: 'Microsoft-Agent-365',
            version: 1,
        });
        if (!clientResult.ok) {
            console.error(`Failed to connect to MCP server ${server.mcpServerName}:`, clientResult.error);
            continue;
        }
        const client = clientResult.result;
        clients.push(client);
        let mcpTools;
        try {
            mcpTools = await (0, utils_1.getAllTools)(client);
        }
        catch (error) {
            console.error(`Failed to get tools from MCP server ${server.mcpServerName}:`, error);
            continue;
        }
        const serverName = server.mcpServerName;
        const serverTools = mcpTools.map((tool) => {
            const prefixedName = buildMcpToolName(serverName, tool.name);
            const callToolWithLogging = async (args) => {
                let isError = false;
                const callTool = (0, utils_2.createCallTool)(tool.name, client, timeout, (errorMessage) => {
                    console.error(`Tool "${tool.name}" execution error:`, errorMessage);
                    isError = true;
                });
                const start = Date.now();
                const result = await callTool(args);
                mcpToolCallLogs.push({
                    serverName,
                    toolName: prefixedName,
                    input: args,
                    output: result,
                    isError,
                    durationMs: Date.now() - start,
                    timestamp: new Date().toISOString(),
                });
                return result;
            };
            return (0, utils_2.mcpToolToDynamicTool)({ ...tool, name: prefixedName }, callToolWithLogging);
        });
        if (serverTools.length > 0) {
            toolkits.push(new n8n_core_1.StructuredToolkit(serverTools));
        }
    }
    if (toolkits.length === 0)
        return undefined;
    return {
        toolkits,
        logs: mcpToolCallLogs,
        client: {
            async close() {
                await Promise.all(clients.map(async (c) => await c.close()));
            },
        },
    };
}
const configureActivityCallback = (nodeContext, credentials, mcpTokenRef, authorization, activityCapture) => {
    const systemPrompt = nodeContext.getNodeParameter('systemPrompt');
    const { clientId, tenantId } = credentials;
    return async (turnContext) => {
        const agentId = turnContext.activity.recipient?.agenticAppId ?? clientId;
        const agentName = turnContext.activity.recipient?.name ?? 'Microsoft Agent 365';
        const tenantDetails = {
            tenantId: turnContext.activity.recipient?.tenantId ?? tenantId ?? '',
        };
        const conversationId = turnContext.activity.conversation?.id;
        const inputText = turnContext.activity.text || '';
        const baggageScope = new agents_a365_observability_1.BaggageBuilder()
            .tenantId(tenantDetails.tenantId)
            .agentId(agentId)
            .correlationId((0, uuid_1.v4)())
            .agentName(agentName)
            .conversationId(conversationId)
            .build();
        await baggageScope.run(async () => {
            const invokeAgentDetails = {
                agentId,
                agentName,
                conversationId,
                request: {
                    content: inputText || 'Unknown text',
                    executionType: agents_a365_observability_1.ExecutionType.HumanToAgent,
                    sessionId: conversationId,
                },
            };
            const invokeAgentScope = agents_a365_observability_1.InvokeAgentScope.start(invokeAgentDetails, tenantDetails);
            await invokeAgentScope.withActiveSpanAsync(async () => {
                invokeAgentScope.recordInputMessages([inputText || 'Unknown text']);
                let mcpClient = undefined;
                let microsoftMcpToolkits = undefined;
                let mcpLogs = undefined;
                if (mcpTokenRef.token) {
                    try {
                        const useMcpTools = nodeContext.getNodeParameter('useMcpTools', false);
                        if (useMcpTools) {
                            let selectedTools = undefined;
                            const include = nodeContext.getNodeParameter('include', 'all');
                            if (include === 'selected') {
                                const selected = nodeContext.getNodeParameter('includeTools', []);
                                selectedTools = exports.microsoftMcpServers
                                    .filter((server) => selected.includes(server.value))
                                    .map((server) => server.value);
                            }
                            const result = await getMicrosoftMcpTools(turnContext, authorization, mcpTokenRef.token, selectedTools);
                            mcpClient = result?.client;
                            microsoftMcpToolkits = result?.toolkits;
                            mcpLogs = result?.logs;
                        }
                    }
                    catch (error) {
                        console.log('Error retrieving MCP tools');
                    }
                }
                try {
                    const response = await (0, langchain_utils_1.invokeAgent)(nodeContext, inputText, systemPrompt, {
                        configurable: { thread_id: turnContext.activity.conversation.id },
                    }, microsoftMcpToolkits);
                    invokeAgentScope.recordOutputMessages([`n8n Agent Response: ${response}`]);
                    await turnContext.sendActivity(response);
                }
                finally {
                    if (mcpLogs?.length) {
                        activityCapture.mcpToolLogs = mcpLogs;
                    }
                    await disposeActivityResources(invokeAgentScope, mcpClient);
                }
            });
        });
    };
};
exports.configureActivityCallback = configureActivityCallback;
async function disposeActivityResources(invokeAgentScope, mcpClient) {
    try {
        invokeAgentScope.dispose();
    }
    catch (error) {
        console.error('Failed to dispose invokeAgentScope:', error);
    }
    if (mcpClient) {
        try {
            await mcpClient.close();
        }
        catch (error) {
            console.error('Failed to close MCP client connections:', error);
        }
    }
}
function configureAdapterProcessCallback(nodeContext, agent, credentials, activityCapture) {
    return async (turnContext) => {
        let observability;
        if (isMicrosoftObservabilityEnabled()) {
            const observabilityScopes = [
                ...agents_a365_observability_1.defaultObservabilityConfigurationProvider.getConfiguration()
                    .observabilityAuthenticationScopes,
            ];
            const { token: aauToken } = await agent.authorization.exchangeToken(turnContext, observabilityScopes, 'agentic');
            observability = agents_a365_observability_1.ObservabilityManager.configure((builder) => builder
                .withService('n8n-microsoft-agent-365')
                .withTokenResolver((_agentId, _tenantId) => aauToken || ''));
            observability.start();
        }
        const mcpTokenRef = { token: undefined };
        try {
            turnContext.turnState.set('AgenticAuthorization/agentic', undefined);
            const tokenResult = await agent.authorization.exchangeToken(turnContext, 'agentic', {
                scopes: [
                    agents_a365_tooling_1.defaultToolingConfigurationProvider.getConfiguration().mcpPlatformAuthenticationScope,
                ],
            });
            mcpTokenRef.token = tokenResult.token;
        }
        catch (error) {
            console.error('Error getting MCP token');
        }
        try {
            const originalSendActivity = turnContext.sendActivity.bind(turnContext);
            activityCapture.input = turnContext.activity.text || '';
            activityCapture.activity = extractActivityInfo(turnContext.activity);
            const sendActivityWrapper = async (activityOrText) => {
                if (typeof activityOrText === 'string') {
                    activityCapture.output.push(activityOrText);
                }
                else if (activityOrText.text) {
                    activityCapture.output.push(activityOrText.text);
                }
                return await originalSendActivity(activityOrText);
            };
            turnContext.sendActivity = sendActivityWrapper;
            const welcomeMessage = nodeContext.getNodeParameter('options.welcomeMessage', "Hello! I'm here to help you!");
            agent.onConversationUpdate('membersAdded', async (context) => {
                await context.sendActivity(welcomeMessage);
            });
            const onActivity = (0, exports.configureActivityCallback)(nodeContext, credentials, mcpTokenRef, agent.authorization, activityCapture);
            agent.onActivity(agents_activity_1.ActivityTypes.Message, onActivity, ['agentic']);
            await agent.run(turnContext);
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(nodeContext.getNode(), error);
        }
        finally {
            if (observability) {
                try {
                    const OBSERVABILITY_SHUTDOWN_TIMEOUT_MS = 5000;
                    await Promise.race([
                        observability.shutdown(),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Observability shutdown timed out')), OBSERVABILITY_SHUTDOWN_TIMEOUT_MS)),
                    ]);
                }
                catch (error) {
                    console.warn('Failed to shut down observability:', error);
                }
            }
        }
    };
}
const createAuthConfig = (credentials) => {
    const { clientId, tenantId, clientSecret } = credentials;
    const connections = new Map();
    connections.set('serviceConnection', {
        clientId,
        clientSecret,
        tenantId,
        authority: 'https://login.microsoftonline.com',
        issuers: [
            'https://api.botframework.com',
            `https://sts.windows.net/${tenantId}/`,
            `https://login.microsoftonline.com/${tenantId}/v2.0`,
        ],
    });
    const config = {
        clientId,
        clientSecret,
        tenantId,
        authority: 'https://login.microsoftonline.com',
        issuers: [
            'https://api.botframework.com',
            `https://sts.windows.net/${tenantId}/`,
            `https://login.microsoftonline.com/${tenantId}/v2.0`,
        ],
        connections,
        connectionsMap: [
            {
                connection: 'serviceConnection',
                serviceUrl: '*',
            },
        ],
    };
    return config;
};
//# sourceMappingURL=microsoft-utils.js.map