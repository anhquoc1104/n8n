import type { AuthenticatedRequest } from '@n8n/db';
import type express from 'express';
declare const _default: {
    getDiscover: ((req: AuthenticatedRequest<{}, {}, {}, {
        include?: string;
        resource?: string;
        operation?: string;
    }>, res: express.Response) => Promise<express.Response>)[];
};
export = _default;
