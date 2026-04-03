import { Command } from '@oclif/core';
export default class ConfigSetApiKey extends Command {
    static description: string;
    static examples: string[];
    static args: {
        key: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
