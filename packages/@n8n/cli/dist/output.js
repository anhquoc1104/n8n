"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOutput = formatOutput;
exports.applyJqFilter = applyJqFilter;
function pickColumns(data, columns) {
    const result = {};
    for (const col of columns) {
        result[col] = data[col];
    }
    return result;
}
function formatValue(value) {
    if (value === null || value === undefined)
        return '-';
    if (typeof value === 'boolean')
        return value ? 'true' : 'false';
    if (typeof value === 'string') {
        return value.length > 60 ? value.slice(0, 57) + '...' : value;
    }
    if (typeof value === 'number')
        return String(value);
    if (typeof value === 'object')
        return JSON.stringify(value);
    return typeof value === 'bigint' ? String(value) : JSON.stringify(value);
}
function renderTable(data, columns, noHeader) {
    if (data.length === 0)
        return 'No results.';
    const cols = columns ?? Object.keys(data[0]);
    const rows = data.map((row) => pickColumns(row, cols));
    const widths = {};
    for (const col of cols) {
        widths[col] = col.length;
        for (const row of rows) {
            const len = formatValue(row[col]).length;
            if (len > widths[col])
                widths[col] = len;
        }
    }
    const lines = rows.map((row) => cols.map((c) => formatValue(row[c]).padEnd(widths[c])).join('  '));
    if (noHeader) {
        return lines.join('\n');
    }
    const header = cols.map((c) => c.toUpperCase().padEnd(widths[c])).join('  ');
    const separator = cols.map((c) => '-'.repeat(widths[c])).join('  ');
    return [header, separator, ...lines].join('\n');
}
function formatOutput(data, options) {
    const { format, columns, idField = 'id', noHeader } = options;
    switch (format) {
        case 'json':
            return JSON.stringify(data, null, 2);
        case 'id-only': {
            if (Array.isArray(data)) {
                return data
                    .map((item) => {
                    const val = item[idField];
                    return val !== null && val !== undefined ? `${val}` : '';
                })
                    .join('\n');
            }
            if (typeof data === 'object' && data !== null && idField in data) {
                return String(data[idField]);
            }
            return '';
        }
        case 'table':
        default: {
            if (Array.isArray(data)) {
                return renderTable(data, columns, noHeader);
            }
            if (typeof data === 'object' && data !== null) {
                const entries = Object.entries(data);
                if (noHeader) {
                    return entries.map(([, v]) => formatValue(v)).join('\n');
                }
                const maxKeyLen = Math.max(...entries.map(([k]) => k.length));
                return entries.map(([k, v]) => `${k.padEnd(maxKeyLen)}  ${formatValue(v)}`).join('\n');
            }
            return String(data);
        }
    }
}
function parseJqPath(expr) {
    const segments = [];
    let i = 0;
    if (expr[0] === '.')
        i++;
    while (i < expr.length) {
        if (expr[i] === '[') {
            i++;
            if (expr[i] === ']') {
                segments.push({ type: 'iterate' });
                i++;
            }
            else {
                let numStr = '';
                while (i < expr.length && expr[i] !== ']') {
                    numStr += expr[i];
                    i++;
                }
                segments.push({ type: 'index', index: parseInt(numStr, 10) });
                i++;
            }
        }
        else if (expr[i] === '.') {
            i++;
        }
        else {
            let name = '';
            while (i < expr.length && expr[i] !== '.' && expr[i] !== '[') {
                name += expr[i];
                i++;
            }
            if (name) {
                segments.push({ type: 'field', name });
            }
        }
    }
    return segments;
}
function evaluateJq(data, segments, startIdx) {
    let current = data;
    for (let i = startIdx; i < segments.length; i++) {
        const seg = segments[i];
        if (current === null || current === undefined)
            return current;
        switch (seg.type) {
            case 'field':
                if (typeof current === 'object' && current !== null) {
                    current = current[seg.name];
                }
                else {
                    return undefined;
                }
                break;
            case 'index':
                if (Array.isArray(current)) {
                    current = current[seg.index];
                }
                else {
                    return undefined;
                }
                break;
            case 'iterate':
                if (Array.isArray(current)) {
                    return current.map((item) => evaluateJq(item, segments, i + 1));
                }
                return undefined;
        }
    }
    return current;
}
function applyJqFilter(data, expression) {
    const expr = expression.trim();
    if (expr === '.')
        return data;
    const segments = parseJqPath(expr);
    return evaluateJq(data, segments, 0);
}
//# sourceMappingURL=output.js.map