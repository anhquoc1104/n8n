import type * as Y from 'yjs';
import type { AwarenessChangeEvent, AwarenessClientId, AwarenessState, ChangeOrigin, CRDTAwareness, Unsubscribe } from '../types';
export declare class YjsAwareness<T extends AwarenessState = AwarenessState> implements CRDTAwareness<T> {
    private readonly awareness;
    constructor(yDoc: Y.Doc);
    get clientId(): AwarenessClientId;
    getLocalState(): T | null;
    setLocalState(state: T | null): void;
    setLocalStateField<K extends keyof T>(field: K, value: T[K]): void;
    getStates(): Map<AwarenessClientId, T>;
    onChange(handler: (event: AwarenessChangeEvent, origin: ChangeOrigin) => void): Unsubscribe;
    encodeState(clients?: AwarenessClientId[]): Uint8Array;
    applyUpdate(update: Uint8Array): void;
    onUpdate(handler: (update: Uint8Array, origin: ChangeOrigin) => void): Unsubscribe;
    removeStates(clients: AwarenessClientId[]): void;
    destroy(): void;
}
