import type express from 'express';
import type { DataTableRequest } from '../../../types';
declare const _default: {
    getDataTableRows: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.GetRows, res: express.Response) => Promise<express.Response>))[];
    insertDataTableRows: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.InsertRows, res: express.Response) => Promise<express.Response>))[];
    updateDataTableRows: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.UpdateRows, res: express.Response) => Promise<express.Response>))[];
    upsertDataTableRow: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.UpsertRow, res: express.Response) => Promise<express.Response>))[];
    deleteDataTableRows: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: DataTableRequest.DeleteRows, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
