"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(CredentialCreate);
        await this.execute(async () => {
            let credData;
            if (flags.data) {
                credData = JSON.parse(flags.data);
            }
            else {
                const raw = this.readInput(flags);
                credData = JSON.parse(raw);
            }
            const client = this.getClient(flags);
            const data = await client.createCredential({
                type: flags.type,
                name: flags.name,
                data: credData,
            });
            this.output(data, flags);
        });
    }
}
CredentialCreate.description = 'Create a credential';
CredentialCreate.examples = [
    '<%= config.bin %> credential create --type=notionApi --name=\'My Notion\' --data=\'{"apiKey":"..."}\'',
    "<%= config.bin %> credential create --type=notionApi --name='My Notion' --file=cred.json",
    "cat cred.json | <%= config.bin %> credential create --type=notionApi --name='My Notion' --stdin",
];
CredentialCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    type: core_1.Flags.string({ description: 'Credential type name', required: true }),
    name: core_1.Flags.string({ description: 'Credential display name', required: true }),
    data: core_1.Flags.string({ description: 'Credential data as JSON string' }),
    file: core_1.Flags.string({ description: 'Path to JSON file with credential data' }),
    stdin: core_1.Flags.boolean({ description: 'Read credential data JSON from stdin', default: false }),
};
exports.default = CredentialCreate;
//# sourceMappingURL=create.js.map