"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectUpdate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectUpdate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.updateProject(args.id, flags.name);
            this.succeed(`Project ${args.id} updated.`, flags, { id: args.id, name: flags.name });
        });
    }
}
ProjectUpdate.description = 'Update a project';
ProjectUpdate.examples = ['<%= config.bin %> project update proj-abc --name="New Name"'];
ProjectUpdate.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectUpdate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    name: core_1.Flags.string({ description: 'New project name', required: true }),
};
exports.default = ProjectUpdate;
//# sourceMappingURL=update.js.map