"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableGet extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(DataTableGet);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.getDataTable(args.id);
            this.output(data, flags);
        });
    }
}
DataTableGet.description = 'Get a data table by ID';
DataTableGet.examples = ['<%= config.bin %> data-table get dt-abc'];
DataTableGet.args = {
    id: core_1.Args.string({ description: 'Data table ID', required: true }),
};
DataTableGet.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = DataTableGet;
//# sourceMappingURL=get.js.map