"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class VariableList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(VariableList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listVariables({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'key', 'value'] });
        });
    }
}
VariableList.description = 'List variables';
VariableList.examples = ['<%= config.bin %> variable list'];
VariableList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = VariableList;
//# sourceMappingURL=list.js.map