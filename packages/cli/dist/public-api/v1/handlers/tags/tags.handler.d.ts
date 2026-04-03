import type express from 'express';
import type { TagRequest } from '../../../types';
declare const _default: {
    createTag: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: TagRequest.Create, res: express.Response) => Promise<express.Response>))[];
    updateTag: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: TagRequest.Update, res: express.Response) => Promise<express.Response>))[];
    deleteTag: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: TagRequest.Delete, res: express.Response) => Promise<express.Response>))[];
    getTags: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: TagRequest.GetAll, res: express.Response) => Promise<express.Response>))[];
    getTag: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: TagRequest.Get, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
