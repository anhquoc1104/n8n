"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableDeleteRows extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableDeleteRows);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.deleteDataTableRows(args.tableId, flags.filter);
            this.output(data, flags);
        });
    }
}
DataTableDeleteRows.description = 'Delete rows from a data table';
DataTableDeleteRows.examples = [
    '<%= config.bin %> data-table delete-rows dt-abc --filter=\'{"type":"and","filters":[{"columnName":"status","condition":"eq","value":"archived"}]}\'',
];
DataTableDeleteRows.args = {
    tableId: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableDeleteRows.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    filter: core_1.Flags.string({
        description: 'Filter as JSON string (required)',
        required: true,
    }),
};
exports.default = DataTableDeleteRows;
//# sourceMappingURL=delete-rows.js.map