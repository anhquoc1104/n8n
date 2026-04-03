"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(CredentialList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listCredentials({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'name', 'type', 'createdAt'] });
        });
    }
}
CredentialList.description = 'List credentials';
CredentialList.examples = [
    '<%= config.bin %> credential list',
    '<%= config.bin %> credential list --format=json',
];
CredentialList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = CredentialList;
//# sourceMappingURL=list.js.map