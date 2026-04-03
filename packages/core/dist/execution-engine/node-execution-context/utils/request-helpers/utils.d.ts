import type { AxiosRequestConfig } from 'axios';
import { type AgentOptions } from 'https';
import type { IHttpRequestOptions } from 'n8n-workflow';
import type { SsrfBridge } from '../../../../execution-engine';
export declare function tryParseUrl(url: string): URL | null;
export declare function getUrlFromProxyConfig(proxyConfig: IHttpRequestOptions['proxy'] | string): string | null;
export declare function buildTargetUrl(url?: string, baseURL?: string): string | undefined;
export declare function setAxiosAgents(config: AxiosRequestConfig, agentOptions?: AgentOptions, proxyConfig?: IHttpRequestOptions['proxy'] | string, secureLookup?: ReturnType<SsrfBridge['createSecureLookup']>): void;
