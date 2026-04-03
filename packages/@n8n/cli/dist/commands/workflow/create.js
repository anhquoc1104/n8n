"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(WorkflowCreate);
        await this.execute(async () => {
            const raw = this.readInput(flags);
            const body = JSON.parse(raw);
            const client = this.getClient(flags);
            const data = await client.createWorkflow(body);
            this.output(data, flags);
        });
    }
}
WorkflowCreate.description = 'Create a workflow from a JSON file';
WorkflowCreate.examples = [
    '<%= config.bin %> workflow create --file=workflow.json',
    'cat workflow.json | <%= config.bin %> workflow create --stdin',
];
WorkflowCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    file: core_1.Flags.string({ description: 'Path to workflow JSON file' }),
    stdin: core_1.Flags.boolean({ description: 'Read workflow JSON from stdin', default: false }),
};
exports.default = WorkflowCreate;
//# sourceMappingURL=create.js.map