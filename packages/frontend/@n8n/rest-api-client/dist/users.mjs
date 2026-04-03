import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/users.ts
async function loginCurrentUser(context) {
	return await makeRestApiRequest(context, "GET", "/login");
}
async function login(context, params) {
	return await makeRestApiRequest(context, "POST", "/login", params);
}
async function logout(context) {
	await makeRestApiRequest(context, "POST", "/logout");
}
async function setupOwner(context, params) {
	return await makeRestApiRequest(context, "POST", "/owner/setup", params);
}
async function validateSignupToken(context, params) {
	return await makeRestApiRequest(context, "GET", "/resolve-signup-token", params);
}
async function sendForgotPasswordEmail(context, params) {
	await makeRestApiRequest(context, "POST", "/forgot-password", params);
}
async function validatePasswordToken(context, params) {
	await makeRestApiRequest(context, "GET", "/resolve-password-token", params);
}
async function changePassword(context, params) {
	await makeRestApiRequest(context, "POST", "/change-password", params);
}
async function updateCurrentUser(context, params) {
	return await makeRestApiRequest(context, "PATCH", "/me", params);
}
async function updateCurrentUserSettings(context, settings) {
	return await makeRestApiRequest(context, "PATCH", "/me/settings", settings);
}
async function updateOtherUserSettings(context, userId, settings) {
	return await makeRestApiRequest(context, "PATCH", `/users/${userId}/settings`, settings);
}
async function updateCurrentUserPassword(context, params) {
	return await makeRestApiRequest(context, "PATCH", "/me/password", params);
}
async function deleteUser(context, { id, transferId }) {
	await makeRestApiRequest(context, "DELETE", `/users/${id}`, transferId ? { transferId } : {});
}
async function getUsers(context, filter) {
	return await makeRestApiRequest(context, "GET", "/users", filter);
}
async function getInviteLink(context, { id }) {
	return await makeRestApiRequest(context, "GET", `/users/${id}/invite-link`);
}
async function generateInviteLink(context, { id }) {
	return await makeRestApiRequest(context, "POST", `/users/${id}/invite-link`);
}
async function getPasswordResetLink(context, { id }) {
	return await makeRestApiRequest(context, "GET", `/users/${id}/password-reset-link`);
}
async function submitPersonalizationSurvey(context, params) {
	await makeRestApiRequest(context, "POST", "/me/survey", params);
}
async function updateGlobalRole(context, { id, newRoleName }) {
	return await makeRestApiRequest(context, "PATCH", `/users/${id}/role`, { newRoleName });
}

//#endregion
export { updateOtherUserSettings as _, getPasswordResetLink as a, loginCurrentUser as c, setupOwner as d, submitPersonalizationSurvey as f, updateGlobalRole as g, updateCurrentUserSettings as h, getInviteLink as i, logout as l, updateCurrentUserPassword as m, deleteUser as n, getUsers as o, updateCurrentUser as p, generateInviteLink as r, login as s, changePassword as t, sendForgotPasswordEmail as u, validatePasswordToken as v, validateSignupToken as y };
//# sourceMappingURL=users.mjs.map