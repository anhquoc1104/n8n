"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(ProjectList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listProjects({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'name', 'type', 'createdAt'] });
        });
    }
}
ProjectList.description = 'List projects';
ProjectList.examples = ['<%= config.bin %> project list'];
ProjectList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = ProjectList;
//# sourceMappingURL=list.js.map