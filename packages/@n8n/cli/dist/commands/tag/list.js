"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class TagList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(TagList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.listTags({}, flags.limit);
            this.output(data, flags, { columns: ['id', 'name', 'createdAt'] });
        });
    }
}
TagList.description = 'List tags';
TagList.examples = ['<%= config.bin %> tag list'];
TagList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = TagList;
//# sourceMappingURL=list.js.map