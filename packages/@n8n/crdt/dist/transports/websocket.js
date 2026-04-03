"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketTransport = void 0;
class WebSocketTransport {
    constructor(config) {
        this.ws = null;
        this.receiveHandlers = new Set();
        this.connectionHandlers = new Set();
        this.errorHandlers = new Set();
        this._connected = false;
        this.reconnectAttempts = 0;
        this.reconnectTimeout = null;
        this.shouldReconnect = false;
        this.isConnecting = false;
        this.connectionPromise = null;
        this.config = {
            url: config.url,
            reconnect: config.reconnect ?? true,
            maxReconnectAttempts: config.maxReconnectAttempts ?? Infinity,
            reconnectDelay: config.reconnectDelay ?? 1000,
            maxReconnectDelay: config.maxReconnectDelay ?? 30000,
            reconnectBackoff: config.reconnectBackoff ?? 2,
            connectionTimeout: config.connectionTimeout ?? 10000,
        };
    }
    get connected() {
        return this._connected;
    }
    send(data) {
        if (!this._connected || !this.ws) {
            throw new Error('Transport not connected');
        }
        this.ws.send(data);
    }
    onReceive(handler) {
        this.receiveHandlers.add(handler);
        return () => {
            this.receiveHandlers.delete(handler);
        };
    }
    onConnectionChange(handler) {
        this.connectionHandlers.add(handler);
        return () => {
            this.connectionHandlers.delete(handler);
        };
    }
    onError(handler) {
        this.errorHandlers.add(handler);
        return () => {
            this.errorHandlers.delete(handler);
        };
    }
    async connect() {
        this.clearReconnectTimeout();
        if (this._connected) {
            return await Promise.resolve();
        }
        if (this.isConnecting && this.connectionPromise) {
            return await this.connectionPromise;
        }
        this.shouldReconnect = this.config.reconnect;
        this.connectionPromise = this.doConnect();
        return await this.connectionPromise;
    }
    disconnect() {
        this.shouldReconnect = false;
        this.clearReconnectTimeout();
        if (this.ws) {
            this.ws.onclose = null;
            this.ws.onerror = null;
            this.ws.onmessage = null;
            this.ws.onopen = null;
            this.ws.close();
            this.ws = null;
        }
        if (this._connected) {
            this._connected = false;
            this.notifyConnectionChange(false);
        }
        this.isConnecting = false;
        this.connectionPromise = null;
    }
    async doConnect() {
        this.isConnecting = true;
        return await new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (this.ws) {
                    this.ws.close();
                }
                reject(new Error('Connection timeout'));
            }, this.config.connectionTimeout);
            try {
                this.ws = new WebSocket(this.config.url);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = () => {
                    clearTimeout(timeoutId);
                    this._connected = true;
                    this.isConnecting = false;
                    this.reconnectAttempts = 0;
                    this.notifyConnectionChange(true);
                    resolve();
                };
                this.ws.onclose = () => {
                    clearTimeout(timeoutId);
                    const wasConnected = this._connected;
                    this._connected = false;
                    this.isConnecting = false;
                    if (wasConnected) {
                        this.notifyConnectionChange(false);
                    }
                    if (this.shouldReconnect) {
                        this.scheduleReconnect();
                    }
                };
                this.ws.onerror = () => {
                    clearTimeout(timeoutId);
                    const error = new Error('WebSocket error');
                    this.notifyError(error);
                    if (this.isConnecting) {
                        this.isConnecting = false;
                        reject(error);
                    }
                };
                this.ws.onmessage = (event) => {
                    if (event.data instanceof ArrayBuffer) {
                        const data = new Uint8Array(event.data);
                        for (const handler of this.receiveHandlers) {
                            handler(data);
                        }
                    }
                };
            }
            catch (error) {
                clearTimeout(timeoutId);
                this.isConnecting = false;
                reject(error instanceof Error ? error : new Error(String(error)));
            }
        });
    }
    scheduleReconnect() {
        if (!this.shouldReconnect) {
            return;
        }
        if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
            this.notifyError(new Error('Max reconnection attempts reached'));
            return;
        }
        const delay = Math.min(this.config.reconnectDelay * Math.pow(this.config.reconnectBackoff, this.reconnectAttempts), this.config.maxReconnectDelay);
        this.reconnectAttempts++;
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            this.doConnect().catch((error) => {
                this.notifyError(error);
            });
        }, delay);
    }
    clearReconnectTimeout() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }
    notifyConnectionChange(connected) {
        for (const handler of this.connectionHandlers) {
            handler(connected);
        }
    }
    notifyError(error) {
        for (const handler of this.errorHandlers) {
            handler(error);
        }
    }
}
exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=websocket.js.map