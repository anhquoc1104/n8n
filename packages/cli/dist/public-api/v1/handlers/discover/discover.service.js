"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDiscoverResponse = buildDiscoverResponse;
exports._resetCache = _resetCache;
const path_1 = __importDefault(require("path"));
const json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'];
let cachedEndpointsPromise;
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isScopeTagged(value) {
    return typeof value === 'function' && '__apiKeyScope' in value;
}
function extractScopeFromHandler(handlerChain) {
    for (const middleware of handlerChain) {
        if (isScopeTagged(middleware)) {
            return middleware.__apiKeyScope;
        }
    }
    return null;
}
function extractRequestSchema(operation) {
    if (!isRecord(operation.requestBody))
        return undefined;
    const content = operation.requestBody.content;
    if (!isRecord(content))
        return undefined;
    const json = content['application/json'];
    if (!isRecord(json))
        return undefined;
    const schema = json.schema;
    return isRecord(schema) ? schema : undefined;
}
async function parseEndpointsFromSpec() {
    if (!cachedEndpointsPromise) {
        cachedEndpointsPromise = _parseEndpointsFromSpec();
    }
    return await cachedEndpointsPromise;
}
async function _parseEndpointsFromSpec() {
    const specPath = path_1.default.join(__dirname, '..', '..', 'openapi.yml');
    const publicApiRoot = path_1.default.join(__dirname, '..', '..', '..');
    const spec = await json_schema_ref_parser_1.default.dereference(specPath);
    if (!isRecord(spec) || !isRecord(spec.paths))
        return [];
    const endpoints = [];
    const handlerCache = new Map();
    for (const [pathKey, pathValue] of Object.entries(spec.paths)) {
        if (!isRecord(pathValue))
            continue;
        for (const method of HTTP_METHODS) {
            const operation = pathValue[method];
            if (!isRecord(operation))
                continue;
            const operationId = operation['x-eov-operation-id'];
            const handlerPath = operation['x-eov-operation-handler'];
            if (typeof operationId !== 'string' || typeof handlerPath !== 'string')
                continue;
            const tags = Array.isArray(operation.tags) ? operation.tags : [];
            const tag = typeof tags[0] === 'string' ? tags[0] : 'Other';
            let handlerModule = handlerCache.get(handlerPath);
            if (!handlerModule) {
                try {
                    const fullHandlerPath = path_1.default.join(publicApiRoot, handlerPath);
                    const loaded = require(fullHandlerPath);
                    if (!isRecord(loaded))
                        continue;
                    handlerModule = loaded;
                    handlerCache.set(handlerPath, handlerModule);
                }
                catch {
                    continue;
                }
            }
            const middlewareChain = handlerModule[operationId];
            const scope = Array.isArray(middlewareChain)
                ? extractScopeFromHandler(middlewareChain)
                : null;
            const requestSchema = extractRequestSchema(operation);
            endpoints.push({
                method: method.toUpperCase(),
                path: `/api/v1${pathKey}`,
                operationId,
                tag,
                scope,
                requestSchema,
            });
        }
    }
    return endpoints;
}
async function buildDiscoverResponse(callerScopes, options) {
    const allEndpoints = await parseEndpointsFromSpec();
    const scopeSet = new Set(callerScopes);
    const includeSchemas = options?.includeSchemas === true;
    const filtered = allEndpoints.filter((ep) => ep.scope === null || scopeSet.has(ep.scope));
    const resources = {};
    for (const ep of filtered) {
        const resourceKey = ep.tag.toLowerCase();
        if (!resources[resourceKey]) {
            resources[resourceKey] = { operations: [], endpoints: [] };
        }
        const entry = {
            method: ep.method,
            path: ep.path,
            operationId: ep.operationId,
        };
        if (includeSchemas && ep.requestSchema) {
            entry.requestSchema = ep.requestSchema;
        }
        resources[resourceKey].endpoints.push(entry);
        const operation = ep.scope?.split(':')[1];
        if (operation && !resources[resourceKey].operations.includes(operation)) {
            resources[resourceKey].operations.push(operation);
        }
    }
    const resourceFilter = options?.resource?.toLowerCase();
    const operationFilter = options?.operation?.toLowerCase();
    let filteredResources = resources;
    if (resourceFilter) {
        const match = filteredResources[resourceFilter];
        filteredResources = match ? { [resourceFilter]: match } : {};
    }
    if (operationFilter) {
        const scopeByOperationId = new Map(filtered.map((f) => [f.operationId, f.scope?.split(':')[1]?.toLowerCase()]));
        const result = {};
        for (const [key, info] of Object.entries(filteredResources)) {
            const matchingEndpoints = info.endpoints.filter((ep) => scopeByOperationId.get(ep.operationId) === operationFilter);
            if (matchingEndpoints.length > 0) {
                result[key] = {
                    operations: info.operations.filter((o) => o.toLowerCase() === operationFilter),
                    endpoints: matchingEndpoints,
                };
            }
        }
        filteredResources = result;
    }
    const allOperations = [...new Set(Object.values(resources).flatMap((r) => r.operations))];
    return {
        scopes: callerScopes,
        resources: filteredResources,
        filters: {
            resource: {
                description: 'Filter to a specific resource',
                values: Object.keys(resources),
            },
            operation: {
                description: 'Filter to a specific operation',
                values: allOperations,
            },
            include: {
                description: 'Include additional data',
                values: ['schemas'],
            },
        },
        specUrl: '/api/v1/openapi.yml',
    };
}
function _resetCache() {
    cachedEndpointsPromise = undefined;
}
//# sourceMappingURL=discover.service.js.map