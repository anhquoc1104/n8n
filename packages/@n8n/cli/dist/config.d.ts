export interface CliConfig {
    url?: string;
    apiKey?: string;
}
export declare function readConfig(): CliConfig;
export declare function writeConfig(config: CliConfig): void;
export declare function deleteConfig(): void;
export declare function resolveConnection(flags: {
    url?: string;
    apiKey?: string;
}): {
    url?: string;
    apiKey?: string;
};
