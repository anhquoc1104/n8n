import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/security-settings.ts
async function getSecuritySettings(context) {
	return await makeRestApiRequest(context, "GET", "/settings/security");
}
async function updateSecuritySettings(context, data) {
	return await makeRestApiRequest(context, "POST", "/settings/security", data);
}

//#endregion
export { updateSecuritySettings as n, getSecuritySettings as t };
//# sourceMappingURL=security-settings.mjs.map