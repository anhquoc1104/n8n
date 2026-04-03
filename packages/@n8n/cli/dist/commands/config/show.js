"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const config_1 = require("../../config");
class ConfigShow extends core_1.Command {
    async run() {
        await this.parse(ConfigShow);
        const config = (0, config_1.readConfig)();
        const url = config.url ?? '(not set)';
        const apiKey = config.apiKey ? '****' + config.apiKey.slice(-4) : '(not set)';
        this.log(`URL:      ${url}`);
        this.log(`API Key:  ${apiKey}`);
    }
}
ConfigShow.description = 'Show current CLI configuration';
ConfigShow.examples = ['<%= config.bin %> config show'];
exports.default = ConfigShow;
//# sourceMappingURL=show.js.map