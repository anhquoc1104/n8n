"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const base_command_1 = require("../../base-command");
class ExecutionList extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(ExecutionList);
        await this.execute(async () => {
            const client = this.getClient(flags);
            const query = {};
            if (flags.workflow)
                query.workflowId = flags.workflow;
            if (flags.status)
                query.status = flags.status;
            const data = await client.listExecutions(query, flags.limit);
            this.output(data, flags, {
                columns: ['id', 'workflowId', 'status', 'startedAt', 'stoppedAt'],
            });
        });
    }
}
ExecutionList.description = 'List executions';
ExecutionList.examples = [
    '<%= config.bin %> execution list',
    '<%= config.bin %> execution list --workflow=1234 --status=error --limit=10',
];
ExecutionList.flags = {
    ...base_command_1.BaseCommand.baseFlags,
    workflow: core_1.Flags.string({ description: 'Filter by workflow ID' }),
    status: core_1.Flags.string({
        description: 'Filter by status',
        options: ['canceled', 'error', 'running', 'success', 'waiting'],
    }),
    limit: core_1.Flags.integer({ description: 'Maximum number of results' }),
};
exports.default = ExecutionList;
//# sourceMappingURL=list.js.map