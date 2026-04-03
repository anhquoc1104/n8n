import { type BaseMessage } from '@langchain/core/messages';
export declare function isUrlInUserMessages(url: string, messages: BaseMessage[]): boolean;
export interface FetchResult {
    status: 'success' | 'unsupported' | 'redirect_new_host';
    body?: string;
    finalUrl?: string;
    httpStatus?: number;
    contentType?: string;
    reason?: string;
}
export interface ExtractedContent {
    title: string;
    content: string;
    truncated: boolean;
    truncateReason?: string;
}
export declare function normalizeHost(url: string): string;
export declare function isBlockedUrl(url: string): Promise<boolean>;
export declare function fetchUrl(url: string, signal?: AbortSignal): Promise<FetchResult>;
export declare function extractReadableContent(html: string, url: string): Promise<ExtractedContent>;
