"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class SourceControlPull extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(SourceControlPull);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.sourceControlPull({ force: flags.force });
            this.output(data, flags);
        });
    }
}
SourceControlPull.description = 'Pull changes from remote source control';
SourceControlPull.examples = [
    '<%= config.bin %> source-control pull',
    '<%= config.bin %> source-control pull --force',
];
SourceControlPull.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    force: core_1.Flags.boolean({ description: 'Force pull', default: false }),
};
exports.default = SourceControlPull;
//# sourceMappingURL=pull.js.map