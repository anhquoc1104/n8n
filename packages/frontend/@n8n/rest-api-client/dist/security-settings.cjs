const require_utils = require('./utils2.cjs');

//#region src/api/security-settings.ts
async function getSecuritySettings(context) {
	return await require_utils.makeRestApiRequest(context, "GET", "/settings/security");
}
async function updateSecuritySettings(context, data) {
	return await require_utils.makeRestApiRequest(context, "POST", "/settings/security", data);
}

//#endregion
Object.defineProperty(exports, 'getSecuritySettings', {
  enumerable: true,
  get: function () {
    return getSecuritySettings;
  }
});
Object.defineProperty(exports, 'updateSecuritySettings', {
  enumerable: true,
  get: function () {
    return updateSecuritySettings;
  }
});
//# sourceMappingURL=security-settings.cjs.map