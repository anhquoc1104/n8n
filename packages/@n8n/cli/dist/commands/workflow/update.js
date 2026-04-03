"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowUpdate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowUpdate);
        await this.execute(async () => {
            const raw = this.readInput(flags);
            const body = JSON.parse(raw);
            const client = this.getClient(flags);
            const data = await client.updateWorkflow(args.id, body);
            this.output(data, flags);
        });
    }
}
WorkflowUpdate.description = 'Update a workflow from a JSON file';
WorkflowUpdate.examples = [
    '<%= config.bin %> workflow update 1234 --file=workflow.json',
    'cat workflow.json | <%= config.bin %> workflow update 1234 --stdin',
];
WorkflowUpdate.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowUpdate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    file: core_1.Flags.string({ description: 'Path to workflow JSON file' }),
    stdin: core_1.Flags.boolean({ description: 'Read workflow JSON from stdin', default: false }),
};
exports.default = WorkflowUpdate;
//# sourceMappingURL=update.js.map