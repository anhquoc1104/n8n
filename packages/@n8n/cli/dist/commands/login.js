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
const core_1 = require("@oclif/core");
const readline = __importStar(require("node:readline"));
const client_1 = require("../client");
const config_1 = require("../config");
async function prompt(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
    return await new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
class Login extends core_1.Command {
    async run() {
        await this.parse(Login);
        const existing = (0, config_1.readConfig)();
        const urlDefault = existing.url ? ` (${existing.url})` : '';
        const keyHint = existing.apiKey
            ? ` (${existing.apiKey.slice(0, 12)}...${existing.apiKey.slice(-4)})`
            : '';
        const url = (await prompt(`n8n instance URL${urlDefault}: `)) || existing.url;
        const apiKey = (await prompt(`API key${keyHint}: `)) || existing.apiKey;
        if (!url) {
            this.error('URL is required.');
        }
        if (!apiKey) {
            this.error('API key is required.');
        }
        this.log('Verifying connection...');
        try {
            const client = new client_1.N8nClient({ baseUrl: url, apiKey });
            await client.listUsers();
        }
        catch (error) {
            if (error instanceof client_1.ApiError) {
                this.error(error.hint ? `${error.message}\nHint: ${error.hint}` : error.message);
            }
            const msg = error instanceof Error ? error.message : String(error);
            this.error(`Could not connect to ${url}: ${msg}`);
        }
        (0, config_1.writeConfig)({ url, apiKey });
        this.log('Logged in successfully. Config saved to ~/.n8n-cli/config.json');
    }
}
Login.description = 'Connect to an n8n instance (saves URL and API key)';
Login.examples = ['<%= config.bin %> login'];
exports.default = Login;
//# sourceMappingURL=login.js.map