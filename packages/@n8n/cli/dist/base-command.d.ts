import { Command } from '@oclif/core';
import { N8nClient } from './client';
import { type OutputOptions } from './output';
export declare abstract class BaseCommand extends Command {
    static baseFlags: {
        url: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        apiKey: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        format: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        json: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        quiet: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        noHeader: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        jq: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        debug: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    private resolveFormat;
    private isJsonMode;
    protected getClient(flags: {
        url?: string;
        apiKey?: string;
        debug?: boolean;
    }): N8nClient;
    protected output(data: unknown, flags: {
        format?: string;
        json?: boolean;
        quiet?: boolean;
        noHeader?: boolean;
        jq?: string;
    }, options?: Partial<OutputOptions>): void;
    protected execute(fn: () => Promise<void>): Promise<void>;
    protected succeed(message: string, flags: {
        quiet?: boolean;
        format?: string;
        json?: boolean;
        jq?: string;
    }, data?: Record<string, unknown>): void;
    protected readInput(flags: {
        file?: string;
        stdin?: boolean;
    }): string;
}
