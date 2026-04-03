"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class VariableDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(VariableDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteVariable(args.id);
            this.succeed(`Variable ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
VariableDelete.description = 'Delete a variable';
VariableDelete.examples = ['<%= config.bin %> variable delete var-1'];
VariableDelete.args = {
    id: core_1.Args.string({ description: 'Variable ID', required: true }),
};
VariableDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = VariableDelete;
//# sourceMappingURL=delete.js.map