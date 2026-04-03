"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSearchProjectsTool = void 0;
const zod_1 = __importDefault(require("zod"));
const mcp_constants_1 = require("../mcp.constants");
const MAX_RESULTS = 100;
const inputSchema = {
    query: zod_1.default.string().optional().describe('Filter projects by name (case-insensitive partial match)'),
    type: zod_1.default
        .enum(['personal', 'team'])
        .optional()
        .describe("Filter by project type. 'team' for shared team projects, 'personal' for personal projects."),
    limit: zod_1.default
        .number()
        .int()
        .positive()
        .max(MAX_RESULTS)
        .optional()
        .describe(`Limit the number of results (max ${MAX_RESULTS})`),
};
const outputSchema = {
    data: zod_1.default
        .array(zod_1.default.object({
        id: zod_1.default.string().describe('The unique identifier of the project'),
        name: zod_1.default.string().describe('The name of the project'),
        type: zod_1.default.enum(['personal', 'team']).describe("The project type: 'personal' or 'team'"),
    }))
        .describe('List of projects matching the query'),
    count: zod_1.default.number().int().min(0).describe('Total number of matching projects'),
};
const createSearchProjectsTool = (user, projectRepository, telemetry) => ({
    name: 'search_projects',
    config: {
        description: 'Search for projects accessible to the current user. Use this to find a project ID before creating a workflow in a specific project.',
        inputSchema,
        outputSchema,
        annotations: {
            title: 'Search Projects',
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: false,
        },
    },
    handler: async ({ query, type, limit = MAX_RESULTS, }) => {
        const telemetryPayload = {
            user_id: user.id,
            tool_name: 'search_projects',
            parameters: { query, type, limit },
        };
        try {
            const [projects, count] = await projectRepository.getAccessibleProjectsAndCount(user.id, {
                search: query,
                type,
                take: Math.min(Math.max(1, limit), MAX_RESULTS),
            });
            const data = projects.map((project) => ({
                id: project.id,
                name: project.name,
                type: project.type,
            }));
            telemetryPayload.results = {
                success: true,
                data: { count },
            };
            telemetry.track(mcp_constants_1.USER_CALLED_MCP_TOOL_EVENT, telemetryPayload);
            const output = { data, count };
            return {
                content: [{ type: 'text', text: JSON.stringify(output) }],
                structuredContent: output,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            telemetryPayload.results = {
                success: false,
                error: errorMessage,
            };
            telemetry.track(mcp_constants_1.USER_CALLED_MCP_TOOL_EVENT, telemetryPayload);
            const output = { data: [], count: 0, error: errorMessage };
            return {
                content: [{ type: 'text', text: JSON.stringify(output) }],
                structuredContent: output,
                isError: true,
            };
        }
    },
});
exports.createSearchProjectsTool = createSearchProjectsTool;
//# sourceMappingURL=search-projects.tool.js.map