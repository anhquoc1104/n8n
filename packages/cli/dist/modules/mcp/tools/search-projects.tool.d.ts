import type { ProjectRepository, User } from '@n8n/db';
import z from 'zod';
import type { ToolDefinition } from '../mcp.types';
import type { Telemetry } from '../../../telemetry';
declare const inputSchema: {
    query: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["personal", "team"]>>;
    limit: z.ZodOptional<z.ZodNumber>;
};
export declare const createSearchProjectsTool: (user: User, projectRepository: ProjectRepository, telemetry: Telemetry) => ToolDefinition<typeof inputSchema>;
export {};
