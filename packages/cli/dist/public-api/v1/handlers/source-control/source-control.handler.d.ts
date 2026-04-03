import type { AuthenticatedRequest } from '@n8n/db';
import type express from 'express';
import type { StatusResult } from 'simple-git';
import type { ImportResult } from '../../../../modules/source-control.ee/types/import-result';
declare const _default: {
    pull: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: AuthenticatedRequest, res: express.Response) => Promise<ImportResult | StatusResult | Promise<express.Response>>))[];
};
export = _default;
