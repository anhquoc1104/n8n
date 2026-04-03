import { t as IRestApiContext } from "./types2.cjs";
import { ReloadSecretProviderConnectionResponse, SecretProviderConnection, SecretProviderTypeResponse, TestSecretProviderConnectionResponse } from "@n8n/api-types";

//#region src/api/secretsProvider.ee.d.ts
declare const getSecretProviderTypes: (context: IRestApiContext) => Promise<SecretProviderTypeResponse[]>;
declare const getSecretProviderConnections: (context: IRestApiContext) => Promise<SecretProviderConnection[]>;
declare const getSecretProviderConnectionByKey: (context: IRestApiContext, providerKey: string) => Promise<SecretProviderConnection>;
declare const createSecretProviderConnection: (context: IRestApiContext, data: {
  providerKey: string;
  type: string;
  isGlobal: boolean;
  projectIds: string[];
  settings: Record<string, unknown>;
}) => Promise<SecretProviderConnection>;
declare const updateSecretProviderConnection: (context: IRestApiContext, providerKey: string, data: {
  isGlobal: boolean;
  projectIds: string[];
  settings: Record<string, unknown>;
}) => Promise<SecretProviderConnection>;
declare const enableSecretProviderConnection: (context: IRestApiContext, providerKey: string) => Promise<SecretProviderConnection>;
declare const testSecretProviderConnection: (context: IRestApiContext, providerKey: string) => Promise<TestSecretProviderConnectionResponse>;
declare const reloadSecretProviderConnection: (context: IRestApiContext, providerKey: string) => Promise<ReloadSecretProviderConnectionResponse>;
declare const deleteSecretProviderConnection: (context: IRestApiContext, providerKey: string) => Promise<void>;
declare const getProjectSecretProviderConnectionsByProjectId: (context: IRestApiContext, projectId: string) => Promise<SecretProviderConnection[]>;
declare const getProjectSecretProviderConnectionByKey: (context: IRestApiContext, projectId: string, providerKey: string) => Promise<SecretProviderConnection>;
declare const createProjectSecretProviderConnection: (context: IRestApiContext, projectId: string, data: {
  providerKey: string;
  type: string;
  projectIds: string[];
  settings: Record<string, unknown>;
}) => Promise<SecretProviderConnection>;
declare const updateProjectSecretProviderConnection: (context: IRestApiContext, projectId: string, providerKey: string, data: {
  settings: Record<string, unknown>;
}) => Promise<SecretProviderConnection>;
declare const testProjectSecretProviderConnection: (context: IRestApiContext, projectId: string, providerKey: string) => Promise<TestSecretProviderConnectionResponse>;
declare const deleteProjectSecretProviderConnection: (context: IRestApiContext, projectId: string, providerKey: string) => Promise<void>;
//#endregion
export { enableSecretProviderConnection as a, getSecretProviderConnectionByKey as c, reloadSecretProviderConnection as d, testProjectSecretProviderConnection as f, updateSecretProviderConnection as h, deleteSecretProviderConnection as i, getSecretProviderConnections as l, updateProjectSecretProviderConnection as m, createSecretProviderConnection as n, getProjectSecretProviderConnectionByKey as o, testSecretProviderConnection as p, deleteProjectSecretProviderConnection as r, getProjectSecretProviderConnectionsByProjectId as s, createProjectSecretProviderConnection as t, getSecretProviderTypes as u };
//# sourceMappingURL=secretsProvider.ee.d.cts.map