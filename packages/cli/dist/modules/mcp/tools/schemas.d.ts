import type { IWorkflowSettings, WorkflowFEMeta } from 'n8n-workflow';
import z from 'zod';
export declare const nodeSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodString;
    type: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodString;
    type: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export declare const tagSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    name: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    name: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export declare const workflowSettingsSchema: z.ZodNullable<z.ZodType<IWorkflowSettings, z.ZodTypeDef, IWorkflowSettings>>;
export declare const workflowMetaSchema: z.ZodNullable<z.ZodType<WorkflowFEMeta, z.ZodTypeDef, WorkflowFEMeta>>;
export declare const workflowDetailsOutputSchema: z.ZodObject<{
    workflow: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        active: z.ZodBoolean;
        isArchived: z.ZodBoolean;
        versionId: z.ZodString;
        activeVersionId: z.ZodNullable<z.ZodString>;
        triggerCount: z.ZodNumber;
        createdAt: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodNullable<z.ZodString>;
        settings: z.ZodNullable<z.ZodType<IWorkflowSettings, z.ZodTypeDef, IWorkflowSettings>>;
        connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        nodes: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        activeVersion: z.ZodNullable<z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            nodes: z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }, {
            nodes: z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }>>;
        tags: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        meta: z.ZodNullable<z.ZodType<WorkflowFEMeta, z.ZodTypeDef, WorkflowFEMeta>>;
        parentFolderId: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        scopes: z.ZodArray<z.ZodString, "many">;
        canExecute: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        active: z.ZodBoolean;
        isArchived: z.ZodBoolean;
        versionId: z.ZodString;
        activeVersionId: z.ZodNullable<z.ZodString>;
        triggerCount: z.ZodNumber;
        createdAt: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodNullable<z.ZodString>;
        settings: z.ZodNullable<z.ZodType<IWorkflowSettings, z.ZodTypeDef, IWorkflowSettings>>;
        connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        nodes: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        activeVersion: z.ZodNullable<z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            nodes: z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }, {
            nodes: z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }>>;
        tags: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        meta: z.ZodNullable<z.ZodType<WorkflowFEMeta, z.ZodTypeDef, WorkflowFEMeta>>;
        parentFolderId: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        scopes: z.ZodArray<z.ZodString, "many">;
        canExecute: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        active: z.ZodBoolean;
        isArchived: z.ZodBoolean;
        versionId: z.ZodString;
        activeVersionId: z.ZodNullable<z.ZodString>;
        triggerCount: z.ZodNumber;
        createdAt: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodNullable<z.ZodString>;
        settings: z.ZodNullable<z.ZodType<IWorkflowSettings, z.ZodTypeDef, IWorkflowSettings>>;
        connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        nodes: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        activeVersion: z.ZodNullable<z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            connections: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            nodes: z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }, {
            nodes: z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        }>>;
        tags: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
        meta: z.ZodNullable<z.ZodType<WorkflowFEMeta, z.ZodTypeDef, WorkflowFEMeta>>;
        parentFolderId: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        scopes: z.ZodArray<z.ZodString, "many">;
        canExecute: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
    triggerInfo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflow: {
        id: string;
        createdAt: string | null;
        updatedAt: string | null;
        name: string | null;
        active: boolean;
        isArchived: boolean;
        nodes: z.objectOutputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        connections: Record<string, unknown>;
        settings: IWorkflowSettings | null;
        meta: WorkflowFEMeta | null;
        tags: z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        versionId: string;
        activeVersionId: string | null;
        activeVersion: {
            nodes: z.objectOutputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        } | null;
        triggerCount: number;
        parentFolderId: string | null;
        scopes: string[];
        canExecute: boolean;
        description?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    triggerInfo: string;
}, {
    workflow: {
        id: string;
        createdAt: string | null;
        updatedAt: string | null;
        name: string | null;
        active: boolean;
        isArchived: boolean;
        nodes: z.objectInputType<{
            name: z.ZodString;
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        connections: Record<string, unknown>;
        settings: IWorkflowSettings | null;
        meta: WorkflowFEMeta | null;
        tags: z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">[];
        versionId: string;
        activeVersionId: string | null;
        activeVersion: {
            nodes: z.objectInputType<{
                name: z.ZodString;
                type: z.ZodString;
            }, z.ZodTypeAny, "passthrough">[];
            connections: Record<string, unknown>;
        } | null;
        triggerCount: number;
        parentFolderId: string | null;
        scopes: string[];
        canExecute: boolean;
        description?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    triggerInfo: string;
}>;
