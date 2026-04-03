import type { BooleanLicenseFeature } from '@n8n/constants';
import type { AuthenticatedRequest } from '@n8n/db';
import type { ApiKeyScope, Scope } from '@n8n/permissions';
import type express from 'express';
import type { PaginatedRequest } from '../../../types';
export type ProjectScopeResource = 'workflow' | 'credential' | 'dataTable';
export declare const globalScope: (scopes: Scope | Scope[]) => (req: AuthenticatedRequest<{
    id?: string;
    dataTableId?: string;
}>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>;
export declare const projectScope: (scopes: Scope | Scope[], resource: ProjectScopeResource) => (req: AuthenticatedRequest<{
    id?: string;
    dataTableId?: string;
}>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>;
export declare const validCursor: (req: PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void;
export type ScopeTaggedMiddleware = ((...args: unknown[]) => unknown) & {
    __apiKeyScope: ApiKeyScope;
};
export declare const apiKeyHasScope: (apiKeyScope: ApiKeyScope) => ScopeTaggedMiddleware;
export declare const apiKeyHasScopeWithGlobalScopeFallback: (config: {
    scope: ApiKeyScope & Scope;
} | {
    apiKeyScope: ApiKeyScope;
    globalScope: Scope;
}) => ScopeTaggedMiddleware;
export declare const validLicenseWithUserQuota: (_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void;
export declare const isLicensed: (feature: BooleanLicenseFeature) => (_: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>;
