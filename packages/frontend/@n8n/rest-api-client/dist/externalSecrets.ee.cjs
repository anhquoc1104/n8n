const require_utils = require('./utils2.cjs');

//#region src/api/externalSecrets.ee.ts
const getExternalSecrets = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/external-secrets/secrets");
};
/**
* @deprecated use getGlobalExternalSecretsForProject instead
*/
const getGlobalExternalSecrets = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/secret-providers/completions/secrets/global");
};
/**
* Global secrets in project context (project-scoped auth).
*/
const getGlobalExternalSecretsForProject = async (context, projectId) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/secret-providers/completions/secrets/global/${projectId}`);
};
/**
* @beta still under development
*/
const getProjectExternalSecrets = async (context, projectId) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/secret-providers/completions/secrets/project/${projectId}`);
};
const getExternalSecretsProviders = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/external-secrets/providers");
};
const getExternalSecretsProvider = async (context, id) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/external-secrets/providers/${id}`);
};
const testExternalSecretsProviderConnection = async (context, id, data) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/test`, data);
};
const updateProvider = async (context, id, data) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}`, data);
};
const reloadProvider = async (context, id) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/update`);
};
const connectProvider = async (context, id, connected) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/external-secrets/providers/${id}/connect`, { connected });
};
const updateExternalSecretsSettings = async (context, data) => {
	return await require_utils.makeRestApiRequest(context, "POST", "/external-secrets/settings", data);
};

//#endregion
Object.defineProperty(exports, 'connectProvider', {
  enumerable: true,
  get: function () {
    return connectProvider;
  }
});
Object.defineProperty(exports, 'getExternalSecrets', {
  enumerable: true,
  get: function () {
    return getExternalSecrets;
  }
});
Object.defineProperty(exports, 'getExternalSecretsProvider', {
  enumerable: true,
  get: function () {
    return getExternalSecretsProvider;
  }
});
Object.defineProperty(exports, 'getExternalSecretsProviders', {
  enumerable: true,
  get: function () {
    return getExternalSecretsProviders;
  }
});
Object.defineProperty(exports, 'getGlobalExternalSecrets', {
  enumerable: true,
  get: function () {
    return getGlobalExternalSecrets;
  }
});
Object.defineProperty(exports, 'getGlobalExternalSecretsForProject', {
  enumerable: true,
  get: function () {
    return getGlobalExternalSecretsForProject;
  }
});
Object.defineProperty(exports, 'getProjectExternalSecrets', {
  enumerable: true,
  get: function () {
    return getProjectExternalSecrets;
  }
});
Object.defineProperty(exports, 'reloadProvider', {
  enumerable: true,
  get: function () {
    return reloadProvider;
  }
});
Object.defineProperty(exports, 'testExternalSecretsProviderConnection', {
  enumerable: true,
  get: function () {
    return testExternalSecretsProviderConnection;
  }
});
Object.defineProperty(exports, 'updateExternalSecretsSettings', {
  enumerable: true,
  get: function () {
    return updateExternalSecretsSettings;
  }
});
Object.defineProperty(exports, 'updateProvider', {
  enumerable: true,
  get: function () {
    return updateProvider;
  }
});
//# sourceMappingURL=externalSecrets.ee.cjs.map