import type { CredentialsEntity } from '@n8n/db';
import type express from 'express';
import { buildSharedForCredential } from './credentials.service';
import type { CredentialTypeRequest, CredentialRequest } from '../../../types';
declare const _default: {
    getCredentials: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: CredentialRequest.GetAll, res: express.Response) => Promise<express.Response<{
        data: Array<{
            id: string;
            name: string;
            type: string;
            createdAt: Date;
            updatedAt: Date;
            shared: ReturnType<typeof buildSharedForCredential>;
        }>;
        nextCursor: string | null;
    }>>))[];
    createCredential: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: CredentialRequest.Create, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: CredentialRequest.Create, res: express.Response) => Promise<express.Response<Partial<CredentialsEntity>>>))[];
    updateCredential: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: CredentialRequest.Update, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: CredentialRequest.Update, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>))[];
    transferCredential: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: CredentialRequest.Transfer, res: express.Response) => Promise<void>))[];
    deleteCredential: (((req: import("@n8n/db").AuthenticatedRequest<{
        id?: string;
        dataTableId?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: CredentialRequest.Delete, res: express.Response) => Promise<express.Response<Partial<CredentialsEntity>>>))[];
    getCredentialType: ((req: CredentialTypeRequest.Get, res: express.Response) => Promise<express.Response>)[];
};
export = _default;
