import type { Unsubscribe } from '../types';
import type { SyncTransport } from './types';
type ReceiveHandler = (data: Uint8Array) => void;
export declare class BroadcastChannelTransport implements SyncTransport {
    private readonly channelName;
    private channel;
    private receiveHandlers;
    private connectionChangeHandlers;
    private errorHandlers;
    private _connected;
    private readonly senderId;
    constructor(channelName: string);
    get connected(): boolean;
    send(data: Uint8Array): void;
    onReceive(handler: ReceiveHandler): Unsubscribe;
    onConnectionChange(handler: (connected: boolean) => void): Unsubscribe;
    onError(handler: (error: Error) => void): Unsubscribe;
    connect(): Promise<void>;
    disconnect(): void;
}
export {};
