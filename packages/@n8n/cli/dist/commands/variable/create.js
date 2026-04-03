"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class VariableCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(VariableCreate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.createVariable(flags.key, flags.value);
            this.output(data, flags);
        });
    }
}
VariableCreate.description = 'Create a variable';
VariableCreate.examples = [
    '<%= config.bin %> variable create --key=API_ENDPOINT --value=https://api.example.com',
];
VariableCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    key: core_1.Flags.string({ description: 'Variable key', required: true }),
    value: core_1.Flags.string({ description: 'Variable value', required: true }),
};
exports.default = VariableCreate;
//# sourceMappingURL=create.js.map