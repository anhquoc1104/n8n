import type { ModuleInterface } from '@n8n/decorators';
export declare class QuickConnectModule implements ModuleInterface {
    init(): Promise<void>;
    settings(): Promise<{
        options: ({
            text: string;
            packageName: string;
            credentialType: string;
            quickConnectType: string;
            config?: undefined;
            consentText?: string | undefined;
            consentCheckbox?: string | undefined;
        } | {
            text: string;
            packageName: string;
            credentialType: string;
            quickConnectType: "firecrawl";
            consentText: string;
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
        })[];
    }>;
    private registerHandlers;
}
