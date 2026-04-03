"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePortTransport = void 0;
function isPortMessage(data) {
    return (typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        data.type === 'sync');
}
class MessagePortTransport {
    constructor(port) {
        this.port = port;
        this.receiveHandlers = new Set();
        this._connected = false;
        this.messageHandler = null;
    }
    get connected() {
        return this._connected;
    }
    send(data) {
        if (!this._connected) {
            throw new Error('Transport not connected');
        }
        const copy = new Uint8Array(data);
        const message = { type: 'sync', data: copy };
        this.port.postMessage(message, [copy.buffer]);
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
        this.messageHandler = (event) => {
            if (!isPortMessage(event.data))
                return;
            const message = event.data;
            if (message.type === 'sync') {
                const data = message.data instanceof Uint8Array ? message.data : new Uint8Array(message.data);
                for (const handler of this.receiveHandlers) {
                    handler(data);
                }
            }
        };
        this.port.addEventListener('message', this.messageHandler);
        this.port.start();
        this._connected = true;
        return await Promise.resolve();
    }
    disconnect() {
        if (!this._connected) {
            return;
        }
        if (this.messageHandler) {
            this.port.removeEventListener('message', this.messageHandler);
            this.messageHandler = null;
        }
        this._connected = false;
    }
    onConnectionChange(_handler) {
        return () => { };
    }
    onError(_handler) {
        return () => { };
    }
}
exports.MessagePortTransport = MessagePortTransport;
//# sourceMappingURL=message-port.js.map