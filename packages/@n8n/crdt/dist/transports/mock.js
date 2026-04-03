"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTransport = void 0;
class MockTransport {
    constructor() {
        this.peer = null;
        this.receiveHandlers = new Set();
        this._connected = false;
    }
    get connected() {
        return this._connected;
    }
    static link(a, b) {
        a.peer = b;
        b.peer = a;
    }
    send(data) {
        if (!this._connected) {
            throw new Error('Transport not connected');
        }
        if (!this.peer) {
            throw new Error('Transport has no peer');
        }
        this.peer.deliver(data);
    }
    onReceive(handler) {
        this.receiveHandlers.add(handler);
        return () => {
            this.receiveHandlers.delete(handler);
        };
    }
    async connect() {
        this._connected = true;
        return await Promise.resolve();
    }
    disconnect() {
        this._connected = false;
    }
    onConnectionChange(_handler) {
        return () => { };
    }
    onError(_handler) {
        return () => { };
    }
    deliver(data) {
        for (const handler of this.receiveHandlers) {
            handler(data);
        }
    }
}
exports.MockTransport = MockTransport;
//# sourceMappingURL=mock.js.map