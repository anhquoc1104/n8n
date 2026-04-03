import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/externalSecrets.ee.ts
const getExternalSecrets = async (context) => {
	return await makeRestApiRequest(context, "GET", "/external-secrets/secrets");
};
/**
* @deprecated use getGlobalExternalSecretsForProject instead
*/
const getGlobalExternalSecrets = async (context) => {
	return await makeRestApiRequest(context, "GET", "/secret-providers/completions/secrets/global");
};
/**
* Global secrets in project context (project-scoped auth).
*/
const getGlobalExternalSecretsForProject = async (context, projectId) => {
	return await makeRestApiRequest(context, "GET", `/secret-providers/completions/secrets/global/${projectId}`);
};
/**
* @beta still under development
*/
const getProjectExternalSecrets = async (context, projectId) => {
	return await makeRestApiRequest(context, "GET", `/secret-providers/completions/secrets/project/${projectId}`);
};
const getExternalSecretsProviders = async (context) => {
	return await makeRestApiRequest(context, "GET", "/external-secrets/providers");
};
const getExternalSecretsProvider = async (context, id) => {
	return await makeRestApiRequest(context, "GET", `/external-secrets/providers/${id}`);
};
const testExternalSecretsProviderConnection = async (context, id, data) => {
	return await makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/test`, data);
};
const updateProvider = async (context, id, data) => {
	return await makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}`, data);
};
const reloadProvider = async (context, id) => {
	return await makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/update`);
};
const connectProvider = async (context, id, connected) => {
	return await makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/connect`, { connected });
};
const updateExternalSecretsSettings = async (context, data) => {
	return await makeRestApiRequest(context, "POST", "/external-secrets/settings", data);
};

//#endregion
export { getGlobalExternalSecrets as a, reloadProvider as c, updateProvider as d, getExternalSecretsProviders as i, testExternalSecretsProviderConnection as l, getExternalSecrets as n, getGlobalExternalSecretsForProject as o, getExternalSecretsProvider as r, getProjectExternalSecrets as s, connectProvider as t, updateExternalSecretsSettings as u };
//# sourceMappingURL=externalSecrets.ee.mjs.map