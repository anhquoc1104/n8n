import type { AuthenticatedRequest } from '@n8n/db';
import type { Response } from 'express';
declare const _default: {
    createVariable: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    updateVariable: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    deleteVariable: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    getVariables: (((req: import("../../../types").PaginatedRequest, res: Response, next: import("express").NextFunction) => Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
};
export = _default;
