import type express from 'express';
import type { DataTableRequest } from '../../../types';
declare const _default: {
    listDataTables: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.List, res: express.Response) => Promise<express.Response>))[];
    createDataTable: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.Create, res: express.Response) => Promise<express.Response>))[];
    getDataTable: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.Get, res: express.Response) => Promise<express.Response>))[];
    updateDataTable: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.Update, res: express.Response) => Promise<express.Response>))[];
    deleteDataTable: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.Delete, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
