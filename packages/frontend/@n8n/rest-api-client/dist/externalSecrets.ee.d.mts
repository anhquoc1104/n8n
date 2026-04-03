import { t as IRestApiContext } from "./types2.mjs";
import { ExternalSecretsProvider } from "@n8n/api-types";

//#region src/api/externalSecrets.ee.d.ts
declare const getExternalSecrets: (context: IRestApiContext) => Promise<Record<string, string[]>>;
declare const getGlobalExternalSecrets: (context: IRestApiContext) => Promise<Record<string, string[]>>;
declare const getGlobalExternalSecretsForProject: (context: IRestApiContext, projectId: string) => Promise<Record<string, string[]>>;
declare const getProjectExternalSecrets: (context: IRestApiContext, projectId: string) => Promise<Record<string, string[]>>;
declare const getExternalSecretsProviders: (context: IRestApiContext) => Promise<ExternalSecretsProvider[]>;
declare const getExternalSecretsProvider: (context: IRestApiContext, id: string) => Promise<ExternalSecretsProvider>;
declare const testExternalSecretsProviderConnection: (context: IRestApiContext, id: string, data: ExternalSecretsProvider["data"]) => Promise<{
  testState: ExternalSecretsProvider["state"];
}>;
declare const updateProvider: (context: IRestApiContext, id: string, data: ExternalSecretsProvider["data"]) => Promise<boolean>;
declare const reloadProvider: (context: IRestApiContext, id: string) => Promise<{
  updated: boolean;
}>;
declare const connectProvider: (context: IRestApiContext, id: string, connected: boolean) => Promise<boolean>;
declare const updateExternalSecretsSettings: (context: IRestApiContext, data: {
  systemRolesEnabled: boolean;
}) => Promise<{
  systemRolesEnabled: boolean;
}>;
//#endregion
export { getGlobalExternalSecrets as a, reloadProvider as c, updateProvider as d, getExternalSecretsProviders as i, testExternalSecretsProviderConnection as l, getExternalSecrets as n, getGlobalExternalSecretsForProject as o, getExternalSecretsProvider as r, getProjectExternalSecrets as s, connectProvider as t, updateExternalSecretsSettings as u };
//# sourceMappingURL=externalSecrets.ee.d.mts.map