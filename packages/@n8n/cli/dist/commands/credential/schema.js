"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class CredentialSchema extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(CredentialSchema);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getCredentialSchema(args.typeName);
            this.output(data, flags);
        });
    }
}
CredentialSchema.description = 'Get the JSON schema for a credential type';
CredentialSchema.examples = [
    '<%= config.bin %> credential schema notionApi',
    '<%= config.bin %> credential schema slackOAuth2Api --format=json',
];
CredentialSchema.args = {
    typeName: core_1.Args.string({ description: 'Credential type name', required: true }),
};
CredentialSchema.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = CredentialSchema;
//# sourceMappingURL=schema.js.map