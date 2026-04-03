import type { Unsubscribe } from '../types';
export interface SyncTransport {
    send(data: Uint8Array): void;
    onReceive(handler: (data: Uint8Array) => void): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
    readonly connected: boolean;
    onConnectionChange(handler: (connected: boolean) => void): Unsubscribe;
    onError(handler: (error: Error) => void): Unsubscribe;
}
