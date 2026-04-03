"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ExecutionGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ExecutionGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getExecution(args.id, flags.includeData);
            this.output(data, flags);
        });
    }
}
ExecutionGet.description = 'Get execution details';
ExecutionGet.examples = [
    '<%= config.bin %> execution get 5678',
    '<%= config.bin %> execution get 5678 --include-data --format=json',
];
ExecutionGet.args = {
    id: core_1.Args.string({ description: 'Execution ID', required: true }),
};
ExecutionGet.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    includeData: core_1.Flags.boolean({
        description: 'Include full node execution data',
        default: false,
        aliases: ['include-data'],
    }),
};
exports.default = ExecutionGet;
//# sourceMappingURL=get.js.map