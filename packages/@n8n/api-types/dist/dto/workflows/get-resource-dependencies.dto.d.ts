import { z } from 'zod';
declare const GetResourceDependenciesDto_base: import("../../zod-class").ZodClass<{
    resourceIds: string[];
    resourceType: "workflow" | "credential" | "dataTable";
}, {
    resourceIds: z.ZodArray<z.ZodString, "many">;
    resourceType: z.ZodEnum<["workflow", "credential", "dataTable"]>;
}>;
export declare class GetResourceDependenciesDto extends GetResourceDependenciesDto_base {
}
export {};
