import type { Completion, CompletionSource } from '@codemirror/autocomplete';
export declare function completeFromSchema(schema: {
    [table: string]: ReadonlyArray<string | Completion>;
}, tables?: readonly Completion[], schemas?: readonly Completion[], defaultTableName?: string, defaultSchemaName?: string): CompletionSource;
export declare function completeKeywords(keywords: {
    [name: string]: number;
}, upperCase: boolean): CompletionSource;
