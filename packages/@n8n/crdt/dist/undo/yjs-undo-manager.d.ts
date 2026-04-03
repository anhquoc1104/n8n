import * as Y from 'yjs';
import type { CRDTUndoManager, UndoManagerOptions, UndoStackChangeEvent, Unsubscribe } from '../types';
export declare const YjsUndoManagerOrigin: unique symbol;
export declare const YjsRemoteOrigin: unique symbol;
export declare class YjsUndoManager implements CRDTUndoManager {
    private readonly undoManager;
    private readonly stackChangeHandlers;
    private destroyed;
    private lastMeta;
    private prevCanUndo;
    private prevCanRedo;
    constructor(yDoc: Y.Doc, options?: UndoManagerOptions);
    private handleStackChange;
    private handleStackItemPopped;
    private notifyIfChanged;
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
