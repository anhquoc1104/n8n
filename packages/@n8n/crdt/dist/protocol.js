"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_INITIAL_SYNC = exports.MESSAGE_DISCONNECTED = exports.MESSAGE_CONNECTED = exports.MESSAGE_UNSUBSCRIBE = exports.MESSAGE_SUBSCRIBE = exports.MESSAGE_AWARENESS = exports.MESSAGE_SYNC = void 0;
exports.encodeMessage = encodeMessage;
exports.decodeMessage = decodeMessage;
exports.encodeWithDocId = encodeWithDocId;
exports.decodeWithDocId = decodeWithDocId;
exports.stripDocId = stripDocId;
exports.addDocId = addDocId;
exports.encodeString = encodeString;
exports.decodeString = decodeString;
exports.MESSAGE_SYNC = 0;
exports.MESSAGE_AWARENESS = 1;
exports.MESSAGE_SUBSCRIBE = 2;
exports.MESSAGE_UNSUBSCRIBE = 3;
exports.MESSAGE_CONNECTED = 4;
exports.MESSAGE_DISCONNECTED = 5;
exports.MESSAGE_INITIAL_SYNC = 6;
function encodeMessage(messageType, payload) {
    const result = new Uint8Array(1 + payload.length);
    result[0] = messageType;
    result.set(payload, 1);
    return result;
}
function decodeMessage(data) {
    if (data.length === 0) {
        throw new Error('Empty message');
    }
    return {
        messageType: data[0],
        payload: data.subarray(1),
    };
}
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
function encodeWithDocId(messageType, docId, payload = new Uint8Array(0)) {
    const docIdBytes = textEncoder.encode(docId);
    const docIdLen = docIdBytes.length;
    const result = new Uint8Array(1 + 2 + docIdLen + payload.length);
    result[0] = messageType;
    result[1] = (docIdLen >> 8) & 0xff;
    result[2] = docIdLen & 0xff;
    result.set(docIdBytes, 3);
    result.set(payload, 3 + docIdLen);
    return result;
}
function decodeWithDocId(data) {
    if (data.length < 3) {
        throw new Error('Message too short to contain docId');
    }
    const messageType = data[0];
    const docIdLen = (data[1] << 8) | data[2];
    if (data.length < 3 + docIdLen) {
        throw new Error('Message too short for declared docId length');
    }
    const docId = textDecoder.decode(data.subarray(3, 3 + docIdLen));
    const payload = data.subarray(3 + docIdLen);
    return { messageType, docId, payload };
}
function stripDocId(data) {
    const { messageType, payload } = decodeWithDocId(data);
    return encodeMessage(messageType, payload);
}
function addDocId(docId, data) {
    const { messageType, payload } = decodeMessage(data);
    return encodeWithDocId(messageType, docId, payload);
}
function encodeString(str) {
    return textEncoder.encode(str);
}
function decodeString(data) {
    return textDecoder.decode(data);
}
//# sourceMappingURL=protocol.js.map