"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getWorkflow(args.id);
            this.output(data, flags);
        });
    }
}
WorkflowGet.description = 'Get a workflow by ID';
WorkflowGet.examples = [
    '<%= config.bin %> workflow get 1234',
    '<%= config.bin %> workflow get 1234 --format=json > workflow.json',
];
WorkflowGet.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowGet.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = WorkflowGet;
//# sourceMappingURL=get.js.map