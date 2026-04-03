"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(DataTableList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listDataTables({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'name', 'createdAt'] });
        });
    }
}
DataTableList.description = 'List data tables';
DataTableList.examples = ['<%= config.bin %> data-table list'];
DataTableList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = DataTableList;
//# sourceMappingURL=list.js.map