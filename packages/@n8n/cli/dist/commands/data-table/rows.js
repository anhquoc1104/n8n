"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableRows extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableRows);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const query = {};
            if (flags.search)
                query.search = flags.search;
            if (flags.filter)
                query.filter = flags.filter;
            const data = await client.listDataTableRows(args.tableId, query, flags.limit);
            this.output(data, flags);
        });
    }
}
DataTableRows.description = 'List rows in a data table';
DataTableRows.examples = [
    '<%= config.bin %> data-table rows dt-abc',
    '<%= config.bin %> data-table rows dt-abc --search=keyword --limit=50',
];
DataTableRows.args = {
    tableId: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableRows.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    search: core_1.Flags.string({ description: 'Full-text search across string columns' }),
    filter: core_1.Flags.string({ description: 'Filter as JSON string' }),
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = DataTableRows;
//# sourceMappingURL=rows.js.map