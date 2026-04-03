import type { Unsubscribe } from '../types';
import type { SyncTransport } from './types';
type ReceiveHandler = (data: Uint8Array) => void;
export interface WorkerTransportConfig {
    port: MessagePort | Worker;
    docId: string;
    serverUrl: string;
}
export declare class WorkerTransport implements SyncTransport {
    private receiveHandlers;
    private _connected;
    private messageHandler;
    private connectPromise;
    private connectResolve;
    private readonly port;
    private readonly docId;
    private readonly serverUrl;
    constructor(config: WorkerTransportConfig);
    get connected(): boolean;
    send(data: Uint8Array): void;
    onReceive(handler: ReceiveHandler): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
    onConnectionChange(_handler: (connected: boolean) => void): Unsubscribe;
    onError(_handler: (error: Error) => void): Unsubscribe;
    private handleBinaryMessage;
}
export {};
