import { s as makeRestApiRequest } from "./utils2.mjs";

//#region src/api/ai-usage.ts
async function updateAiUsageSettings(context, data) {
	return await makeRestApiRequest(context, "POST", "/ai/usage-settings", data);
}

//#endregion
export { updateAiUsageSettings as t };
//# sourceMappingURL=ai-usage.mjs.map