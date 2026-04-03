export type OutputFormat = 'table' | 'json' | 'id-only';
export interface OutputOptions {
    format: OutputFormat;
    columns?: string[];
    idField?: string;
    noHeader?: boolean;
}
export declare function formatOutput(data: unknown, options: OutputOptions): string;
export declare function applyJqFilter(data: unknown, expression: string): unknown;
