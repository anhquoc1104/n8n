"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class TagDelete extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(TagDelete);
        await this.execute(async () => {
            const client = this.getClient(flags);
            await client.deleteTag(args.id);
            this.succeed(`Tag ${args.id} deleted.`, flags, { id: args.id, deleted: true });
        });
    }
}
TagDelete.description = 'Delete a tag';
TagDelete.examples = ['<%= config.bin %> tag delete 1'];
TagDelete.args = {
    id: core_1.Args.string({ description: 'Tag ID', required: true }),
};
TagDelete.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = TagDelete;
//# sourceMappingURL=delete.js.map