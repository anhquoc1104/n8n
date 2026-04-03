"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class TagUpdate extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(TagUpdate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.updateTag(args.id, flags.name);
            this.output(data, flags);
        });
    }
}
TagUpdate.description = 'Update a tag';
TagUpdate.examples = ['<%= config.bin %> tag update 1 --name=staging'];
TagUpdate.args = {
    id: core_1.Args.string({ description: 'Tag ID', required: true }),
};
TagUpdate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    name: core_1.Flags.string({ description: 'New tag name', required: true }),
};
exports.default = TagUpdate;
//# sourceMappingURL=update.js.map