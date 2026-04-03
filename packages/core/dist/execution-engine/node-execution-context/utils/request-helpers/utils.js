"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseUrl = tryParseUrl;
exports.getUrlFromProxyConfig = getUrlFromProxyConfig;
exports.buildTargetUrl = buildTargetUrl;
exports.setAxiosAgents = setAxiosAgents;
const http_proxy_1 = require("../../../../http-proxy");
function tryParseUrl(url) {
    try {
        return new URL(url);
    }
    catch {
        return null;
    }
}
function getUrlFromProxyConfig(proxyConfig) {
    if (typeof proxyConfig === 'string') {
        const isValidUrl = !!tryParseUrl(proxyConfig);
        return isValidUrl ? proxyConfig : null;
    }
    if (!proxyConfig?.host)
        return null;
    const { protocol, host, port, auth } = proxyConfig;
    const safeProtocol = protocol?.endsWith(':') ? protocol.slice(0, -1) : (protocol ?? 'http');
    try {
        const url = new URL(`${safeProtocol}://${host}`);
        if (port !== undefined)
            url.port = String(port);
        if (auth?.username) {
            url.username = auth.username;
            url.password = auth.password ?? '';
        }
        return url.href;
    }
    catch {
        return null;
    }
}
function buildTargetUrl(url, baseURL) {
    if (!url)
        return undefined;
    try {
        return baseURL ? new URL(url, baseURL).href : url;
    }
    catch {
        return undefined;
    }
}
function setAxiosAgents(config, agentOptions, proxyConfig, secureLookup) {
    if (config.httpAgent || config.httpsAgent)
        return;
    const customProxyUrl = getUrlFromProxyConfig(proxyConfig);
    const targetUrl = buildTargetUrl(config.url, config.baseURL);
    if (!targetUrl)
        return;
    const effectiveOptions = secureLookup && !customProxyUrl ? { ...agentOptions, lookup: secureLookup } : agentOptions;
    config.httpAgent = (0, http_proxy_1.createHttpProxyAgent)(customProxyUrl, targetUrl, effectiveOptions);
    config.httpsAgent = (0, http_proxy_1.createHttpsProxyAgent)(customProxyUrl, targetUrl, effectiveOptions);
}
//# sourceMappingURL=utils.js.map