import { Command } from '@oclif/core';
export default class ConfigSetUrl extends Command {
    static description: string;
    static examples: string[];
    static args: {
        url: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
