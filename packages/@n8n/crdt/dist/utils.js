"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedValueDeep = seedValueDeep;
exports.toJSON = toJSON;
exports.getNestedValue = getNestedValue;
exports.setNestedValue = setNestedValue;
function seedValueDeep(doc, value) {
    if (Array.isArray(value)) {
        const arr = doc.createArray();
        for (const item of value) {
            arr.push(seedValueDeep(doc, item));
        }
        return arr;
    }
    if (value !== null && typeof value === 'object') {
        const map = doc.createMap();
        for (const [k, v] of Object.entries(value)) {
            map.set(k, seedValueDeep(doc, v));
        }
        return map;
    }
    return value;
}
function toJSON(value) {
    if (value === null || value === undefined) {
        return value;
    }
    if (typeof value === 'object' && 'toJSON' in value && typeof value.toJSON === 'function') {
        return value.toJSON();
    }
    return value;
}
function getNestedValue(root, path) {
    let current = root;
    for (const key of path) {
        if (current === null || current === undefined) {
            return undefined;
        }
        if (typeof current === 'object' && 'get' in current && typeof current.get === 'function') {
            current = current.get(key);
        }
        else if (Array.isArray(current)) {
            const index = parseInt(key, 10);
            current = isNaN(index) ? undefined : current[index];
        }
        else if (typeof current === 'object') {
            current = current[key];
        }
        else {
            return undefined;
        }
    }
    return current;
}
function setNestedValue(doc, root, path, value) {
    if (path.length === 0) {
        return;
    }
    let current = root;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        let next = current.get(key);
        if (next === null || next === undefined) {
            const newMap = doc.createMap();
            current.set(key, newMap);
            next = newMap;
        }
        if (typeof next === 'object' &&
            next !== null &&
            'get' in next &&
            typeof next.get === 'function') {
            current = next;
        }
        else {
            return;
        }
    }
    const finalKey = path[path.length - 1];
    current.set(finalKey, seedValueDeep(doc, value));
}
//# sourceMappingURL=utils.js.map