"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const config_1 = require("../config");
class Logout extends core_1.Command {
    async run() {
        await this.parse(Logout);
        const existing = (0, config_1.readConfig)();
        if (!existing.url && !existing.apiKey) {
            this.log('No active session found.');
            return;
        }
        (0, config_1.deleteConfig)();
        this.log('Logged out successfully. Config removed.');
    }
}
Logout.description = 'Disconnect from the current n8n instance (removes saved config)';
Logout.examples = ['<%= config.bin %> logout'];
exports.default = Logout;
//# sourceMappingURL=logout.js.map