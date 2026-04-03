"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialTransfer extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(CredentialTransfer);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.transferCredential(args.id, flags.project);
            this.succeed(`Credential ${args.id} transferred to project ${flags.project}.`, flags, {
                id: args.id,
                transferredTo: flags.project,
            });
        });
    }
}
CredentialTransfer.description = 'Transfer a credential to another project';
CredentialTransfer.examples = ['<%= config.bin %> credential transfer 42 --project=proj-abc'];
CredentialTransfer.args = {
    id: core_1.Args.string({ description: 'Credential ID', required: true }),
};
CredentialTransfer.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    project: core_1.Flags.string({ description: 'Destination project ID', required: true }),
};
exports.default = CredentialTransfer;
//# sourceMappingURL=transfer.js.map