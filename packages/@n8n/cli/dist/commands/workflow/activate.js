"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowActivate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowActivate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.activateWorkflow(args.id);
            this.output(data, flags);
        });
    }
}
WorkflowActivate.description = 'Activate (publish) a workflow';
WorkflowActivate.examples = ['<%= config.bin %> workflow activate 1234'];
WorkflowActivate.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowActivate.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = WorkflowActivate;
//# sourceMappingURL=activate.js.map