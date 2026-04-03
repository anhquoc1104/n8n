"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class DataTableCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(DataTableCreate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const columns = JSON.parse(flags.columns);
            const data = await client.createDataTable({ name: flags.name, columns });
            this.output(data, flags);
        });
    }
}
DataTableCreate.description = 'Create a data table';
DataTableCreate.examples = [
    '<%= config.bin %> data-table create --name=Inventory --columns=\'[{"name":"item","type":"string"},{"name":"qty","type":"number"}]\'',
];
DataTableCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    name: core_1.Flags.string({ description: 'Table name', required: true }),
    columns: core_1.Flags.string({
        description: 'Column definitions as JSON array (e.g. [{"name":"col","type":"string"}])',
        required: true,
    }),
};
exports.default = DataTableCreate;
//# sourceMappingURL=create.js.map