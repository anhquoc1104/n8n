import { z } from 'zod';
declare const ListProjectsQueryDto_base: import("../../zod-class").ZodClass<{
    type?: "personal" | "team" | undefined;
    skip?: number | undefined;
    take?: number | undefined;
    search?: string | undefined;
    activated?: boolean | undefined;
}, {
    skip: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>, number | undefined, string | undefined>, number | undefined, string | undefined>;
    take: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>, number | undefined, string | undefined>, number | undefined, string | undefined>, number | undefined, string | undefined>;
    search: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["personal", "team"]>>;
    activated: z.ZodEffects<z.ZodOptional<z.ZodEnum<["true", "false"]>>, boolean | undefined, "true" | "false" | undefined>;
}>;
export declare class ListProjectsQueryDto extends ListProjectsQueryDto_base {
}
export {};
