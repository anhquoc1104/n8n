import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/roles.ts
const getRoles = async (context) => {
	return await makeRestApiRequest(context, "GET", "/roles?withUsageCount=true");
};
const createProjectRole = async (context, body) => {
	return await makeRestApiRequest(context, "POST", "/roles", body);
};
const getRoleBySlug = async (context, body) => {
	return await makeRestApiRequest(context, "GET", `/roles/${body.slug}?withUsageCount=true`);
};
const updateProjectRole = async (context, slug, body) => {
	return await makeRestApiRequest(context, "PATCH", `/roles/${slug}`, body);
};
const deleteProjectRole = async (context, slug) => {
	return await makeRestApiRequest(context, "DELETE", `/roles/${slug}`);
};
const getRoleAssignments = async (context, slug) => {
	return await makeRestApiRequest(context, "GET", `/roles/${slug}/assignments`);
};
const getRoleProjectMembers = async (context, slug, projectId) => {
	return await makeRestApiRequest(context, "GET", `/roles/${slug}/assignments/${projectId}/members`);
};

//#endregion
export { getRoleProjectMembers as a, getRoleBySlug as i, deleteProjectRole as n, getRoles as o, getRoleAssignments as r, updateProjectRole as s, createProjectRole as t };
//# sourceMappingURL=roles.mjs.map