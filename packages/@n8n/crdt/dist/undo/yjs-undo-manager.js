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
exports.YjsUndoManager = exports.YjsRemoteOrigin = exports.YjsUndoManagerOrigin = void 0;
const Y = __importStar(require("yjs"));
exports.YjsUndoManagerOrigin = Symbol('local-undo-tracked');
exports.YjsRemoteOrigin = Symbol('remote-no-track');
class YjsUndoManager {
    constructor(yDoc, options = {}) {
        this.stackChangeHandlers = new Set();
        this.destroyed = false;
        this.lastMeta = null;
        this.prevCanUndo = false;
        this.prevCanRedo = false;
        this.handleStackChange = () => {
            if (this.destroyed)
                return;
            this.notifyIfChanged();
        };
        this.handleStackItemPopped = (event) => {
            if (this.destroyed)
                return;
            this.lastMeta = event.stackItem.meta;
            this.notifyIfChanged();
        };
        const { captureTimeout = 500 } = options;
        const scope = [];
        const typeNames = [];
        yDoc.share.forEach((type, name) => {
            scope.push(type);
            typeNames.push(name);
        });
        if (scope.length === 0) {
            const dummyScope = yDoc.getMap('__undo_scope__');
            scope.push(dummyScope);
        }
        this.undoManager = new Y.UndoManager(scope, {
            captureTimeout,
            trackedOrigins: new Set([exports.YjsUndoManagerOrigin, null]),
        });
        this.undoManager.on('stack-item-added', this.handleStackChange);
        this.undoManager.on('stack-item-popped', this.handleStackItemPopped);
    }
    notifyIfChanged() {
        const canUndo = this.canUndo();
        const canRedo = this.canRedo();
        if (canUndo !== this.prevCanUndo || canRedo !== this.prevCanRedo) {
            this.prevCanUndo = canUndo;
            this.prevCanRedo = canRedo;
            const event = { canUndo, canRedo };
            for (const handler of this.stackChangeHandlers) {
                handler(event);
            }
        }
    }
    undo() {
        if (this.destroyed || !this.canUndo())
            return false;
        this.undoManager.undo();
        return true;
    }
    redo() {
        if (this.destroyed || !this.canRedo())
            return false;
        this.undoManager.redo();
        return true;
    }
    canUndo() {
        if (this.destroyed)
            return false;
        return this.undoManager.undoStack.length > 0;
    }
    canRedo() {
        if (this.destroyed)
            return false;
        return this.undoManager.redoStack.length > 0;
    }
    stopCapturing() {
        this.undoManager.stopCapturing();
    }
    clear() {
        this.undoManager.clear();
        this.lastMeta = null;
        this.notifyIfChanged();
    }
    onStackChange(handler) {
        this.stackChangeHandlers.add(handler);
        return () => {
            this.stackChangeHandlers.delete(handler);
        };
    }
    setMeta(key, value) {
        const currentItem = this.undoManager.undoStack[this.undoManager.undoStack.length - 1];
        if (currentItem) {
            currentItem.meta.set(key, value);
        }
    }
    getMeta(key) {
        return this.lastMeta?.get(key);
    }
    destroy() {
        if (this.destroyed)
            return;
        this.destroyed = true;
        this.undoManager.off('stack-item-added', this.handleStackChange);
        this.undoManager.off('stack-item-popped', this.handleStackItemPopped);
        this.undoManager.destroy();
        this.stackChangeHandlers.clear();
        this.lastMeta = null;
    }
}
exports.YjsUndoManager = YjsUndoManager;
//# sourceMappingURL=yjs-undo-manager.js.map