"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowDeactivate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowDeactivate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.deactivateWorkflow(args.id);
            this.output(data, flags);
        });
    }
}
WorkflowDeactivate.description = 'Deactivate a workflow';
WorkflowDeactivate.examples = ['<%= config.bin %> workflow deactivate 1234'];
WorkflowDeactivate.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowDeactivate.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = WorkflowDeactivate;
//# sourceMappingURL=deactivate.js.map