"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class Audit extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(Audit);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const categories = flags.categories?.split(',').map((s) => s.trim());
            const data = await client.audit(categories);
            this.output(data, flags);
        });
    }
}
Audit.description = 'Generate a security audit report';
Audit.examples = [
    '<%= config.bin %> audit',
    '<%= config.bin %> audit --categories=credentials,nodes',
];
Audit.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    categories: core_1.Flags.string({
        description: 'Comma-separated audit categories (credentials, database, nodes, filesystem, instance)',
    }),
};
exports.default = Audit;
//# sourceMappingURL=index.js.map