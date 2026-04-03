"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class UserList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(UserList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listUsers({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'email', 'firstName', 'lastName'] });
        });
    }
}
UserList.description = 'List users';
UserList.examples = ['<%= config.bin %> user list'];
UserList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = UserList;
//# sourceMappingURL=list.js.map