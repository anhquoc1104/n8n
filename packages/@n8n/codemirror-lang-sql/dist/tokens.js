"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.SQLKeywords = exports.SQLFunctions = exports.SQLTypes = void 0;
exports.dialect = dialect;
exports.tokensFor = tokensFor;
const lr_1 = require("@lezer/lr");
const grammar_sql_terms_1 = require("./grammar.sql.terms");
var Ch;
(function (Ch) {
    Ch[Ch["Newline"] = 10] = "Newline";
    Ch[Ch["Space"] = 32] = "Space";
    Ch[Ch["DoubleQuote"] = 34] = "DoubleQuote";
    Ch[Ch["Hash"] = 35] = "Hash";
    Ch[Ch["Dollar"] = 36] = "Dollar";
    Ch[Ch["SingleQuote"] = 39] = "SingleQuote";
    Ch[Ch["ParenL"] = 40] = "ParenL";
    Ch[Ch["ParenR"] = 41] = "ParenR";
    Ch[Ch["Star"] = 42] = "Star";
    Ch[Ch["Plus"] = 43] = "Plus";
    Ch[Ch["Comma"] = 44] = "Comma";
    Ch[Ch["Dash"] = 45] = "Dash";
    Ch[Ch["Dot"] = 46] = "Dot";
    Ch[Ch["Slash"] = 47] = "Slash";
    Ch[Ch["Colon"] = 58] = "Colon";
    Ch[Ch["Semi"] = 59] = "Semi";
    Ch[Ch["Question"] = 63] = "Question";
    Ch[Ch["At"] = 64] = "At";
    Ch[Ch["BracketL"] = 91] = "BracketL";
    Ch[Ch["BracketR"] = 93] = "BracketR";
    Ch[Ch["Backslash"] = 92] = "Backslash";
    Ch[Ch["Underscore"] = 95] = "Underscore";
    Ch[Ch["Backtick"] = 96] = "Backtick";
    Ch[Ch["BraceL"] = 123] = "BraceL";
    Ch[Ch["BraceR"] = 125] = "BraceR";
    Ch[Ch["A"] = 65] = "A";
    Ch[Ch["a"] = 97] = "a";
    Ch[Ch["B"] = 66] = "B";
    Ch[Ch["b"] = 98] = "b";
    Ch[Ch["E"] = 69] = "E";
    Ch[Ch["e"] = 101] = "e";
    Ch[Ch["F"] = 70] = "F";
    Ch[Ch["f"] = 102] = "f";
    Ch[Ch["N"] = 78] = "N";
    Ch[Ch["n"] = 110] = "n";
    Ch[Ch["X"] = 88] = "X";
    Ch[Ch["x"] = 120] = "x";
    Ch[Ch["Z"] = 90] = "Z";
    Ch[Ch["z"] = 122] = "z";
    Ch[Ch["_0"] = 48] = "_0";
    Ch[Ch["_1"] = 49] = "_1";
    Ch[Ch["_9"] = 57] = "_9";
})(Ch || (Ch = {}));
function isAlpha(ch) {
    return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57);
}
function isHexDigit(ch) {
    return (ch >= 48 && ch <= 57) || (ch >= 97 && ch <= 102) || (ch >= 65 && ch <= 70);
}
function readLiteral(input, endQuote, backslashEscapes) {
    for (let escaped = false;;) {
        if (input.next < 0)
            return;
        if (input.next === endQuote && !escaped) {
            input.advance();
            return;
        }
        escaped = backslashEscapes && !escaped && input.next === 92;
        input.advance();
    }
}
function readDoubleDollarLiteral(input) {
    for (;;) {
        if (input.next < 0 || input.peek(1) < 0)
            return;
        if (input.next === 36 && input.peek(1) === 36) {
            input.advance(2);
            return;
        }
        input.advance();
    }
}
function readWord(input, result) {
    for (;;) {
        if (input.next !== 95 && !isAlpha(input.next))
            break;
        if (result !== null)
            result += String.fromCharCode(input.next);
        input.advance();
    }
    return result;
}
function readWordOrQuoted(input) {
    if (input.next === 39 ||
        input.next === 34 ||
        input.next === 96) {
        const quote = input.next;
        input.advance();
        readLiteral(input, quote, false);
    }
    else {
        readWord(input);
    }
}
function readBits(input, endQuote) {
    while (input.next === 48 || input.next === 49)
        input.advance();
    if (endQuote && input.next === endQuote)
        input.advance();
}
function readNumber(input, sawDot) {
    for (;;) {
        if (input.next === 46) {
            if (sawDot)
                break;
            sawDot = true;
        }
        else if (input.next < 48 || input.next > 57) {
            break;
        }
        input.advance();
    }
    if (input.next === 69 || input.next === 101) {
        input.advance();
        const advancedInput = input;
        if (advancedInput.next === 43 || advancedInput.next === 45)
            input.advance();
        while (input.next >= 48 && input.next <= 57)
            input.advance();
    }
}
function eol(input) {
    while (!(input.next < 0 || input.next === 10))
        input.advance();
}
function inString(ch, str) {
    for (let i = 0; i < str.length; i++)
        if (str.charCodeAt(i) === ch)
            return true;
    return false;
}
const Space = ' \t\r\n';
function keywords(keywords, types, builtin, functions) {
    const result = Object.create(null);
    result['true'] = result['false'] = grammar_sql_terms_1.Bool;
    result['null'] = result['unknown'] = grammar_sql_terms_1.Null;
    for (const kw of keywords.split(' '))
        if (kw)
            result[kw] = grammar_sql_terms_1.Keyword;
    for (const tp of types.split(' '))
        if (tp)
            result[tp] = grammar_sql_terms_1.Type;
    for (const kw of (builtin || '').split(' '))
        if (kw)
            result[kw] = grammar_sql_terms_1.Builtin;
    for (const fn of (functions || '').split(' '))
        if (fn)
            result[fn] = grammar_sql_terms_1.Function;
    return result;
}
exports.SQLTypes = 'array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ';
exports.SQLFunctions = 'abs absolute case check cast concat coalesce cube collate count current_date current_path current_role current_time current_timestamp current_user day exists grouping hour localtime localtimestamp minute month second trim session_user size system_user treat unnest user year equals lower upper pow floor ceil exp log ifnull min max avg sum sqrt round ';
exports.SQLKeywords = 'action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded catalog close collation column commit condition connect connection constraint constraints constructor continue corresponding create cross current current_default_transform_group current_transform_group_for_type cursor cycle data deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exit external fetch first for foreign found from free full function general get global go goto grant group handle having hold identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local locator loop map match method modifies module names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search section select session set sets signal similar some space specific specifictype sql sqlexception sqlstate sqlwarning start state static table temporary then timezone_hour timezone_minute to trailing transaction translation trigger under undo union unique until update usage using value values view when whenever where while with without work write zone ';
const defaults = {
    backslashEscapes: false,
    hashComments: false,
    spaceAfterDashes: false,
    slashComments: false,
    doubleQuotedStrings: false,
    doubleDollarQuotedStrings: false,
    unquotedBitLiterals: false,
    treatBitsAsBytes: false,
    charSetCasts: false,
    operatorChars: '*+-%<>!==&|~^/',
    specialVar: '?',
    identifierQuotes: '"',
    words: keywords(exports.SQLKeywords, exports.SQLTypes, '', exports.SQLFunctions),
};
function dialect(spec, kws, types, builtin, functions) {
    const dialect = {};
    for (const prop in defaults)
        dialect[prop] = (Object.prototype.hasOwnProperty.call(spec, prop) ? spec : defaults)[prop];
    if (kws)
        dialect.words = keywords(kws, types || '', builtin, functions);
    return dialect;
}
function tokensFor(d) {
    return new lr_1.ExternalTokenizer((input) => {
        const { next } = input;
        input.advance();
        if (inString(next, Space)) {
            while (inString(input.next, Space))
                input.advance();
            input.acceptToken(grammar_sql_terms_1.Whitespace);
        }
        else if (next === 36 && input.next === 36 && d.doubleDollarQuotedStrings) {
            readDoubleDollarLiteral(input);
            input.acceptToken(grammar_sql_terms_1.String);
        }
        else if (next === 39 || (next === 34 && d.doubleQuotedStrings)) {
            readLiteral(input, next, d.backslashEscapes);
            input.acceptToken(grammar_sql_terms_1.String);
        }
        else if ((next === 35 && d.hashComments) ||
            (next === 47 && input.next === 47 && d.slashComments)) {
            eol(input);
            input.acceptToken(grammar_sql_terms_1.LineComment);
        }
        else if (next === 45 &&
            input.next === 45 &&
            (!d.spaceAfterDashes || input.peek(1) === 32)) {
            eol(input);
            input.acceptToken(grammar_sql_terms_1.LineComment);
        }
        else if (next === 47 && input.next === 42) {
            input.advance();
            for (let depth = 1;;) {
                const cur = input.next;
                if (input.next < 0)
                    break;
                input.advance();
                if (cur === 42 && input.next === 47) {
                    depth--;
                    input.advance();
                    if (!depth)
                        break;
                }
                else if (cur === 47 && input.next === 42) {
                    depth++;
                    input.advance();
                }
            }
            input.acceptToken(grammar_sql_terms_1.BlockComment);
        }
        else if ((next === 101 || next === 69) && input.next === 39) {
            input.advance();
            readLiteral(input, 39, true);
        }
        else if ((next === 110 || next === 78) &&
            input.next === 39 &&
            d.charSetCasts) {
            input.advance();
            readLiteral(input, 39, d.backslashEscapes);
            input.acceptToken(grammar_sql_terms_1.String);
        }
        else if (next === 95 && d.charSetCasts) {
            for (let i = 0;; i++) {
                if (input.next === 39 && i > 1) {
                    input.advance();
                    readLiteral(input, 39, d.backslashEscapes);
                    input.acceptToken(grammar_sql_terms_1.String);
                    break;
                }
                if (!isAlpha(input.next))
                    break;
                input.advance();
            }
        }
        else if (next === 40) {
            input.acceptToken(grammar_sql_terms_1.ParenL);
        }
        else if (next === 41) {
            input.acceptToken(grammar_sql_terms_1.ParenR);
        }
        else if (next === 123) {
            input.acceptToken(grammar_sql_terms_1.BraceL);
        }
        else if (next === 125) {
            input.acceptToken(grammar_sql_terms_1.BraceR);
        }
        else if (next === 91) {
            input.acceptToken(grammar_sql_terms_1.BracketL);
        }
        else if (next === 93) {
            input.acceptToken(grammar_sql_terms_1.BracketR);
        }
        else if (next === 59) {
            input.acceptToken(grammar_sql_terms_1.Semi);
        }
        else if (d.unquotedBitLiterals && next === 48 && input.next === 98) {
            input.advance();
            readBits(input);
            input.acceptToken(grammar_sql_terms_1.Bits);
        }
        else if ((next === 98 || next === 66) &&
            (input.next === 39 || input.next === 34)) {
            const quoteStyle = input.next;
            input.advance();
            if (d.treatBitsAsBytes) {
                readLiteral(input, quoteStyle, d.backslashEscapes);
                input.acceptToken(grammar_sql_terms_1.Bytes);
            }
            else {
                readBits(input, quoteStyle);
                input.acceptToken(grammar_sql_terms_1.Bits);
            }
        }
        else if ((next === 48 && (input.next === 120 || input.next === 88)) ||
            ((next === 120 || next === 88) && input.next === 39)) {
            const quoted = input.next === 39;
            input.advance();
            while (isHexDigit(input.next))
                input.advance();
            if (quoted && input.next === 39)
                input.advance();
            input.acceptToken(grammar_sql_terms_1.Number);
        }
        else if (next === 46 && input.next >= 48 && input.next <= 57) {
            readNumber(input, true);
            input.acceptToken(grammar_sql_terms_1.Number);
        }
        else if (next === 46) {
            input.acceptToken(grammar_sql_terms_1.Dot);
        }
        else if (next >= 48 && next <= 57) {
            readNumber(input, false);
            input.acceptToken(grammar_sql_terms_1.Number);
        }
        else if (inString(next, d.operatorChars)) {
            while (inString(input.next, d.operatorChars))
                input.advance();
            input.acceptToken(grammar_sql_terms_1.Operator);
        }
        else if (inString(next, d.specialVar)) {
            if (input.next === next)
                input.advance();
            readWordOrQuoted(input);
            input.acceptToken(grammar_sql_terms_1.SpecialVar);
        }
        else if (inString(next, d.identifierQuotes)) {
            readLiteral(input, next, false);
            input.acceptToken(grammar_sql_terms_1.QuotedIdentifier);
        }
        else if (next === 58 || next === 44) {
            input.acceptToken(grammar_sql_terms_1.Punctuation);
        }
        else if (isAlpha(next)) {
            const word = readWord(input, String.fromCharCode(next));
            input.acceptToken(input.next === 46 ? grammar_sql_terms_1.Identifier : (d.words[word.toLowerCase()] ?? grammar_sql_terms_1.Identifier));
        }
    });
}
exports.tokens = tokensFor(defaults);
//# sourceMappingURL=tokens.js.map