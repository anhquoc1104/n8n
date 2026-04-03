"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.YjsProvider = void 0;
const Y = __importStar(require("yjs"));
const yjs_awareness_1 = require("../awareness/yjs-awareness");
const types_1 = require("../types");
const yjs_undo_manager_1 = require("../undo/yjs-undo-manager");
function getChangeOrigin(transaction) {
    if (transaction.origin instanceof Y.UndoManager) {
        return types_1.ChangeOrigin.undoRedo;
    }
    return transaction.local ? types_1.ChangeOrigin.local : types_1.ChangeOrigin.remote;
}
function toJSONValue(value) {
    if (value instanceof Y.Map || value instanceof Y.Array || value instanceof Y.Text) {
        return value.toJSON();
    }
    return value;
}
const WRAPPER = Symbol('crdt-wrapper');
function wrapYjsValue(value) {
    if (value instanceof Y.Map) {
        const yMap = value;
        yMap[WRAPPER] ??= new YjsMap(value);
        return yMap[WRAPPER];
    }
    if (value instanceof Y.Array) {
        const yArray = value;
        yArray[WRAPPER] ??= new YjsArray(value);
        return yArray[WRAPPER];
    }
    return value;
}
class YjsArray {
    constructor(yArray) {
        this.yArray = yArray;
    }
    getYArray() {
        return this.yArray;
    }
    get length() {
        return this.yArray.length;
    }
    get(index) {
        const value = this.yArray.get(index);
        return wrapYjsValue(value);
    }
    push(...items) {
        const unwrapped = items.map((item) => {
            if (item instanceof YjsMap)
                return item.getYMap();
            if (item instanceof YjsArray)
                return item.getYArray();
            return item;
        });
        this.yArray.push(unwrapped);
    }
    insert(index, ...items) {
        const unwrapped = items.map((item) => {
            if (item instanceof YjsMap)
                return item.getYMap();
            if (item instanceof YjsArray)
                return item.getYArray();
            return item;
        });
        this.yArray.insert(index, unwrapped);
    }
    delete(index, count = 1) {
        this.yArray.delete(index, count);
    }
    toArray() {
        return this.yArray.toJSON();
    }
    toJSON() {
        return this.toArray();
    }
    onDeepChange(handler) {
        const observer = (events, transaction) => {
            const changes = [];
            for (const event of events) {
                if (event instanceof Y.YArrayEvent) {
                    changes.push(arrayEventToChange(event));
                }
                else if (event instanceof Y.YMapEvent) {
                    changes.push(...mapEventToChanges(event));
                }
            }
            if (changes.length > 0) {
                handler(changes, getChangeOrigin(transaction));
            }
        };
        this.yArray.observeDeep(observer);
        return () => {
            this.yArray.unobserveDeep(observer);
        };
    }
}
function arrayEventToChange(event) {
    return {
        path: event.path,
        delta: event.delta,
    };
}
function mapEventToChanges(event) {
    return Array.from(event.changes.keys, ([key, change]) => ({
        path: [...event.path, key],
        action: change.action,
        ...(change.action !== types_1.ChangeAction.delete && {
            value: toJSONValue(event.target.get(key)),
        }),
        ...(change.action !== types_1.ChangeAction.add && {
            oldValue: toJSONValue(change.oldValue),
        }),
    }));
}
function isDescendantOf(yType, rootMap) {
    let current = yType;
    while (current !== null) {
        if (current === rootMap)
            return true;
        const item = current._item;
        if (!item)
            return false;
        const parent = item.parent;
        if (parent === null || typeof parent !== 'object' || !('_item' in parent)) {
            return false;
        }
        current = parent;
    }
    return false;
}
class YjsMap {
    constructor(yMap) {
        this.yMap = yMap;
    }
    getYMap() {
        return this.yMap;
    }
    get(key) {
        const value = this.yMap.get(key);
        return wrapYjsValue(value);
    }
    set(key, value) {
        if (value instanceof YjsMap) {
            this.yMap.set(key, value.getYMap());
        }
        else if (value instanceof YjsArray) {
            this.yMap.set(key, value.getYArray());
        }
        else {
            this.yMap.set(key, value);
        }
    }
    delete(key) {
        this.yMap.delete(key);
    }
    has(key) {
        return this.yMap.has(key);
    }
    keys() {
        return this.yMap.keys();
    }
    *values() {
        for (const value of this.yMap.values()) {
            yield wrapYjsValue(value);
        }
    }
    *entries() {
        for (const [key, value] of this.yMap.entries()) {
            yield [key, wrapYjsValue(value)];
        }
    }
    toJSON() {
        return this.yMap.toJSON();
    }
    onDeepChange(handler) {
        const observer = (events, transaction) => {
            const changes = [];
            for (const event of events) {
                if (event instanceof Y.YArrayEvent) {
                    changes.push(arrayEventToChange(event));
                }
                else if (event instanceof Y.YMapEvent) {
                    changes.push(...mapEventToChanges(event));
                }
            }
            if (changes.length > 0) {
                handler(changes, getChangeOrigin(transaction));
            }
        };
        this.yMap.observeDeep(observer);
        return () => {
            this.yMap.unobserveDeep(observer);
        };
    }
}
class YjsDoc {
    constructor(id) {
        this.id = id;
        this.awareness = null;
        this.undoManager = null;
        this._synced = false;
        this.syncHandlers = new Set();
        this.yDoc = new Y.Doc({ guid: id });
    }
    get synced() {
        return this._synced;
    }
    setSynced(synced) {
        if (this._synced === synced)
            return;
        this._synced = synced;
        for (const handler of this.syncHandlers) {
            handler(synced);
        }
    }
    onSync(handler) {
        this.syncHandlers.add(handler);
        return () => {
            this.syncHandlers.delete(handler);
        };
    }
    getMap(name) {
        return wrapYjsValue(this.yDoc.getMap(name));
    }
    getArray(name) {
        return wrapYjsValue(this.yDoc.getArray(name));
    }
    createMap() {
        return new YjsMap(new Y.Map());
    }
    createArray() {
        return new YjsArray(new Y.Array());
    }
    transact(fn) {
        this.yDoc.transact(fn, yjs_undo_manager_1.YjsUndoManagerOrigin);
    }
    encodeState() {
        return Y.encodeStateAsUpdate(this.yDoc);
    }
    encodeStateVector() {
        return Y.encodeStateVector(this.yDoc);
    }
    applyUpdate(update) {
        Y.applyUpdate(this.yDoc, update, yjs_undo_manager_1.YjsRemoteOrigin);
    }
    onUpdate(handler) {
        const wrappedHandler = (update, _origin, _doc, transaction) => {
            handler(update, getChangeOrigin(transaction));
        };
        this.yDoc.on('update', wrappedHandler);
        return () => {
            this.yDoc.off('update', wrappedHandler);
        };
    }
    getAwareness() {
        this.awareness ??= new yjs_awareness_1.YjsAwareness(this.yDoc);
        return this.awareness;
    }
    createUndoManager(options) {
        if (this.undoManager) {
            throw new Error('Undo manager already exists for this document');
        }
        this.undoManager = new yjs_undo_manager_1.YjsUndoManager(this.yDoc, options);
        return this.undoManager;
    }
    onTransactionBatch(mapNames, handler) {
        const targetMaps = new Map();
        for (const name of mapNames) {
            targetMaps.set(this.yDoc.getMap(name), name);
        }
        const afterTransactionHandler = (transaction) => {
            const batch = new Map();
            for (const [rootYMap, mapName] of targetMaps) {
                const allEvents = [];
                for (const [yType, events] of transaction.changedParentTypes) {
                    if (isDescendantOf(yType, rootYMap)) {
                        for (const event of events) {
                            if (event.target === yType) {
                                allEvents.push(event);
                            }
                        }
                    }
                }
                if (allEvents.length === 0)
                    continue;
                const changes = [];
                for (const event of allEvents) {
                    event.currentTarget = rootYMap;
                    event._path = null;
                    if (event instanceof Y.YMapEvent) {
                        changes.push(...mapEventToChanges(event));
                    }
                    else if (event instanceof Y.YArrayEvent) {
                        changes.push(arrayEventToChange(event));
                    }
                }
                if (changes.length > 0) {
                    batch.set(mapName, changes);
                }
            }
            if (batch.size > 0) {
                handler({
                    changes: batch,
                    origin: getChangeOrigin(transaction),
                });
            }
        };
        this.yDoc.on('afterTransaction', afterTransactionHandler);
        return () => {
            this.yDoc.off('afterTransaction', afterTransactionHandler);
        };
    }
    destroy() {
        if (this.undoManager) {
            this.undoManager.destroy();
            this.undoManager = null;
        }
        if (this.awareness) {
            this.awareness.destroy();
            this.awareness = null;
        }
        this.syncHandlers.clear();
        this._synced = false;
        this.yDoc.destroy();
    }
}
class YjsProvider {
    constructor() {
        this.name = types_1.CRDTEngine.yjs;
    }
    createDoc(id) {
        return new YjsDoc(id);
    }
}
exports.YjsProvider = YjsProvider;
//# sourceMappingURL=yjs.js.map