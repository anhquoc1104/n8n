"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ProjectRemoveMember extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ProjectRemoveMember);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.removeProjectMember(args.id, flags.user);
            this.succeed(`User ${flags.user} removed from project ${args.id}.`, flags, {
                projectId: args.id,
                userId: flags.user,
                removed: true,
            });
        });
    }
}
ProjectRemoveMember.description = 'Remove a member from a project';
ProjectRemoveMember.examples = ['<%= config.bin %> project remove-member proj-abc --user=user-123'];
ProjectRemoveMember.args = {
    id: core_1.Args.string({ description: 'Project ID', required: true }),
};
ProjectRemoveMember.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    user: core_1.Flags.string({ description: 'User ID', required: true }),
};
exports.default = ProjectRemoveMember;
//# sourceMappingURL=remove-member.js.map