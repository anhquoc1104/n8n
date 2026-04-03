"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ExecutionDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ExecutionDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteExecution(args.id);
            this.succeed(`Execution ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
ExecutionDelete.description = 'Delete an execution';
ExecutionDelete.examples = ['<%= config.bin %> execution delete 5678'];
ExecutionDelete.args = {
    id: core_1.Args.string({ description: 'Execution ID', required: true }),
};
ExecutionDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = ExecutionDelete;
//# sourceMappingURL=delete.js.map