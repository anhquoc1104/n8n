let __vueuse_core = require("@vueuse/core");
let pinia = require("pinia");

//#region src/useAgentRequestStore.ts
const LOCAL_STORAGE_AGENT_REQUESTS = "N8N_AGENT_REQUESTS";
const useAgentRequestStore = (0, pinia.defineStore)("agentRequest", () => {
	const agentRequests = (0, __vueuse_core.useLocalStorage)(LOCAL_STORAGE_AGENT_REQUESTS, {});
	const ensureWorkflowAndNodeExist = (workflowId, nodeId) => {
		if (!agentRequests.value[workflowId]) agentRequests.value[workflowId] = {};
		if (!agentRequests.value[workflowId][nodeId]) agentRequests.value[workflowId][nodeId] = { query: {} };
	};
	const getAgentRequests = (workflowId, nodeId) => {
		return agentRequests.value[workflowId]?.[nodeId]?.query || {};
	};
	const getQueryValue = (workflowId, nodeId, nodeName, paramName) => {
		const query = agentRequests.value[workflowId]?.[nodeId]?.query?.[nodeName];
		if (typeof query === "string" || !paramName) return query;
		return query?.[paramName];
	};
	const setAgentRequestForNode = (workflowId, nodeId, request) => {
		ensureWorkflowAndNodeExist(workflowId, nodeId);
		agentRequests.value[workflowId][nodeId] = {
			...request,
			query: { ...request.query }
		};
	};
	const clearAgentRequests = (workflowId, nodeId) => {
		if (agentRequests.value[workflowId]) agentRequests.value[workflowId][nodeId] = { query: {} };
	};
	const clearAllAgentRequests = (workflowId) => {
		if (workflowId) agentRequests.value[workflowId] = {};
		else agentRequests.value = {};
	};
	const getAgentRequest = (workflowId, nodeId) => {
		if (agentRequests.value[workflowId]) return agentRequests.value[workflowId]?.[nodeId];
	};
	return {
		agentRequests,
		getAgentRequests,
		getQueryValue,
		setAgentRequestForNode,
		clearAgentRequests,
		clearAllAgentRequests,
		getAgentRequest
	};
});

//#endregion
exports.useAgentRequestStore = useAgentRequestStore;
//# sourceMappingURL=useAgentRequestStore.cjs.map