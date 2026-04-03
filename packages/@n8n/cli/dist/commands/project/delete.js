"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteProject(args.id);
            this.succeed(`Project ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
ProjectDelete.description = 'Delete a project';
ProjectDelete.examples = ['<%= config.bin %> project delete proj-abc'];
ProjectDelete.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = ProjectDelete;
//# sourceMappingURL=delete.js.map