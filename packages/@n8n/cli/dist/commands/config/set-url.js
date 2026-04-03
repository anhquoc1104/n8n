"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const config_1 = require("../../config");
class ConfigSetUrl extends core_1.Command {
    async run() {
        const { args } = await this.parse(ConfigSetUrl);
        const config = (0, config_1.readConfig)();
        config.url = args.url;
        (0, config_1.writeConfig)(config);
        this.log(`URL set to ${args.url}`);
    }
}
ConfigSetUrl.description = 'Set the n8n instance URL';
ConfigSetUrl.examples = [
    '<%= config.bin %> config set-url https://my-n8n.app.n8n.cloud',
    '<%= config.bin %> config set-url http://localhost:5678',
];
ConfigSetUrl.args = {
    url: core_1.Args.string({ description: 'n8n instance URL', required: true }),
};
exports.default = ConfigSetUrl;
//# sourceMappingURL=set-url.js.map