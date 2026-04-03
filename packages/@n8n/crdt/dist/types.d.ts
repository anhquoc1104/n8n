export type Unsubscribe = () => void;
export declare const ChangeAction: {
    readonly add: "add";
    readonly update: "update";
    readonly delete: "delete";
};
export type ChangeAction = (typeof ChangeAction)[keyof typeof ChangeAction];
export interface DeepChangeEvent {
    path: Array<string | number>;
    action: ChangeAction;
    value?: unknown;
    oldValue?: unknown;
}
export interface ArrayDelta {
    insert?: unknown[];
    retain?: number;
    delete?: number;
}
export interface ArrayChangeEvent {
    path: Array<string | number>;
    delta: ArrayDelta[];
}
export type DeepChange = ArrayChangeEvent | DeepChangeEvent;
export interface TransactionBatch {
    changes: Map<string, DeepChange[]>;
    origin: ChangeOrigin;
}
export declare const ChangeOrigin: {
    readonly local: "local";
    readonly remote: "remote";
    readonly undoRedo: "undoRedo";
};
export type ChangeOrigin = (typeof ChangeOrigin)[keyof typeof ChangeOrigin];
export declare function isMapChange(change: DeepChange): change is DeepChangeEvent;
export declare function isArrayChange(change: DeepChange): change is ArrayChangeEvent;
export interface CRDTArray<T = unknown> {
    readonly length: number;
    get(index: number): T | undefined;
    push(...items: T[]): void;
    insert(index: number, ...items: T[]): void;
    delete(index: number, count?: number): void;
    toArray(): T[];
    toJSON(): T[];
    onDeepChange(handler: (changes: DeepChange[], origin: ChangeOrigin) => void): Unsubscribe;
}
export interface CRDTMap<T = unknown> {
    get(key: string): T | CRDTMap<unknown> | CRDTArray<unknown> | undefined;
    set(key: string, value: T | CRDTMap<unknown> | CRDTArray<unknown>): void;
    delete(key: string): void;
    has(key: string): boolean;
    keys(): IterableIterator<string>;
    values(): IterableIterator<T | CRDTMap<unknown> | CRDTArray<unknown>>;
    entries(): IterableIterator<[string, T | CRDTMap<unknown> | CRDTArray<unknown>]>;
    toJSON(): Record<string, T>;
    onDeepChange(handler: (changes: DeepChange[], origin: ChangeOrigin) => void): Unsubscribe;
}
export interface CRDTDoc {
    readonly id: string;
    readonly synced: boolean;
    getMap<T = unknown>(name: string): CRDTMap<T>;
    getArray<T = unknown>(name: string): CRDTArray<T>;
    createMap<T = unknown>(): CRDTMap<T>;
    createArray<T = unknown>(): CRDTArray<T>;
    transact(fn: () => void): void;
    encodeState(): Uint8Array;
    encodeStateVector(): Uint8Array;
    applyUpdate(update: Uint8Array): void;
    onUpdate(handler: (update: Uint8Array, origin: ChangeOrigin) => void): Unsubscribe;
    onSync(handler: (isSynced: boolean) => void): Unsubscribe;
    setSynced(synced: boolean): void;
    getAwareness<T extends AwarenessState = AwarenessState>(): CRDTAwareness<T>;
    createUndoManager(options?: UndoManagerOptions): CRDTUndoManager;
    onTransactionBatch(mapNames: string[], handler: (batch: TransactionBatch) => void): Unsubscribe;
    destroy(): void;
}
export interface CRDTProvider {
    readonly name: string;
    createDoc(id: string): CRDTDoc;
}
export declare const CRDTEngine: {
    readonly yjs: "yjs";
};
export type CRDTEngine = (typeof CRDTEngine)[keyof typeof CRDTEngine];
export interface CRDTConfig {
    engine: CRDTEngine;
}
export type AwarenessClientId = number;
export type AwarenessState = Record<string, unknown>;
export interface AwarenessChangeEvent {
    added: AwarenessClientId[];
    updated: AwarenessClientId[];
    removed: AwarenessClientId[];
}
export interface CRDTAwareness<T extends AwarenessState = AwarenessState> {
    readonly clientId: AwarenessClientId;
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
export interface UndoManagerOptions {
    captureTimeout?: number;
}
export interface UndoStackChangeEvent {
    canUndo: boolean;
    canRedo: boolean;
}
export interface CRDTUndoManager {
    undo(): boolean;
    redo(): boolean;
    canUndo(): boolean;
    canRedo(): boolean;
    stopCapturing(): void;
    clear(): void;
    onStackChange(handler: (event: UndoStackChangeEvent) => void): Unsubscribe;
    setMeta<V>(key: string, value: V): void;
    getMeta<V>(key: string): V | undefined;
    destroy(): void;
}
