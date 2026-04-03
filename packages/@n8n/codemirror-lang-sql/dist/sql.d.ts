import type { Completion, CompletionSource } from '@codemirror/autocomplete';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { Dialect } from './tokens';
export declare const getParser: (dialect: Dialect) => {
    mixedLanguage: LRLanguage;
    sqlLanguage: LRLanguage;
};
export type SQLDialectSpec = {
    keywords?: string;
    functions?: string;
    builtin?: string;
    types?: string;
    backslashEscapes?: boolean;
    hashComments?: boolean;
    slashComments?: boolean;
    spaceAfterDashes?: boolean;
    doubleDollarQuotedStrings?: boolean;
    doubleQuotedStrings?: boolean;
    charSetCasts?: boolean;
    operatorChars?: string;
    specialVar?: string;
    identifierQuotes?: string;
    unquotedBitLiterals?: boolean;
    treatBitsAsBytes?: boolean;
};
export declare class SQLDialect {
    readonly dialect: Dialect;
    readonly language: LRLanguage;
    readonly spec: SQLDialectSpec;
    readonly sqlLanguage: LRLanguage;
    private constructor();
    get extension(): Extension;
    static define(spec: SQLDialectSpec): SQLDialect;
}
export interface SQLConfig {
    dialect?: SQLDialect;
    schema?: {
        [table: string]: ReadonlyArray<string | Completion>;
    };
    tables?: readonly Completion[];
    schemas?: readonly Completion[];
    defaultTable?: string;
    defaultSchema?: string;
    upperCaseKeywords?: boolean;
}
export declare function keywordCompletionSource(dialect: SQLDialect, upperCase?: boolean): CompletionSource;
export declare function keywordCompletion(dialect: SQLDialect, upperCase?: boolean): Extension;
export declare function schemaCompletionSource(config: SQLConfig): CompletionSource;
export declare function schemaCompletion(config: SQLConfig): Extension;
export declare function sql(config?: SQLConfig): LanguageSupport;
export declare const StandardSQL: SQLDialect;
export declare const PostgreSQL: SQLDialect;
export declare const MySQL: SQLDialect;
export declare const MariaSQL: SQLDialect;
export declare const MSSQL: SQLDialect;
export declare const SQLite: SQLDialect;
export declare const Cassandra: SQLDialect;
export declare const PLSQL: SQLDialect;
export declare const OracleDB: SQLDialect;
