"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowTransfer extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowTransfer);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.transferWorkflow(args.id, flags.project);
            this.succeed(`Workflow ${args.id} transferred to project ${flags.project}.`, flags, {
                id: args.id,
                transferredTo: flags.project,
            });
        });
    }
}
WorkflowTransfer.description = 'Transfer a workflow to another project';
WorkflowTransfer.examples = ['<%= config.bin %> workflow transfer 1234 --project=proj-abc'];
WorkflowTransfer.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowTransfer.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    project: core_1.Flags.string({ description: 'Destination project ID', required: true }),
};
exports.default = WorkflowTransfer;
//# sourceMappingURL=transfer.js.map