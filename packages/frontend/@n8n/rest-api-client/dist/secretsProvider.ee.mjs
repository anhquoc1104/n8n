import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/secretsProvider.ee.ts
const getSecretProviderTypes = async (context) => {
	return await makeRestApiRequest(context, "GET", "/secret-providers/types");
};
const getSecretProviderConnections = async (context) => {
	return await makeRestApiRequest(context, "GET", "/secret-providers/connections");
};
const getSecretProviderConnectionByKey = async (context, providerKey) => {
	return await makeRestApiRequest(context, "GET", `/secret-providers/connections/${providerKey}`);
};
const createSecretProviderConnection = async (context, data) => {
	return await makeRestApiRequest(context, "POST", "/secret-providers/connections", data);
};
const updateSecretProviderConnection = async (context, providerKey, data) => {
	return await makeRestApiRequest(context, "PATCH", `/secret-providers/connections/${providerKey}`, data);
};
const enableSecretProviderConnection = async (context, providerKey) => {
	return await makeRestApiRequest(context, "PATCH", `/secret-providers/connections/${providerKey}`, { isEnabled: true });
};
const testSecretProviderConnection = async (context, providerKey) => {
	return await makeRestApiRequest(context, "POST", `/secret-providers/connections/${providerKey}/test`);
};
const reloadSecretProviderConnection = async (context, providerKey) => {
	return await makeRestApiRequest(context, "POST", `/secret-providers/connections/${providerKey}/reload`);
};
const deleteSecretProviderConnection = async (context, providerKey) => {
	return await makeRestApiRequest(context, "DELETE", `/secret-providers/connections/${providerKey}`);
};
const getProjectSecretProviderConnectionsByProjectId = async (context, projectId) => {
	return await makeRestApiRequest(context, "GET", `/secret-providers/projects/${projectId}/connections`);
};
const getProjectSecretProviderConnectionByKey = async (context, projectId, providerKey) => {
	return await makeRestApiRequest(context, "GET", `/secret-providers/projects/${projectId}/connections/${providerKey}`);
};
const createProjectSecretProviderConnection = async (context, projectId, data) => {
	return await makeRestApiRequest(context, "POST", `/secret-providers/projects/${projectId}/connections`, data);
};
const updateProjectSecretProviderConnection = async (context, projectId, providerKey, data) => {
	return await makeRestApiRequest(context, "PATCH", `/secret-providers/projects/${projectId}/connections/${providerKey}`, data);
};
const testProjectSecretProviderConnection = async (context, projectId, providerKey) => {
	return await makeRestApiRequest(context, "POST", `/secret-providers/projects/${projectId}/connections/${providerKey}/test`);
};
const deleteProjectSecretProviderConnection = async (context, projectId, providerKey) => {
	return await makeRestApiRequest(context, "DELETE", `/secret-providers/projects/${projectId}/connections/${providerKey}`);
};

//#endregion
export { enableSecretProviderConnection as a, getSecretProviderConnectionByKey as c, reloadSecretProviderConnection as d, testProjectSecretProviderConnection as f, updateSecretProviderConnection as h, deleteSecretProviderConnection as i, getSecretProviderConnections as l, updateProjectSecretProviderConnection as m, createSecretProviderConnection as n, getProjectSecretProviderConnectionByKey as o, testSecretProviderConnection as p, deleteProjectSecretProviderConnection as r, getProjectSecretProviderConnectionsByProjectId as s, createProjectSecretProviderConnection as t, getSecretProviderTypes as u };
//# sourceMappingURL=secretsProvider.ee.mjs.map