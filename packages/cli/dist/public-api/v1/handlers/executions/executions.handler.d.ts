import type express from 'express';
import type { ExecutionRequest } from '../../../types';
declare const _default: {
    deleteExecution: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.Delete, res: express.Response) => Promise<express.Response>))[];
    getExecution: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.Get, res: express.Response) => Promise<express.Response>))[];
    getExecutions: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.GetAll, res: express.Response) => Promise<express.Response>))[];
    retryExecution: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.Retry, res: express.Response) => Promise<express.Response>))[];
    getExecutionTags: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.GetTags, res: express.Response) => Promise<express.Response>))[];
    updateExecutionTags: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.UpdateTags, res: express.Response) => Promise<express.Response>))[];
    stopExecution: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.Stop, res: express.Response) => Promise<express.Response>))[];
    stopManyExecutions: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: ExecutionRequest.StopMany, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
