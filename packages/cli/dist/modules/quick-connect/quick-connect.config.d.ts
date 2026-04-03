import { z } from 'zod';
declare const firecrawlQuickConnectSchema: z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodNever>;
} & {
    quickConnectType: z.ZodLiteral<"firecrawl">;
    consentText: z.ZodString;
    backendFlowConfig: z.ZodObject<{
        secret: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secret: string;
    }, {
        secret: string;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}>;
export type FirecrawlQuickConnect = z.infer<typeof firecrawlQuickConnectSchema>;
declare const quickConnectOptionSchema: z.ZodUnion<[z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodNever>;
} & {
    quickConnectType: z.ZodLiteral<"firecrawl">;
    consentText: z.ZodString;
    backendFlowConfig: z.ZodObject<{
        secret: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secret: string;
    }, {
        secret: string;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}>, z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    consentText: z.ZodOptional<z.ZodString>;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    backendFlowConfig: z.ZodOptional<z.ZodNever>;
} & {
    quickConnectType: z.ZodLiteral<"pinecone">;
    config: z.ZodObject<{
        integrationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        integrationId: string;
    }, {
        integrationId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    config: {
        integrationId: string;
    };
    packageName: string;
    credentialType: string;
    quickConnectType: "pinecone";
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}, {
    text: string;
    config: {
        integrationId: string;
    };
    packageName: string;
    credentialType: string;
    quickConnectType: "pinecone";
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}>, z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    quickConnectType: z.ZodString;
    consentText: z.ZodOptional<z.ZodString>;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodNever>;
    backendFlowConfig: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: string;
    config?: undefined;
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: string;
    config?: undefined;
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}>]>;
export type QuickConnectOption = z.infer<typeof quickConnectOptionSchema>;
declare const quickConnectOptionsSchema: z.ZodPipeline<z.ZodString, z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodNever>;
} & {
    quickConnectType: z.ZodLiteral<"firecrawl">;
    consentText: z.ZodString;
    backendFlowConfig: z.ZodObject<{
        secret: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secret: string;
    }, {
        secret: string;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
}>, z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    consentText: z.ZodOptional<z.ZodString>;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    backendFlowConfig: z.ZodOptional<z.ZodNever>;
} & {
    quickConnectType: z.ZodLiteral<"pinecone">;
    config: z.ZodObject<{
        integrationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        integrationId: string;
    }, {
        integrationId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    config: {
        integrationId: string;
    };
    packageName: string;
    credentialType: string;
    quickConnectType: "pinecone";
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}, {
    text: string;
    config: {
        integrationId: string;
    };
    packageName: string;
    credentialType: string;
    quickConnectType: "pinecone";
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}>, z.ZodObject<{
    packageName: z.ZodString;
    credentialType: z.ZodString;
    text: z.ZodString;
    quickConnectType: z.ZodString;
    consentText: z.ZodOptional<z.ZodString>;
    consentCheckbox: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodNever>;
    backendFlowConfig: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: string;
    config?: undefined;
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}, {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: string;
    config?: undefined;
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
}>]>, "many">, ({
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: string;
    config?: undefined;
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
} | {
    text: string;
    packageName: string;
    credentialType: string;
    quickConnectType: "firecrawl";
    consentText: string;
    backendFlowConfig: {
        secret: string;
    };
    config?: undefined;
    consentCheckbox?: string | undefined;
} | {
    text: string;
    config: {
        integrationId: string;
    };
    packageName: string;
    credentialType: string;
    quickConnectType: "pinecone";
    consentText?: string | undefined;
    consentCheckbox?: string | undefined;
    backendFlowConfig?: undefined;
})[], unknown>>;
export type QuickConnectOptions = z.infer<typeof quickConnectOptionsSchema>;
export declare class QuickConnectConfig {
    options: QuickConnectOptions;
}
export {};
