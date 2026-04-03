import type { FolderRepository, User } from '@n8n/db';
import z from 'zod';
import type { ToolDefinition } from '../mcp.types';
import type { ProjectService } from '../../../services/project.service.ee';
import type { Telemetry } from '../../../telemetry';
declare const inputSchema: {
    projectId: z.ZodString;
    query: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
};
export declare const createSearchFoldersTool: (user: User, folderRepository: FolderRepository, projectService: ProjectService, telemetry: Telemetry) => ToolDefinition<typeof inputSchema>;
export {};
