"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectMembers extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectMembers);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listProjectMembers(args.id, flags.limit);
            this.output(data, flags, { columns: ['id', 'email', 'role'] });
        });
    }
}
ProjectMembers.description = 'List members of a project';
ProjectMembers.examples = ['<%= config.bin %> project members proj-abc'];
ProjectMembers.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectMembers.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = ProjectMembers;
//# sourceMappingURL=members.js.map