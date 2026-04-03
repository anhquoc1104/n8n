"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableUpdateRows extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableUpdateRows);
        await this.execute(async () => {
            const raw = this.readInput(flags);
            const body = JSON.parse(raw);
            const client = this.getClient(flags);
            const data = await client.updateDataTableRows(args.tableId, body.filter, body.data);
            this.output(data, flags);
        });
    }
}
DataTableUpdateRows.description = 'Update rows in a data table';
DataTableUpdateRows.examples = [
    '<%= config.bin %> data-table update-rows dt-abc --file=update.json',
    'cat update.json | <%= config.bin %> data-table update-rows dt-abc --stdin',
];
DataTableUpdateRows.args = {
    tableId: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableUpdateRows.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    file: core_1.Flags.string({
        description: 'Path to JSON file with {filter, data} object',
    }),
    stdin: core_1.Flags.boolean({
        description: 'Read {filter, data} JSON from stdin',
        default: false,
    }),
};
exports.default = DataTableUpdateRows;
//# sourceMappingURL=update-rows.js.map