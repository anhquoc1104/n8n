"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteDataTable(args.id);
            this.succeed(`Data table ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
DataTableDelete.description = 'Delete a data table';
DataTableDelete.examples = ['<%= config.bin %> data-table delete dt-abc'];
DataTableDelete.args = {
    id: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = DataTableDelete;
//# sourceMappingURL=delete.js.map