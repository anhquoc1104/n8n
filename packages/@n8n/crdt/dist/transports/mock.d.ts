import type { Unsubscribe } from '../types';
import type { SyncTransport } from './types';
type ReceiveHandler = (data: Uint8Array) => void;
export declare class MockTransport implements SyncTransport {
    private peer;
    private receiveHandlers;
    private _connected;
    get connected(): boolean;
    static link(a: MockTransport, b: MockTransport): void;
    send(data: Uint8Array): void;
    onReceive(handler: ReceiveHandler): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
    onConnectionChange(_handler: (connected: boolean) => void): Unsubscribe;
    onError(_handler: (error: Error) => void): Unsubscribe;
    private deliver;
}
export {};
