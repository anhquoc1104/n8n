"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableUpsertRows extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableUpsertRows);
        await this.execute(async () => {
            const raw = this.readInput(flags);
            const body = JSON.parse(raw);
            const client = this.getClient(flags);
            const data = await client.upsertDataTableRows(args.tableId, body.filter, body.data);
            this.output(data, flags);
        });
    }
}
DataTableUpsertRows.description = 'Upsert rows in a data table';
DataTableUpsertRows.examples = [
    '<%= config.bin %> data-table upsert-rows dt-abc --file=upsert.json',
    'cat upsert.json | <%= config.bin %> data-table upsert-rows dt-abc --stdin',
];
DataTableUpsertRows.args = {
    tableId: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableUpsertRows.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    file: core_1.Flags.string({
        description: 'Path to JSON file with {filter, data} object',
    }),
    stdin: core_1.Flags.boolean({
        description: 'Read {filter, data} JSON from stdin',
        default: false,
    }),
};
exports.default = DataTableUpsertRows;
//# sourceMappingURL=upsert-rows.js.map