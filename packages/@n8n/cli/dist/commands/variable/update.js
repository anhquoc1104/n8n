"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class VariableUpdate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(VariableUpdate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.updateVariable(args.id, flags.key, flags.value);
            this.succeed(`Variable ${args.id} updated.`, flags, {
                id: args.id,
                key: flags.key,
                value: flags.value,
            });
        });
    }
}
VariableUpdate.description = 'Update a variable';
VariableUpdate.examples = [
    '<%= config.bin %> variable update var-1 --key=API_ENDPOINT --value=https://new-api.example.com',
];
VariableUpdate.args = {
    id: core_1.Args.string({ description: 'Variable ID', required: true }),
};
VariableUpdate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    key: core_1.Flags.string({ description: 'Variable key', required: true }),
    value: core_1.Flags.string({ description: 'New variable value', required: true }),
};
exports.default = VariableUpdate;
//# sourceMappingURL=update.js.map