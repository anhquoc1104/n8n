"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YjsAwareness = void 0;
const awareness_1 = require("y-protocols/awareness");
const types_1 = require("../types");
class YjsAwareness {
    constructor(yDoc) {
        this.awareness = new awareness_1.Awareness(yDoc);
        this.awareness.setLocalState(null);
    }
    get clientId() {
        return this.awareness.clientID;
    }
    getLocalState() {
        const state = this.awareness.getLocalState();
        if (state === null)
            return null;
        return state;
    }
    setLocalState(state) {
        this.awareness.setLocalState(state);
    }
    setLocalStateField(field, value) {
        this.awareness.setLocalStateField(field, value);
    }
    getStates() {
        return this.awareness.getStates();
    }
    onChange(handler) {
        const wrappedHandler = (changes, origin) => {
            handler(changes, origin === 'local' ? types_1.ChangeOrigin.local : types_1.ChangeOrigin.remote);
        };
        this.awareness.on('change', wrappedHandler);
        return () => this.awareness.off('change', wrappedHandler);
    }
    encodeState(clients) {
        const clientsToEncode = clients ?? Array.from(this.awareness.getStates().keys());
        return (0, awareness_1.encodeAwarenessUpdate)(this.awareness, clientsToEncode);
    }
    applyUpdate(update) {
        (0, awareness_1.applyAwarenessUpdate)(this.awareness, update, 'remote');
    }
    onUpdate(handler) {
        const wrappedHandler = (changes, origin) => {
            const changedClients = [...changes.added, ...changes.updated, ...changes.removed];
            if (changedClients.length === 0)
                return;
            const update = (0, awareness_1.encodeAwarenessUpdate)(this.awareness, changedClients);
            handler(update, origin === 'local' ? types_1.ChangeOrigin.local : types_1.ChangeOrigin.remote);
        };
        this.awareness.on('update', wrappedHandler);
        return () => this.awareness.off('update', wrappedHandler);
    }
    removeStates(clients) {
        const clientsToRemove = clients.filter((id) => id !== this.clientId);
        if (clientsToRemove.length > 0) {
            (0, awareness_1.removeAwarenessStates)(this.awareness, clientsToRemove, 'local');
        }
    }
    destroy() {
        this.awareness.setLocalState(null);
        this.awareness.destroy();
    }
}
exports.YjsAwareness = YjsAwareness;
//# sourceMappingURL=yjs-awareness.js.map