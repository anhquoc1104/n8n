import type { Unsubscribe } from '../types';
import type { SyncTransport } from './types';
type ReceiveHandler = (data: Uint8Array) => void;
type ConnectionHandler = (connected: boolean) => void;
type ErrorHandler = (error: Error) => void;
export interface WebSocketTransportConfig {
    url: string;
    reconnect?: boolean;
    maxReconnectAttempts?: number;
    reconnectDelay?: number;
    maxReconnectDelay?: number;
    reconnectBackoff?: number;
    connectionTimeout?: number;
}
export declare class WebSocketTransport implements SyncTransport {
    private ws;
    private receiveHandlers;
    private connectionHandlers;
    private errorHandlers;
    private _connected;
    private reconnectAttempts;
    private reconnectTimeout;
    private shouldReconnect;
    private isConnecting;
    private connectionPromise;
    private readonly config;
    constructor(config: WebSocketTransportConfig);
    get connected(): boolean;
    send(data: Uint8Array): void;
    onReceive(handler: ReceiveHandler): Unsubscribe;
    onConnectionChange(handler: ConnectionHandler): Unsubscribe;
    onError(handler: ErrorHandler): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
    private doConnect;
    private scheduleReconnect;
    private clearReconnectTimeout;
    private notifyConnectionChange;
    private notifyError;
}
export {};
