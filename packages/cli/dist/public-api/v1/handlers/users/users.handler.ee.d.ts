import { InviteUsersRequestDto } from '@n8n/api-types';
import type { AuthenticatedRequest } from '@n8n/db';
import type express from 'express';
import type { Response } from 'express';
import type { UserRequest } from '../../../../requests';
type Create = AuthenticatedRequest<{}, {}, InviteUsersRequestDto>;
type Delete = UserRequest.Delete;
declare const _default: {
    getUser: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: UserRequest.Get, res: express.Response) => Promise<express.Response<any, Record<string, any>>>))[];
    getUsers: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: UserRequest.Get, res: express.Response) => Promise<express.Response<any, Record<string, any>>>))[];
    createUser: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: Create, res: Response) => Promise<express.Response<any, Record<string, any>>>))[];
    deleteUser: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: Delete, res: Response) => Promise<express.Response<any, Record<string, any>>>))[];
    changeRole: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((_: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>))[];
};
export = _default;
