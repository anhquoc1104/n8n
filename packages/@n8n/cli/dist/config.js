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
exports.readConfig = readConfig;
exports.writeConfig = writeConfig;
exports.deleteConfig = deleteConfig;
exports.resolveConnection = resolveConnection;
const fs = __importStar(require("node:fs"));
const os = __importStar(require("node:os"));
const path = __importStar(require("node:path"));
const CONFIG_DIR = path.join(os.homedir(), '.n8n-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
function ensureConfigDir() {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
    }
}
function readConfig() {
    try {
        const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
        return JSON.parse(raw);
    }
    catch {
        return {};
    }
}
function writeConfig(config) {
    ensureConfigDir();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n', {
        mode: 0o600,
    });
}
function deleteConfig() {
    try {
        fs.unlinkSync(CONFIG_FILE);
    }
    catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
}
function resolveConnection(flags) {
    const config = flags.url && flags.apiKey ? {} : readConfig();
    return {
        url: flags.url ?? process.env.N8N_URL ?? config.url,
        apiKey: flags.apiKey ?? process.env.N8N_API_KEY ?? config.apiKey,
    };
}
//# sourceMappingURL=config.js.map