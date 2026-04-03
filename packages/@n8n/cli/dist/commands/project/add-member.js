"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectAddMember extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectAddMember);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.addProjectMember(args.id, flags.user, flags.role);
            this.succeed(`User ${flags.user} added to project ${args.id}.`, flags, {
                projectId: args.id,
                userId: flags.user,
                role: flags.role,
            });
        });
    }
}
ProjectAddMember.description = 'Add a member to a project';
ProjectAddMember.examples = [
    '<%= config.bin %> project add-member proj-abc --user=user-123 --role=project:editor',
];
ProjectAddMember.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectAddMember.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    user: core_1.Flags.string({ description: 'User ID', required: true }),
    role: core_1.Flags.string({ description: 'Role (e.g. project:editor)', required: true }),
};
exports.default = ProjectAddMember;
//# sourceMappingURL=add-member.js.map