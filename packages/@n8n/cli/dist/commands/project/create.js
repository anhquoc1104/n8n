"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(ProjectCreate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.createProject(flags.name);
            this.output(data, flags);
        });
    }
}
ProjectCreate.description = 'Create a project';
ProjectCreate.examples = ['<%= config.bin %> project create --name="AI Workflows"'];
ProjectCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    name: core_1.Flags.string({ description: 'Project name', required: true }),
};
exports.default = ProjectCreate;
//# sourceMappingURL=create.js.map