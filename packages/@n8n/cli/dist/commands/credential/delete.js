"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(CredentialDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteCredential(args.id);
            this.succeed(`Credential ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
CredentialDelete.description = 'Delete a credential';
CredentialDelete.examples = ['<%= config.bin %> credential delete 42'];
CredentialDelete.args = {
    id: core_1.Args.string({ description: 'Credential ID', required: true }),
};
CredentialDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = CredentialDelete;
//# sourceMappingURL=delete.js.map