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
const fs = __importStar(require("node:fs"));
const os = __importStar(require("node:os"));
const path = __importStar(require("node:path"));
class SkillInstall extends core_1.Command {
    async run() {
        const { flags } = await this.parse(SkillInstall);
        const skillSource = path.resolve(this.config.root, 'skills', 'n8n-cli', 'SKILL.md');
        if (!fs.existsSync(skillSource)) {
            this.error('Could not find SKILL.md in the n8n-cli package.');
        }
        const content = fs.readFileSync(skillSource, 'utf-8');
        switch (flags.target) {
            case 'cursor':
                this.installCursor(content);
                break;
            case 'windsurf':
                this.installWindsurf(content);
                break;
            default:
                this.installClaudeCode(content, flags.global);
        }
    }
    installClaudeCode(content, global) {
        const dir = global
            ? path.join(os.homedir(), '.claude', 'skills', 'n8n-cli')
            : path.join(process.cwd(), '.claude', 'skills', 'n8n-cli');
        const targetFile = path.join(dir, 'SKILL.md');
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(targetFile, content);
        this.log(`Installed to ${targetFile}`);
        this.log('Use /n8n-cli in Claude Code to load the skill.');
    }
    stripFrontmatter(content) {
        const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
        return match ? match[1].trimStart() : content;
    }
    installCursor(content) {
        const targetFile = path.join(process.cwd(), '.cursorrules');
        const stripped = this.stripFrontmatter(content);
        if (fs.existsSync(targetFile)) {
            const existing = fs.readFileSync(targetFile, 'utf-8');
            if (existing.includes('# n8n CLI')) {
                this.log('.cursorrules already contains n8n CLI skill. Skipping.');
                return;
            }
            fs.writeFileSync(targetFile, `${existing}\n\n${stripped}`);
            this.log('Appended n8n CLI skill to .cursorrules');
        }
        else {
            fs.writeFileSync(targetFile, stripped);
            this.log('Created .cursorrules with n8n CLI skill.');
        }
    }
    installWindsurf(content) {
        const targetFile = path.join(process.cwd(), '.windsurfrules');
        const stripped = this.stripFrontmatter(content);
        if (fs.existsSync(targetFile)) {
            const existing = fs.readFileSync(targetFile, 'utf-8');
            if (existing.includes('# n8n CLI')) {
                this.log('.windsurfrules already contains n8n CLI skill. Skipping.');
                return;
            }
            fs.writeFileSync(targetFile, `${existing}\n\n${stripped}`);
            this.log('Appended n8n CLI skill to .windsurfrules');
        }
        else {
            fs.writeFileSync(targetFile, stripped);
            this.log('Created .windsurfrules with n8n CLI skill.');
        }
    }
}
SkillInstall.description = 'Install the n8n CLI skill for AI coding agents (Claude Code, Cursor, Windsurf)';
SkillInstall.examples = [
    '<%= config.bin %> skill install',
    '<%= config.bin %> skill install --global',
    '<%= config.bin %> skill install --target=cursor',
];
SkillInstall.flags = {
    global: core_1.Flags.boolean({
        char: 'g',
        description: 'Install to ~/.claude/skills/ instead of the current project',
        default: false,
    }),
    target: core_1.Flags.string({
        char: 't',
        description: 'Target agent',
        options: ['claude-code', 'cursor', 'windsurf'],
        default: 'claude-code',
    }),
};
exports.default = SkillInstall;
//# sourceMappingURL=install.js.map