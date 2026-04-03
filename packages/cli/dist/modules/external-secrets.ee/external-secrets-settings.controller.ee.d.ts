import { UpdateExternalSecretsSettingsDto } from '@n8n/api-types';
import { ModuleRegistry, Logger } from '@n8n/backend-common';
import type { NextFunction, Request, Response } from 'express';
import { ExternalSecretsConfig } from './external-secrets.config';
import { ExternalSecretsSettingsService } from './external-secrets-settings.service.ee';
export declare class ExternalSecretsSettingsController {
    private readonly config;
    private readonly settingsService;
    private readonly moduleRegistry;
    private readonly logger;
    constructor(config: ExternalSecretsConfig, settingsService: ExternalSecretsSettingsService, moduleRegistry: ModuleRegistry, logger: Logger);
    checkFeatureFlag(_req: Request, res: Response, next: NextFunction): void;
    updateSettings(_req: Request, _res: Response, body: UpdateExternalSecretsSettingsDto): Promise<{
        systemRolesEnabled: boolean;
    }>;
}
