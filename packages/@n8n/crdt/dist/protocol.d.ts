export declare const MESSAGE_SYNC = 0;
export declare const MESSAGE_AWARENESS = 1;
export declare const MESSAGE_SUBSCRIBE = 2;
export declare const MESSAGE_UNSUBSCRIBE = 3;
export declare const MESSAGE_CONNECTED = 4;
export declare const MESSAGE_DISCONNECTED = 5;
export declare const MESSAGE_INITIAL_SYNC = 6;
export declare function encodeMessage(messageType: number, payload: Uint8Array): Uint8Array;
export declare function decodeMessage(data: Uint8Array): {
    messageType: number;
    payload: Uint8Array;
};
export declare function encodeWithDocId(messageType: number, docId: string, payload?: Uint8Array): Uint8Array;
export declare function decodeWithDocId(data: Uint8Array): {
    messageType: number;
    docId: string;
    payload: Uint8Array;
};
export declare function stripDocId(data: Uint8Array): Uint8Array;
export declare function addDocId(docId: string, data: Uint8Array): Uint8Array;
export declare function encodeString(str: string): Uint8Array;
export declare function decodeString(data: Uint8Array): string;
