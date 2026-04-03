"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(CredentialGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getCredential(args.id);
            this.output(data, flags);
        });
    }
}
CredentialGet.description = 'Get credential metadata (no secrets)';
CredentialGet.examples = ['<%= config.bin %> credential get 42'];
CredentialGet.args = {
    id: core_1.Args.string({ description: 'Credential ID', required: true }),
};
CredentialGet.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = CredentialGet;
//# sourceMappingURL=get.js.map