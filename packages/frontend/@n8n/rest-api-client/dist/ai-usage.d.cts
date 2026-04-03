import { t as IRestApiContext } from "./types2.cjs";
import { AiUsageSettingsRequestDto } from "@n8n/api-types";

//#region src/api/ai-usage.d.ts
declare function updateAiUsageSettings(context: IRestApiContext, data: AiUsageSettingsRequestDto): Promise<void>;
//#endregion
export { updateAiUsageSettings as t };
//# sourceMappingURL=ai-usage.d.cts.map