"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteWorkflow(args.id);
            this.succeed(`Workflow ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
WorkflowDelete.description = 'Delete a workflow';
WorkflowDelete.examples = ['<%= config.bin %> workflow delete 1234'];
WorkflowDelete.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = WorkflowDelete;
//# sourceMappingURL=delete.js.map