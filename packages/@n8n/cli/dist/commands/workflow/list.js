"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class WorkflowList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(WorkflowList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const query = {};
            if (flags.active)
                query.active = 'true';
            if (flags.tag)
                query.tags = flags.tag;
            if (flags.name)
                query.name = flags.name;
            const data = await client.listWorkflows(query, flags.limit);
            this.output(data, flags, { columns: ['id', 'name', 'active', 'updatedAt'] });
        });
    }
}
WorkflowList.description = 'List workflows';
WorkflowList.examples = [
    '<%= config.bin %> workflow list',
    '<%= config.bin %> workflow list --active',
    '<%= config.bin %> workflow list --tag=production --format=json',
];
WorkflowList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    active: core_1.Flags.boolean({ description: 'Only show active workflows' }),
    tag: core_1.Flags.string({ description: 'Filter by tag name', aliases: ['tags'] }),
    name: core_1.Flags.string({ description: 'Filter by workflow name' }),
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = WorkflowList;
//# sourceMappingURL=list.js.map