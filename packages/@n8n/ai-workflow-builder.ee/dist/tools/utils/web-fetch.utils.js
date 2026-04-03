"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrlInUserMessages = isUrlInUserMessages;
exports.normalizeHost = normalizeHost;
exports.isBlockedUrl = isBlockedUrl;
exports.fetchUrl = fetchUrl;
exports.extractReadableContent = extractReadableContent;
const messages_1 = require("@langchain/core/messages");
const dns_1 = __importDefault(require("dns"));
const util_1 = require("util");
const constants_1 = require("../../constants");
const resolve4 = (0, util_1.promisify)(dns_1.default.resolve4);
const resolve6 = (0, util_1.promisify)(dns_1.default.resolve6);
function normalizeUrlForComparison(url) {
    return url.replace(/\/+$/, '');
}
function getMessageText(msg) {
    if (typeof msg.content === 'string')
        return msg.content;
    if (Array.isArray(msg.content)) {
        return msg.content
            .filter((part) => typeof part === 'object' && part !== null && 'type' in part && part.type === 'text')
            .map((part) => part.text)
            .join(' ');
    }
    return '';
}
function isUrlInUserMessages(url, messages) {
    const normalized = normalizeUrlForComparison(url);
    for (const msg of messages) {
        if (!(msg instanceof messages_1.HumanMessage))
            continue;
        const content = getMessageText(msg);
        if (!content)
            continue;
        if (content.includes(url) || content.includes(normalized)) {
            return true;
        }
    }
    return false;
}
function normalizeHost(url) {
    const parsed = new URL(url);
    return parsed.hostname.toLowerCase().replace(/\.$/, '');
}
const PRIVATE_IPV4_RANGES = [
    { start: [127, 0, 0, 0], mask: 8 },
    { start: [10, 0, 0, 0], mask: 8 },
    { start: [172, 16, 0, 0], mask: 12 },
    { start: [192, 168, 0, 0], mask: 16 },
    { start: [169, 254, 0, 0], mask: 16 },
    { start: [0, 0, 0, 0], mask: 8 },
];
function ipToNumber(parts) {
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}
function isPrivateIPv4(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255))
        return false;
    const ipNum = ipToNumber(parts);
    for (const range of PRIVATE_IPV4_RANGES) {
        const rangeStart = ipToNumber(range.start);
        const mask = (0xffffffff << (32 - range.mask)) >>> 0;
        if ((ipNum & mask) === (rangeStart & mask))
            return true;
    }
    return false;
}
function isPrivateIPv6(ip) {
    const normalized = ip.toLowerCase();
    if (normalized === '::1')
        return true;
    if (normalized.startsWith('fe80:'))
        return true;
    if (normalized.startsWith('fc') || normalized.startsWith('fd'))
        return true;
    if (normalized.startsWith('::ffff:')) {
        const v4 = normalized.slice(7);
        return isPrivateIPv4(v4);
    }
    return false;
}
function isBlockedHostname(hostname) {
    if (hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '[::1]' ||
        hostname === '::1') {
        return true;
    }
    if (hostname.endsWith('.local') || hostname.endsWith('.internal')) {
        return true;
    }
    if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal') {
        return true;
    }
    if (isPrivateIPv4(hostname))
        return true;
    if (isPrivateIPv6(hostname.replace(/^\[|\]$/g, '')))
        return true;
    return false;
}
async function isBlockedUrl(url) {
    let parsed;
    try {
        parsed = new URL(url);
    }
    catch {
        return true;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return true;
    }
    const hostname = parsed.hostname.toLowerCase().replace(/\.$/, '');
    if (isBlockedHostname(hostname))
        return true;
    try {
        const [v4Addrs, v6Addrs] = await Promise.allSettled([resolve4(hostname), resolve6(hostname)]);
        const allIps = [];
        if (v4Addrs.status === 'fulfilled')
            allIps.push(...v4Addrs.value);
        if (v6Addrs.status === 'fulfilled')
            allIps.push(...v6Addrs.value);
        if (allIps.length === 0)
            return true;
        for (const ip of allIps) {
            if (isPrivateIPv4(ip) || isPrivateIPv6(ip))
                return true;
        }
    }
    catch {
        return true;
    }
    return false;
}
async function fetchUrl(url, signal) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), constants_1.WEB_FETCH_TIMEOUT_MS);
    if (signal) {
        signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            redirect: 'follow',
            headers: {
                'User-Agent': 'n8n-workflow-builder/1.0',
                Accept: 'text/html,application/xhtml+xml,*/*',
            },
        });
        const finalUrl = response.url;
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/pdf')) {
            return { status: 'unsupported', reason: 'pdf' };
        }
        const requestedHost = normalizeHost(url);
        const finalHost = normalizeHost(finalUrl);
        if (requestedHost !== finalHost) {
            return { status: 'redirect_new_host', finalUrl };
        }
        const reader = response.body?.getReader();
        if (!reader) {
            return {
                status: 'success',
                body: '',
                finalUrl,
                httpStatus: response.status,
                contentType,
            };
        }
        const chunks = [];
        let totalBytes = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            totalBytes += value.byteLength;
            if (totalBytes > constants_1.WEB_FETCH_MAX_BYTES) {
                void reader.cancel();
                break;
            }
            chunks.push(value);
        }
        const body = new TextDecoder().decode(chunks.reduce((acc, chunk) => {
            const merged = new Uint8Array(acc.length + chunk.length);
            merged.set(acc);
            merged.set(chunk, acc.length);
            return merged;
        }, new Uint8Array()));
        return {
            status: 'success',
            body,
            finalUrl,
            httpStatus: response.status,
            contentType,
        };
    }
    finally {
        clearTimeout(timeout);
    }
}
async function extractReadableContent(html, url) {
    const [{ JSDOM, VirtualConsole }, { Readability }, { default: TurndownService }] = await Promise.all([Promise.resolve().then(() => __importStar(require('jsdom'))), Promise.resolve().then(() => __importStar(require('@mozilla/readability'))), Promise.resolve().then(() => __importStar(require('turndown')))]);
    const virtualConsole = new VirtualConsole();
    const dom = new JSDOM(html, { url, virtualConsole });
    const article = new Readability(dom.window.document, { keepClasses: true }).parse();
    const title = article?.title ?? '';
    const articleHtml = article?.content ?? '';
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
    });
    let content = articleHtml ? turndownService.turndown(articleHtml) : '';
    let truncated = false;
    let truncateReason;
    if (content.length > constants_1.WEB_FETCH_MAX_CONTENT_CHARS) {
        content = content.substring(0, constants_1.WEB_FETCH_MAX_CONTENT_CHARS);
        truncated = true;
        truncateReason = `Content truncated to ${constants_1.WEB_FETCH_MAX_CONTENT_CHARS} characters`;
    }
    return { title, content, truncated, truncateReason };
}
//# sourceMappingURL=web-fetch.utils.js.map