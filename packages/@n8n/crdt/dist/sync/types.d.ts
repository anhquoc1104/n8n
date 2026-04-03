import type { SyncTransport } from '../transports';
import type { CRDTDoc, Unsubscribe } from '../types';
export interface SyncProvider {
    readonly doc: CRDTDoc;
    readonly transport: SyncTransport;
    readonly syncing: boolean;
    start(): Promise<void>;
    stop(): void;
    onSyncStateChange(handler: (syncing: boolean) => void): Unsubscribe;
    onError(handler: (error: Error) => void): Unsubscribe;
}
export type CreateSyncProvider = (doc: CRDTDoc, transport: SyncTransport) => SyncProvider;
