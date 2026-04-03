"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class TagCreate extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(TagCreate);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.createTag(flags.name);
            this.output(data, flags);
        });
    }
}
TagCreate.description = 'Create a tag';
TagCreate.examples = ['<%= config.bin %> tag create --name=production'];
TagCreate.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    name: core_1.Flags.string({ description: 'Tag name', required: true }),
};
exports.default = TagCreate;
//# sourceMappingURL=create.js.map