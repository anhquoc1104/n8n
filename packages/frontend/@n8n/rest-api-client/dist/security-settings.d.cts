import { t as IRestApiContext } from "./types2.cjs";
import { SecuritySettingsDto, UpdateSecuritySettingsDto } from "@n8n/api-types";

//#region src/api/security-settings.d.ts
declare function getSecuritySettings(context: IRestApiContext): Promise<SecuritySettingsDto>;
declare function updateSecuritySettings(context: IRestApiContext, data: UpdateSecuritySettingsDto): Promise<SecuritySettingsDto>;
//#endregion
export { updateSecuritySettings as n, getSecuritySettings as t };
//# sourceMappingURL=security-settings.d.cts.map