"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeFromSchema = completeFromSchema;
exports.completeKeywords = completeKeywords;
const autocomplete_1 = require("@codemirror/autocomplete");
const language_1 = require("@codemirror/language");
const grammar_sql_terms_1 = require("./grammar.sql.terms");
const skippedTokens = ['Whitespace'];
function tokenBefore(tree) {
    const cursor = tree.cursor().moveTo(tree.from, -1);
    while (/Comment/.test(cursor.name))
        cursor.moveTo(cursor.from, -1);
    return cursor.node;
}
function idName(doc, node) {
    const text = doc.sliceString(node.from, node.to);
    const quoted = /^([`'"])(.*)\1$/.exec(text);
    return quoted ? quoted[2] : text;
}
function plainID(node) {
    return node && (node.name === 'Identifier' || node.name === 'QuotedIdentifier');
}
function pathFor(doc, id) {
    if (id.name === 'CompositeIdentifier') {
        const path = [];
        for (let ch = id.firstChild; ch; ch = ch.nextSibling)
            if (plainID(ch))
                path.push(idName(doc, ch));
        return path;
    }
    return [idName(doc, id)];
}
function parentsFor(doc, node) {
    for (let path = [];;) {
        if (!node || node.name !== '.')
            return path;
        const name = tokenBefore(node);
        if (!plainID(name))
            return path;
        path.unshift(idName(doc, name));
        node = tokenBefore(name);
    }
}
function sourceContext(state, startPos) {
    const pos = (0, language_1.syntaxTree)(state).resolveInner(startPos, -1);
    const aliases = getAliases(state.doc, pos);
    if (pos.name === 'Identifier' || pos.name === 'QuotedIdentifier' || pos.name === 'Keyword') {
        return {
            from: pos.from,
            quoted: pos.name === 'QuotedIdentifier' ? state.doc.sliceString(pos.from, pos.from + 1) : null,
            parents: parentsFor(state.doc, tokenBefore(pos)),
            aliases,
        };
    }
    if (pos.name === '.') {
        return { from: startPos, quoted: null, parents: parentsFor(state.doc, pos), aliases };
    }
    else {
        return { from: startPos, quoted: null, parents: [], empty: true, aliases };
    }
}
const EndFrom = new Set('where group having order union intersect except all distinct limit offset fetch for'.split(' '));
function getAliases(doc, at) {
    let statement;
    for (let parent = at; !statement; parent = parent.parent) {
        if (!parent)
            return null;
        if (parent.name === 'Statement')
            statement = parent;
    }
    let aliases = null;
    for (let scan = statement.firstChild, sawFrom = false, prevID = null; scan; scan = scan.nextSibling) {
        if (skippedTokens.includes(scan.name))
            continue;
        const kw = scan.name === 'Keyword' ? doc.sliceString(scan.from, scan.to).toLowerCase() : null;
        let alias = null;
        if (!sawFrom) {
            sawFrom = kw === 'from';
        }
        else if (kw === 'as' && prevID) {
            let next = scan.nextSibling;
            while (next && skippedTokens.includes(next.name))
                next = next.nextSibling;
            if (plainID(next))
                alias = idName(doc, next);
        }
        else if (kw && EndFrom.has(kw)) {
            break;
        }
        else if (prevID && plainID(scan)) {
            alias = idName(doc, scan);
        }
        if (alias) {
            aliases ??= Object.create(null);
            if (aliases) {
                aliases[alias] = pathFor(doc, prevID);
            }
        }
        prevID = /Identifier$/.test(scan.name) ? scan : null;
    }
    return aliases;
}
function maybeQuoteCompletions(quote, completions) {
    if (!quote)
        return completions;
    return completions.map((c) => ({ ...c, label: quote + c.label + quote, apply: undefined }));
}
const Span = /^\w*$/, QuotedSpan = /^[`'"]?\w*[`'"]?$/;
class CompletionLevel {
    constructor() {
        this.list = [];
        this.children = undefined;
    }
    child(name) {
        const children = this.children || (this.children = Object.create(null));
        return children[name] || (children[name] = new CompletionLevel());
    }
    childCompletions(type) {
        return this.children
            ? Object.keys(this.children)
                .filter((x) => x)
                .map((name) => ({ label: name, type }))
            : [];
    }
}
function completeFromSchema(schema, tables, schemas, defaultTableName, defaultSchemaName) {
    const top = new CompletionLevel();
    const defaultSchema = top.child(defaultSchemaName || '');
    for (const table in schema) {
        const dot = table.indexOf('.');
        const schemaCompletions = dot > -1 ? top.child(table.slice(0, dot)) : defaultSchema;
        const tableCompletions = schemaCompletions.child(dot > -1 ? table.slice(dot + 1) : table);
        tableCompletions.list = schema[table].map((val) => typeof val === 'string' ? { label: val, type: 'property' } : val);
    }
    defaultSchema.list = (tables || defaultSchema.childCompletions('type')).concat(defaultTableName ? defaultSchema.child(defaultTableName).list : []);
    for (const sName in top.children) {
        const schema = top.child(sName);
        if (!schema.list.length)
            schema.list = schema.childCompletions('type');
    }
    top.list = defaultSchema.list.concat(schemas || top.childCompletions('type'));
    return (context) => {
        let { parents, from, quoted, empty, aliases } = sourceContext(context.state, context.pos);
        if (empty && !context.explicit)
            return null;
        if (aliases && parents.length === 1)
            parents = aliases[parents[0]] || parents;
        let level = top;
        for (const name of parents) {
            while (!level.children?.[name]) {
                if (level === top)
                    level = defaultSchema;
                else if (level === defaultSchema && defaultTableName)
                    level = level.child(defaultTableName);
                else
                    return null;
            }
            level = level.child(name);
        }
        const quoteAfter = quoted && context.state.sliceDoc(context.pos, context.pos + 1) === quoted;
        let options = level.list;
        if (level === top && aliases)
            options = options.concat(Object.keys(aliases).map((name) => ({ label: name, type: 'constant' })));
        return {
            from,
            to: quoteAfter ? context.pos + 1 : undefined,
            options: maybeQuoteCompletions(quoted, options),
            validFor: quoted ? QuotedSpan : Span,
        };
    };
}
function completeKeywords(keywords, upperCase) {
    const completions = Object.keys(keywords).map((keyword) => ({
        label: upperCase ? keyword.toUpperCase() : keyword,
        type: keywords[keyword] === grammar_sql_terms_1.Type ? 'type' : keywords[keyword] === grammar_sql_terms_1.Keyword ? 'keyword' : 'variable',
        boost: -1,
    }));
    return (0, autocomplete_1.ifNotIn)(['QuotedIdentifier', 'SpecialVar', 'String', 'LineComment', 'BlockComment', '.'], (0, autocomplete_1.completeFromList)(completions));
}
//# sourceMappingURL=complete.js.map