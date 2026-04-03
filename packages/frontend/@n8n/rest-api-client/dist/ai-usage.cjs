const require_utils = require('./utils2.cjs');

//#region src/api/ai-usage.ts
async function updateAiUsageSettings(context, data) {
	return await require_utils.makeRestApiRequest(context, "POST", "/ai/usage-settings", data);
}

//#endregion
Object.defineProperty(exports, 'updateAiUsageSettings', {
  enumerable: true,
  get: function () {
    return updateAiUsageSettings;
  }
});
//# sourceMappingURL=ai-usage.cjs.map