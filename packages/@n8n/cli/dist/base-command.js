"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
const core_1 = require("@oclif/core");
const fs = __importStar(require("node:fs"));
const client_1 = require("./client");
const config_1 = require("./config");
const output_1 = require("./output");
const EXIT_SUCCESS = 0;
const EXIT_ERROR = 1;
const EXIT_AUTH = 2;
class BaseCommand extends core_1.Command {
    resolveFormat(flags) {
        if (flags.jq)
            return 'json';
        if (flags.json)
            return 'json';
        if (flags.format)
            return flags.format;
        if (!process.stdout.isTTY)
            return 'json';
        return 'table';
    }
    isJsonMode(flags) {
        return this.resolveFormat(flags) === 'json';
    }
    getClient(flags) {
        const { url, apiKey } = (0, config_1.resolveConnection)(flags);
        if (!url) {
            this.error("No n8n URL configured.\nHint: Run 'n8n-cli config set-url <url>' or set N8N_URL.", { exit: EXIT_ERROR });
        }
        if (!apiKey) {
            this.error("No API key configured.\nHint: Run 'n8n-cli config set-api-key <key>' or set N8N_API_KEY.", { exit: EXIT_AUTH });
        }
        const debug = flags.debug
            ? (msg) => process.stderr.write(`[debug] ${msg}\n`)
            : undefined;
        return new client_1.N8nClient({ baseUrl: url, apiKey, debug });
    }
    output(data, flags, options = {}) {
        if (flags.quiet)
            return;
        if (flags.jq) {
            const filtered = (0, output_1.applyJqFilter)(data, flags.jq);
            this.log(JSON.stringify(filtered, null, 2));
            return;
        }
        const format = this.resolveFormat(flags);
        const text = (0, output_1.formatOutput)(data, { format, noHeader: flags.noHeader, ...options });
        this.log(text);
    }
    async execute(fn) {
        try {
            await fn();
        }
        catch (error) {
            if (error instanceof client_1.ApiError) {
                const exitCode = error.statusCode === 401 ? EXIT_AUTH : EXIT_ERROR;
                const message = error.hint
                    ? `Error: ${error.message} (${error.statusCode})\nHint: ${error.hint}`
                    : `Error: ${error.message}`;
                this.error(message, { exit: exitCode });
            }
            throw error;
        }
    }
    succeed(message, flags, data) {
        if (flags.quiet)
            return;
        if (this.isJsonMode(flags)) {
            this.log(JSON.stringify(data ?? { ok: true }));
        }
        else {
            this.log(message);
        }
        this.exit(EXIT_SUCCESS);
    }
    readInput(flags) {
        if (flags.stdin) {
            return fs.readFileSync(0, 'utf-8');
        }
        if (flags.file) {
            return fs.readFileSync(flags.file, 'utf-8');
        }
        this.error('Provide --file or --stdin');
    }
}
exports.BaseCommand = BaseCommand;
BaseCommand.baseFlags = {
    url: core_1.Flags.string({
        char: 'u',
        description: 'n8n instance URL (or N8N_URL env var)',
        env: 'N8N_URL',
    }),
    apiKey: core_1.Flags.string({
        char: 'k',
        description: 'API key (or N8N_API_KEY env var)',
        env: 'N8N_API_KEY',
        aliases: ['api-key'],
    }),
    format: core_1.Flags.string({
        char: 'f',
        description: 'Output format. Defaults to json when stdout is piped.',
        options: ['table', 'json', 'id-only'],
    }),
    json: core_1.Flags.boolean({
        description: 'Output as JSON (shorthand for --format=json)',
        default: false,
    }),
    quiet: core_1.Flags.boolean({
        char: 'q',
        description: 'Suppress non-essential output',
        default: false,
    }),
    noHeader: core_1.Flags.boolean({
        description: 'Hide table headers (only affects table format)',
        default: false,
        aliases: ['no-header'],
    }),
    jq: core_1.Flags.string({
        description: "Apply a jq-style filter to JSON output (e.g. '.[0].id', '.[].name'). Implies --json.",
    }),
    debug: core_1.Flags.boolean({
        description: 'Print HTTP request/response details to stderr',
        default: false,
    }),
};
//# sourceMappingURL=base-command.js.map