"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerTransport = void 0;
const protocol_1 = require("../protocol");
class WorkerTransport {
    constructor(config) {
        this.receiveHandlers = new Set();
        this._connected = false;
        this.messageHandler = null;
        this.connectPromise = null;
        this.connectResolve = null;
        this.port = config.port;
        this.docId = config.docId;
        this.serverUrl = config.serverUrl;
    }
    get connected() {
        return this._connected;
    }
    send(data) {
        if (!this._connected) {
            throw new Error('Transport not connected');
        }
        const messageType = data[0];
        const payload = data.subarray(1);
        const message = (0, protocol_1.encodeWithDocId)(messageType, this.docId, payload);
        this.port.postMessage(message);
    }
    onReceive(handler) {
        this.receiveHandlers.add(handler);
        return () => {
            this.receiveHandlers.delete(handler);
        };
    }
    async connect() {
        if (this._connected) {
            return await Promise.resolve();
        }
        if (this.connectPromise) {
            return await this.connectPromise;
        }
        this.connectPromise = new Promise((resolve) => {
            this.connectResolve = resolve;
            this.messageHandler = (event) => {
                const data = event.data;
                if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
                    const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
                    this.handleBinaryMessage(bytes);
                }
            };
            this.port.addEventListener('message', this.messageHandler);
            if ('start' in this.port) {
                this.port.start();
            }
            const subscribeMessage = (0, protocol_1.encodeWithDocId)(protocol_1.MESSAGE_SUBSCRIBE, this.docId, (0, protocol_1.encodeString)(this.serverUrl));
            this.port.postMessage(subscribeMessage);
        });
        return await this.connectPromise;
    }
    disconnect() {
        if (!this._connected && !this.connectPromise) {
            return;
        }
        const unsubscribeMessage = (0, protocol_1.encodeWithDocId)(protocol_1.MESSAGE_UNSUBSCRIBE, this.docId);
        this.port.postMessage(unsubscribeMessage);
        if (this.messageHandler) {
            this.port.removeEventListener('message', this.messageHandler);
            this.messageHandler = null;
        }
        this._connected = false;
        this.connectPromise = null;
        this.connectResolve = null;
    }
    onConnectionChange(_handler) {
        return () => { };
    }
    onError(_handler) {
        return () => { };
    }
    handleBinaryMessage(data) {
        try {
            const { messageType, docId, payload } = (0, protocol_1.decodeWithDocId)(data);
            if (docId !== this.docId) {
                return;
            }
            if (messageType === protocol_1.MESSAGE_CONNECTED) {
                this._connected = true;
            }
            else if (messageType === protocol_1.MESSAGE_DISCONNECTED) {
                this._connected = false;
            }
            if (messageType === protocol_1.MESSAGE_INITIAL_SYNC && this.connectResolve) {
                this._connected = true;
                this.connectResolve();
                this.connectResolve = null;
            }
            const serverFormat = new Uint8Array(1 + payload.length);
            serverFormat[0] = messageType;
            serverFormat.set(payload, 1);
            for (const handler of this.receiveHandlers) {
                handler(serverFormat);
            }
        }
        catch {
        }
    }
}
exports.WorkerTransport = WorkerTransport;
//# sourceMappingURL=worker.js.map