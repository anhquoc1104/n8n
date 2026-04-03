"use strict";
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const discover_service_1 = require("./discover.service");
const API_KEY_AUDIENCE = 'public-api';
function firstString(value) {
    if (typeof value === 'string')
        return value;
    if (Array.isArray(value) && typeof value[0] === 'string')
        return value[0];
    return undefined;
}
module.exports = {
    getDiscover: [
        async (req, res) => {
            const apiKey = firstString(req.headers['x-n8n-api-key']);
            if (!apiKey) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const apiKeyRecord = await di_1.Container.get(db_1.ApiKeyRepository).findOne({
                where: { apiKey, audience: API_KEY_AUDIENCE },
                select: { scopes: true },
            });
            if (!apiKeyRecord) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const includeSchemas = req.query.include === 'schemas';
            const response = await (0, discover_service_1.buildDiscoverResponse)(apiKeyRecord.scopes, {
                includeSchemas,
                resource: firstString(req.query.resource),
                operation: firstString(req.query.operation),
            });
            return res.json({ data: response });
        },
    ],
};
//# sourceMappingURL=discover.handler.js.map