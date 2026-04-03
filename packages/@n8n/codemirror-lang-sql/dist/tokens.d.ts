import { ExternalTokenizer } from '@lezer/lr';
export interface Dialect {
    backslashEscapes: boolean;
    hashComments: boolean;
    spaceAfterDashes: boolean;
    slashComments: boolean;
    doubleQuotedStrings: boolean;
    doubleDollarQuotedStrings: boolean;
    unquotedBitLiterals: boolean;
    treatBitsAsBytes: boolean;
    charSetCasts: boolean;
    operatorChars: string;
    specialVar: string;
    identifierQuotes: string;
    words: {
        [name: string]: number;
    };
}
export declare const SQLTypes = "array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ";
export declare const SQLFunctions = "abs absolute case check cast concat coalesce cube collate count current_date current_path current_role current_time current_timestamp current_user day exists grouping hour localtime localtimestamp minute month second trim session_user size system_user treat unnest user year equals lower upper pow floor ceil exp log ifnull min max avg sum sqrt round ";
export declare const SQLKeywords = "action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded catalog close collation column commit condition connect connection constraint constraints constructor continue corresponding create cross current current_default_transform_group current_transform_group_for_type cursor cycle data deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exit external fetch first for foreign found from free full function general get global go goto grant group handle having hold identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local locator loop map match method modifies module names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search section select session set sets signal similar some space specific specifictype sql sqlexception sqlstate sqlwarning start state static table temporary then timezone_hour timezone_minute to trailing transaction translation trigger under undo union unique until update usage using value values view when whenever where while with without work write zone ";
export declare function dialect(spec: Partial<Dialect>, kws?: string, types?: string, builtin?: string, functions?: string): Dialect;
export declare function tokensFor(d: Dialect): ExternalTokenizer;
export declare const tokens: ExternalTokenizer;
