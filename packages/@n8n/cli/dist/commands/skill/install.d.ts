import { Command } from '@oclif/core';
export default class SkillInstall extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        global: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        target: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
    private installClaudeCode;
    private stripFrontmatter;
    private installCursor;
    private installWindsurf;
}
