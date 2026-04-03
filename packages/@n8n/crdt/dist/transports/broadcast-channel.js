"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastChannelTransport = void 0;
class BroadcastChannelTransport {
    constructor(channelName) {
        this.channelName = channelName;
        this.channel = null;
        this.receiveHandlers = new Set();
        this.connectionChangeHandlers = new Set();
        this.errorHandlers = new Set();
        this._connected = false;
        this.senderId =
            typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }
    get connected() {
        return this._connected;
    }
    send(data) {
        if (!this._connected || !this.channel) {
            throw new Error('Transport not connected');
        }
        const message = {
            type: 'sync',
            data: Array.from(data),
            senderId: this.senderId,
        };
        this.channel.postMessage(message);
    }
    onReceive(handler) {
        this.receiveHandlers.add(handler);
        return () => {
            this.receiveHandlers.delete(handler);
        };
    }
    onConnectionChange(handler) {
        this.connectionChangeHandlers.add(handler);
        return () => {
            this.connectionChangeHandlers.delete(handler);
        };
    }
    onError(handler) {
        this.errorHandlers.add(handler);
        return () => {
            this.errorHandlers.delete(handler);
        };
    }
    async connect() {
        if (this._connected) {
            return await Promise.resolve();
        }
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
            const message = event.data;
            if (message.senderId === this.senderId) {
                return;
            }
            if (message.type === 'sync') {
                const data = new Uint8Array(message.data);
                for (const handler of this.receiveHandlers) {
                    handler(data);
                }
            }
        };
        this.channel.onmessageerror = (event) => {
            const error = new Error(`BroadcastChannel message error: ${String(event.data)}`);
            for (const handler of this.errorHandlers) {
                handler(error);
            }
        };
        this._connected = true;
        for (const handler of this.connectionChangeHandlers) {
            handler(true);
        }
        return await Promise.resolve();
    }
    disconnect() {
        if (!this._connected) {
            return;
        }
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
        this._connected = false;
        for (const handler of this.connectionChangeHandlers) {
            handler(false);
        }
    }
}
exports.BroadcastChannelTransport = BroadcastChannelTransport;
//# sourceMappingURL=broadcast-channel.js.map