const require_utils = require('./utils2.cjs');

//#region src/api/roles.ts
const getRoles = async (context) => {
	return await require_utils.makeRestApiRequest(context, "GET", "/roles?withUsageCount=true");
};
const createProjectRole = async (context, body) => {
	return await require_utils.makeRestApiRequest(context, "POST", "/roles", body);
};
const getRoleBySlug = async (context, body) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/roles/${body.slug}?withUsageCount=true`);
};
const updateProjectRole = async (context, slug, body) => {
	return await require_utils.makeRestApiRequest(context, "PATCH", `/roles/${slug}`, body);
};
const deleteProjectRole = async (context, slug) => {
	return await require_utils.makeRestApiRequest(context, "DELETE", `/roles/${slug}`);
};
const getRoleAssignments = async (context, slug) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/roles/${slug}/assignments`);
};
const getRoleProjectMembers = async (context, slug, projectId) => {
	return await require_utils.makeRestApiRequest(context, "GET", `/roles/${slug}/assignments/${projectId}/members`);
};

//#endregion
Object.defineProperty(exports, 'createProjectRole', {
  enumerable: true,
  get: function () {
    return createProjectRole;
  }
});
Object.defineProperty(exports, 'deleteProjectRole', {
  enumerable: true,
  get: function () {
    return deleteProjectRole;
  }
});
Object.defineProperty(exports, 'getRoleAssignments', {
  enumerable: true,
  get: function () {
    return getRoleAssignments;
  }
});
Object.defineProperty(exports, 'getRoleBySlug', {
  enumerable: true,
  get: function () {
    return getRoleBySlug;
  }
});
Object.defineProperty(exports, 'getRoleProjectMembers', {
  enumerable: true,
  get: function () {
    return getRoleProjectMembers;
  }
});
Object.defineProperty(exports, 'getRoles', {
  enumerable: true,
  get: function () {
    return getRoles;
  }
});
Object.defineProperty(exports, 'updateProjectRole', {
  enumerable: true,
  get: function () {
    return updateProjectRole;
  }
});
//# sourceMappingURL=roles.cjs.map