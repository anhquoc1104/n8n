import type { Unsubscribe } from '../types';
import type { SyncTransport } from './types';
type ReceiveHandler = (data: Uint8Array) => void;
export declare class MessagePortTransport implements SyncTransport {
    private readonly port;
    private receiveHandlers;
    private _connected;
    private messageHandler;
    constructor(port: MessagePort);
    get connected(): boolean;
    send(data: Uint8Array): void;
    onReceive(handler: ReceiveHandler): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
    onConnectionChange(_handler: (connected: boolean) => void): Unsubscribe;
    onError(_handler: (error: Error) => void): Unsubscribe;
}
export {};
