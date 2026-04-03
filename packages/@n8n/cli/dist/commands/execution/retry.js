"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ExecutionRetry extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ExecutionRetry);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.retryExecution(args.id);
            this.output(data, flags);
        });
    }
}
ExecutionRetry.description = 'Retry a failed execution';
ExecutionRetry.examples = ['<%= config.bin %> execution retry 5678'];
ExecutionRetry.args = {
    id: core_1.Args.string({ description: 'Execution ID', required: true }),
};
ExecutionRetry.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = ExecutionRetry;
//# sourceMappingURL=retry.js.map