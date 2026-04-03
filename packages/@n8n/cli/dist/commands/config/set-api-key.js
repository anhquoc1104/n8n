"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const config_1 = require("../../config");
class ConfigSetApiKey extends core_1.Command {
    async run() {
        const { args } = await this.parse(ConfigSetApiKey);
        const config = (0, config_1.readConfig)();
        config.apiKey = args.key;
        (0, config_1.writeConfig)(config);
        this.log('API key saved.');
    }
}
ConfigSetApiKey.description = 'Set the API key for authentication';
ConfigSetApiKey.examples = ['<%= config.bin %> config set-api-key n8n_api_xxx'];
ConfigSetApiKey.args = {
    key: core_1.Args.string({ description: 'n8n API key', required: true }),
};
exports.default = ConfigSetApiKey;
//# sourceMappingURL=set-api-key.js.map