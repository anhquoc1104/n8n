"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSyncProvider = void 0;
exports.createSyncProvider = createSyncProvider;
class BaseSyncProvider {
    constructor(doc, transport) {
        this.doc = doc;
        this.transport = transport;
        this._syncing = false;
        this.stateHandlers = new Set();
        this.errorHandlers = new Set();
        this.unsubscribeDoc = null;
        this.unsubscribeTransport = null;
    }
    get syncing() {
        return this._syncing;
    }
    async start() {
        if (this._syncing)
            return;
        await this.transport.connect();
        this.unsubscribeTransport = this.transport.onReceive((data) => {
            try {
                this.doc.applyUpdate(data);
            }
            catch (error) {
                this.notifyError(error instanceof Error ? error : new Error(String(error)));
            }
        });
        this.unsubscribeDoc = this.doc.onUpdate((update) => {
            if (this.transport.connected) {
                this.transport.send(update);
            }
        });
        const initialState = this.doc.encodeState();
        this.transport.send(initialState);
        this._syncing = true;
        this.notifyStateChange();
    }
    stop() {
        if (!this._syncing)
            return;
        if (this.unsubscribeDoc) {
            this.unsubscribeDoc();
            this.unsubscribeDoc = null;
        }
        if (this.unsubscribeTransport) {
            this.unsubscribeTransport();
            this.unsubscribeTransport = null;
        }
        this.transport.disconnect();
        this._syncing = false;
        this.notifyStateChange();
    }
    onSyncStateChange(handler) {
        this.stateHandlers.add(handler);
        return () => {
            this.stateHandlers.delete(handler);
        };
    }
    onError(handler) {
        this.errorHandlers.add(handler);
        return () => {
            this.errorHandlers.delete(handler);
        };
    }
    notifyStateChange() {
        for (const handler of this.stateHandlers) {
            handler(this._syncing);
        }
    }
    notifyError(error) {
        for (const handler of this.errorHandlers) {
            handler(error);
        }
    }
}
exports.BaseSyncProvider = BaseSyncProvider;
function createSyncProvider(doc, transport) {
    return new BaseSyncProvider(doc, transport);
}
//# sourceMappingURL=base-sync-provider.js.map