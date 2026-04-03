import { z } from 'zod';
export declare function isValidPathComponent(component: string): boolean;
export declare function validatePathWithinBase(filePath: string, baseDir: string): boolean;
export interface CodeBuilderGetToolOptions {
    nodeDefinitionDirs?: string[];
}
export declare function createCodeBuilderGetTool(options?: CodeBuilderGetToolOptions): import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    nodeIds: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
        nodeId: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
        resource: z.ZodOptional<z.ZodString>;
        operation: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    }, {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    nodeIds: (string | {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    })[];
}, {
    nodeIds: (string | {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    })[];
}>, {
    nodeIds: (string | {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    })[];
}, {
    nodeIds: (string | {
        nodeId: string;
        mode?: string | undefined;
        operation?: string | undefined;
        version?: string | undefined;
        resource?: string | undefined;
    })[];
}, string, unknown, "get_node_types">;
