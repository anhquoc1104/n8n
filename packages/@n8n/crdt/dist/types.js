"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRDTEngine = exports.ChangeOrigin = exports.ChangeAction = void 0;
exports.isMapChange = isMapChange;
exports.isArrayChange = isArrayChange;
exports.ChangeAction = {
    add: 'add',
    update: 'update',
    delete: 'delete',
};
exports.ChangeOrigin = {
    local: 'local',
    remote: 'remote',
    undoRedo: 'undoRedo',
};
function isMapChange(change) {
    return 'action' in change;
}
function isArrayChange(change) {
    return 'delta' in change;
}
exports.CRDTEngine = {
    yjs: 'yjs',
};
//# sourceMappingURL=types.js.map