import type { SyncTransport } from '../transports';
import type { CRDTDoc, Unsubscribe } from '../types';
import type { SyncProvider } from './types';
type SyncStateHandler = (syncing: boolean) => void;
type ErrorHandler = (error: Error) => void;
export declare class BaseSyncProvider implements SyncProvider {
    readonly doc: CRDTDoc;
    readonly transport: SyncTransport;
    private _syncing;
    private stateHandlers;
    private errorHandlers;
    private unsubscribeDoc;
    private unsubscribeTransport;
    constructor(doc: CRDTDoc, transport: SyncTransport);
    get syncing(): boolean;
    start(): Promise<void>;
    stop(): void;
    onSyncStateChange(handler: SyncStateHandler): Unsubscribe;
    onError(handler: ErrorHandler): Unsubscribe;
    private notifyStateChange;
    private notifyError;
}
export declare function createSyncProvider(doc: CRDTDoc, transport: SyncTransport): SyncProvider;
export {};
