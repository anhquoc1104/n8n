import type { AuthenticatedRequest } from '@n8n/db';
import type { Response } from 'express';
import type { PaginatedRequest } from '../../../../public-api/types';
declare const _default: {
    createProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    updateProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    deleteProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    getProjects: (((req: PaginatedRequest, res: Response, next: import("express").NextFunction) => Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    getProjectUsers: (((req: PaginatedRequest, res: Response, next: import("express").NextFunction) => Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    addUsersToProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    changeUserRoleInProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
    deleteUserFromProject: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: Response, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>))[];
};
export = _default;
