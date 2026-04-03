import type express from 'express';
import type { WorkflowRequest } from '../../../types';
declare const _default: {
    createWorkflow: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Create, res: express.Response) => Promise<express.Response>))[];
    transferWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Transfer, res: express.Response) => Promise<void>))[];
    deleteWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Get, res: express.Response) => Promise<express.Response>))[];
    getWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Get, res: express.Response) => Promise<express.Response>))[];
    getWorkflowVersion: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.GetVersion, res: express.Response) => Promise<express.Response>))[];
    getWorkflows: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.GetAll, res: express.Response) => Promise<express.Response>))[];
    updateWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Update, res: express.Response) => Promise<express.Response>))[];
    activateWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Activate, res: express.Response) => Promise<express.Response>))[];
    deactivateWorkflow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.Activate, res: express.Response) => Promise<express.Response>))[];
    getWorkflowTags: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.GetTags, res: express.Response) => Promise<express.Response>))[];
    updateWorkflowTags: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: WorkflowRequest.UpdateTags, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
