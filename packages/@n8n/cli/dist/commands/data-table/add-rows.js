"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableAddRows extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableAddRows);
        await this.execute(async () => {
            const raw = this.readInput(flags);
            const rows = JSON.parse(raw);
            const client = this.getClient(flags);
            const data = await client.addDataTableRows(args.tableId, rows);
            this.output(data, flags);
        });
    }
}
DataTableAddRows.description = 'Add rows to a data table';
DataTableAddRows.examples = [
    '<%= config.bin %> data-table add-rows dt-abc --file=rows.json',
    'cat rows.json | <%= config.bin %> data-table add-rows dt-abc --stdin',
];
DataTableAddRows.args = {
    tableId: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableAddRows.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    file: core_1.Flags.string({ description: 'Path to JSON file with row data array' }),
    stdin: core_1.Flags.boolean({ description: 'Read row data JSON from stdin', default: false }),
};
exports.default = DataTableAddRows;
//# sourceMappingURL=add-rows.js.map