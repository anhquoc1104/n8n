import type { Response } from 'express';
import type { AuditRequest } from '../../../../public-api/types';
declare const _default: {
    generateAudit: (import("../../shared/middlewares/global.middleware").ScopeTaggedMiddleware | ((req: AuditRequest.Generate, res: Response) => Promise<Response>))[];
};
export = _default;
