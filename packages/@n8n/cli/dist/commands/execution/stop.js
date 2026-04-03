"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ExecutionStop extends base_command_1.BaseCommand {
    async run() {
        const { args, flags } = await this.parse(ExecutionStop);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const data = await client.stopExecution(args.id);
            this.output(data, flags);
        });
    }
}
ExecutionStop.description = 'Stop a running execution';
ExecutionStop.examples = ['<%= config.bin %> execution stop 5678'];
ExecutionStop.args = {
    id: core_1.Args.string({ description: 'Execution ID', required: true }),
};
ExecutionStop.flags = { ...base_command_1.BaseCommand.baseFlags };
exports.default = ExecutionStop;
//# sourceMappingURL=stop.js.map