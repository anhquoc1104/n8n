"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getProject(args.id);
            this.output(data, flags);
        });
    }
}
ProjectGet.description = 'Get a project by ID';
ProjectGet.examples = ['<%= config.bin %> project get proj-abc'];
ProjectGet.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectGet.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = ProjectGet;
//# sourceMappingURL=get.js.map