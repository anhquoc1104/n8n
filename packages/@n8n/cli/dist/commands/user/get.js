"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class UserGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(UserGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getUser(args.id);
            this.output(data, flags);
        });
    }
}
UserGet.description = 'Get a user by ID';
UserGet.examples = ['<%= config.bin %> user get user-123'];
UserGet.args = {
    id: core_1.Args.string({ description: 'User ID or email', required: true }),
};
UserGet.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = UserGet;
//# sourceMappingURL=get.js.map