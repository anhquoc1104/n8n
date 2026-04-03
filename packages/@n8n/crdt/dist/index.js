"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNestedValue = exports.getNestedValue = exports.toJSON = exports.seedValueDeep = exports.addDocId = exports.stripDocId = exports.decodeString = exports.encodeString = exports.decodeWithDocId = exports.encodeWithDocId = exports.decodeMessage = exports.encodeMessage = exports.MESSAGE_INITIAL_SYNC = exports.MESSAGE_DISCONNECTED = exports.MESSAGE_CONNECTED = exports.MESSAGE_UNSUBSCRIBE = exports.MESSAGE_SUBSCRIBE = exports.MESSAGE_AWARENESS = exports.MESSAGE_SYNC = exports.createSyncProvider = exports.BaseSyncProvider = exports.BroadcastChannelTransport = exports.WorkerTransport = exports.WebSocketTransport = exports.MessagePortTransport = exports.MockTransport = exports.YjsProvider = exports.YjsRemoteOrigin = exports.YjsUndoManagerOrigin = exports.YjsUndoManager = exports.YjsAwareness = exports.isArrayChange = exports.isMapChange = exports.CRDTEngine = exports.ChangeOrigin = exports.ChangeAction = void 0;
exports.createCRDTProvider = createCRDTProvider;
const yjs_1 = require("./providers/yjs");
const types_1 = require("./types");
var types_2 = require("./types");
Object.defineProperty(exports, "ChangeAction", { enumerable: true, get: function () { return types_2.ChangeAction; } });
Object.defineProperty(exports, "ChangeOrigin", { enumerable: true, get: function () { return types_2.ChangeOrigin; } });
Object.defineProperty(exports, "CRDTEngine", { enumerable: true, get: function () { return types_2.CRDTEngine; } });
var types_3 = require("./types");
Object.defineProperty(exports, "isMapChange", { enumerable: true, get: function () { return types_3.isMapChange; } });
Object.defineProperty(exports, "isArrayChange", { enumerable: true, get: function () { return types_3.isArrayChange; } });
var yjs_awareness_1 = require("./awareness/yjs-awareness");
Object.defineProperty(exports, "YjsAwareness", { enumerable: true, get: function () { return yjs_awareness_1.YjsAwareness; } });
var yjs_undo_manager_1 = require("./undo/yjs-undo-manager");
Object.defineProperty(exports, "YjsUndoManager", { enumerable: true, get: function () { return yjs_undo_manager_1.YjsUndoManager; } });
Object.defineProperty(exports, "YjsUndoManagerOrigin", { enumerable: true, get: function () { return yjs_undo_manager_1.YjsUndoManagerOrigin; } });
Object.defineProperty(exports, "YjsRemoteOrigin", { enumerable: true, get: function () { return yjs_undo_manager_1.YjsRemoteOrigin; } });
var yjs_2 = require("./providers/yjs");
Object.defineProperty(exports, "YjsProvider", { enumerable: true, get: function () { return yjs_2.YjsProvider; } });
var transports_1 = require("./transports");
Object.defineProperty(exports, "MockTransport", { enumerable: true, get: function () { return transports_1.MockTransport; } });
Object.defineProperty(exports, "MessagePortTransport", { enumerable: true, get: function () { return transports_1.MessagePortTransport; } });
Object.defineProperty(exports, "WebSocketTransport", { enumerable: true, get: function () { return transports_1.WebSocketTransport; } });
Object.defineProperty(exports, "WorkerTransport", { enumerable: true, get: function () { return transports_1.WorkerTransport; } });
Object.defineProperty(exports, "BroadcastChannelTransport", { enumerable: true, get: function () { return transports_1.BroadcastChannelTransport; } });
var sync_1 = require("./sync");
Object.defineProperty(exports, "BaseSyncProvider", { enumerable: true, get: function () { return sync_1.BaseSyncProvider; } });
Object.defineProperty(exports, "createSyncProvider", { enumerable: true, get: function () { return sync_1.createSyncProvider; } });
var protocol_1 = require("./protocol");
Object.defineProperty(exports, "MESSAGE_SYNC", { enumerable: true, get: function () { return protocol_1.MESSAGE_SYNC; } });
Object.defineProperty(exports, "MESSAGE_AWARENESS", { enumerable: true, get: function () { return protocol_1.MESSAGE_AWARENESS; } });
Object.defineProperty(exports, "MESSAGE_SUBSCRIBE", { enumerable: true, get: function () { return protocol_1.MESSAGE_SUBSCRIBE; } });
Object.defineProperty(exports, "MESSAGE_UNSUBSCRIBE", { enumerable: true, get: function () { return protocol_1.MESSAGE_UNSUBSCRIBE; } });
Object.defineProperty(exports, "MESSAGE_CONNECTED", { enumerable: true, get: function () { return protocol_1.MESSAGE_CONNECTED; } });
Object.defineProperty(exports, "MESSAGE_DISCONNECTED", { enumerable: true, get: function () { return protocol_1.MESSAGE_DISCONNECTED; } });
Object.defineProperty(exports, "MESSAGE_INITIAL_SYNC", { enumerable: true, get: function () { return protocol_1.MESSAGE_INITIAL_SYNC; } });
Object.defineProperty(exports, "encodeMessage", { enumerable: true, get: function () { return protocol_1.encodeMessage; } });
Object.defineProperty(exports, "decodeMessage", { enumerable: true, get: function () { return protocol_1.decodeMessage; } });
Object.defineProperty(exports, "encodeWithDocId", { enumerable: true, get: function () { return protocol_1.encodeWithDocId; } });
Object.defineProperty(exports, "decodeWithDocId", { enumerable: true, get: function () { return protocol_1.decodeWithDocId; } });
Object.defineProperty(exports, "encodeString", { enumerable: true, get: function () { return protocol_1.encodeString; } });
Object.defineProperty(exports, "decodeString", { enumerable: true, get: function () { return protocol_1.decodeString; } });
Object.defineProperty(exports, "stripDocId", { enumerable: true, get: function () { return protocol_1.stripDocId; } });
Object.defineProperty(exports, "addDocId", { enumerable: true, get: function () { return protocol_1.addDocId; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "seedValueDeep", { enumerable: true, get: function () { return utils_1.seedValueDeep; } });
Object.defineProperty(exports, "toJSON", { enumerable: true, get: function () { return utils_1.toJSON; } });
Object.defineProperty(exports, "getNestedValue", { enumerable: true, get: function () { return utils_1.getNestedValue; } });
Object.defineProperty(exports, "setNestedValue", { enumerable: true, get: function () { return utils_1.setNestedValue; } });
function createCRDTProvider(config) {
    switch (config.engine) {
        case types_1.CRDTEngine.yjs:
            return new yjs_1.YjsProvider();
        default: {
            const exhaustiveCheck = config.engine;
            throw new Error(`Unknown CRDT engine: ${String(exhaustiveCheck)}`);
        }
    }
}
//# sourceMappingURL=index.js.map