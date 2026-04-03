const require_utils = require('./utils2.cjs');

//#region src/api/secretsProvider.ee.ts
const getSecretProviderTypes = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/secret-providers/types");
};
const getSecretProviderConnections = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/secret-providers/connections");
};
const getSecretProviderConnectionByKey = async (context, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/secret-providers/connections/${providerKey}`);
};
const createSecretProviderConnection = async (context, data) => {
	return await require_utils.makeRestApiRequest(context, "POST", "/secret-providers/connections", data);
};
const updateSecretProviderConnection = async (context, providerKey, data) => {
	return await require_utils.makeRestApiRequest(context, "PATCH", `/secret-providers/connections/${providerKey}`, data);
};
const enableSecretProviderConnection = async (context, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "PATCH", `/secret-providers/connections/${providerKey}`, { isEnabled: true });
};
const testSecretProviderConnection = async (context, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/secret-providers/connections/${providerKey}/test`);
};
const reloadSecretProviderConnection = async (context, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/secret-providers/connections/${providerKey}/reload`);
};
const deleteSecretProviderConnection = async (context, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "DELETE", `/secret-providers/connections/${providerKey}`);
};
const getProjectSecretProviderConnectionsByProjectId = async (context, projectId) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/secret-providers/projects/${projectId}/connections`);
};
const getProjectSecretProviderConnectionByKey = async (context, projectId, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/secret-providers/projects/${projectId}/connections/${providerKey}`);
};
const createProjectSecretProviderConnection = async (context, projectId, data) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/secret-providers/projects/${projectId}/connections`, data);
};
const updateProjectSecretProviderConnection = async (context, projectId, providerKey, data) => {
	return await require_utils.makeRestApiRequest(context, "PATCH", `/secret-providers/projects/${projectId}/connections/${providerKey}`, data);
};
const testProjectSecretProviderConnection = async (context, projectId, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "POST", `/secret-providers/projects/${projectId}/connections/${providerKey}/test`);
};
const deleteProjectSecretProviderConnection = async (context, projectId, providerKey) => {
	return await require_utils.makeRestApiRequest(context, "DELETE", `/secret-providers/projects/${projectId}/connections/${providerKey}`);
};

//#endregion
Object.defineProperty(exports, 'createProjectSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return createProjectSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'createSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return createSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'deleteProjectSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return deleteProjectSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'deleteSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return deleteSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'enableSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return enableSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'getProjectSecretProviderConnectionByKey', {
  enumerable: true,
  get: function () {
    return getProjectSecretProviderConnectionByKey;
  }
});
Object.defineProperty(exports, 'getProjectSecretProviderConnectionsByProjectId', {
  enumerable: true,
  get: function () {
    return getProjectSecretProviderConnectionsByProjectId;
  }
});
Object.defineProperty(exports, 'getSecretProviderConnectionByKey', {
  enumerable: true,
  get: function () {
    return getSecretProviderConnectionByKey;
  }
});
Object.defineProperty(exports, 'getSecretProviderConnections', {
  enumerable: true,
  get: function () {
    return getSecretProviderConnections;
  }
});
Object.defineProperty(exports, 'getSecretProviderTypes', {
  enumerable: true,
  get: function () {
    return getSecretProviderTypes;
  }
});
Object.defineProperty(exports, 'reloadSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return reloadSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'testProjectSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return testProjectSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'testSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return testSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'updateProjectSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return updateProjectSecretProviderConnection;
  }
});
Object.defineProperty(exports, 'updateSecretProviderConnection', {
  enumerable: true,
  get: function () {
    return updateSecretProviderConnection;
  }
});
//# sourceMappingURL=secretsProvider.ee.cjs.map