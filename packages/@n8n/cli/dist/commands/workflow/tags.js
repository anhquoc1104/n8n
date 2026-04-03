"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowTags extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(WorkflowTags);
        await this.execute(async () => {
            const client = this.getClient(flags);
            if (flags.set) {
                const tagIds = flags.set.split(',').map((s) => s.trim());
                const data = await client.updateWorkflowTags(args.id, tagIds);
                this.output(data, flags, { columns: ['id', 'name'] });
            }
            else {
                const data = await client.getWorkflowTags(args.id);
                this.output(data, flags, { columns: ['id', 'name'] });
            }
        });
    }
}
WorkflowTags.description = 'Get or set tags on a workflow';
WorkflowTags.examples = [
    '<%= config.bin %> workflow tags 1234',
    '<%= config.bin %> workflow tags 1234 --set=tagId1,tagId2',
];
WorkflowTags.args = {
    id: core_1.Args.string({ description: 'Workflow ID', required: true }),
};
WorkflowTags.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    set: core_1.Flags.string({ description: 'Comma-separated tag IDs to set' }),
};
exports.default = WorkflowTags;
//# sourceMappingURL=tags.js.map