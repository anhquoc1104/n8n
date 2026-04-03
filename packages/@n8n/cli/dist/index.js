"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const index_1 = __importDefault(require("./commands/audit/index"));
const set_api_key_1 = __importDefault(require("./commands/config/set-api-key"));
const set_url_1 = __importDefault(require("./commands/config/set-url"));
const show_1 = __importDefault(require("./commands/config/show"));
const create_1 = __importDefault(require("./commands/credential/create"));
const delete_1 = __importDefault(require("./commands/credential/delete"));
const get_1 = __importDefault(require("./commands/credential/get"));
const list_1 = __importDefault(require("./commands/credential/list"));
const schema_1 = __importDefault(require("./commands/credential/schema"));
const transfer_1 = __importDefault(require("./commands/credential/transfer"));
const add_rows_1 = __importDefault(require("./commands/data-table/add-rows"));
const create_2 = __importDefault(require("./commands/data-table/create"));
const delete_2 = __importDefault(require("./commands/data-table/delete"));
const delete_rows_1 = __importDefault(require("./commands/data-table/delete-rows"));
const get_2 = __importDefault(require("./commands/data-table/get"));
const list_2 = __importDefault(require("./commands/data-table/list"));
const rows_1 = __importDefault(require("./commands/data-table/rows"));
const update_rows_1 = __importDefault(require("./commands/data-table/update-rows"));
const upsert_rows_1 = __importDefault(require("./commands/data-table/upsert-rows"));
const delete_3 = __importDefault(require("./commands/execution/delete"));
const get_3 = __importDefault(require("./commands/execution/get"));
const list_3 = __importDefault(require("./commands/execution/list"));
const retry_1 = __importDefault(require("./commands/execution/retry"));
const stop_1 = __importDefault(require("./commands/execution/stop"));
const login_1 = __importDefault(require("./commands/login"));
const logout_1 = __importDefault(require("./commands/logout"));
const add_member_1 = __importDefault(require("./commands/project/add-member"));
const create_3 = __importDefault(require("./commands/project/create"));
const delete_4 = __importDefault(require("./commands/project/delete"));
const get_4 = __importDefault(require("./commands/project/get"));
const list_4 = __importDefault(require("./commands/project/list"));
const members_1 = __importDefault(require("./commands/project/members"));
const remove_member_1 = __importDefault(require("./commands/project/remove-member"));
const update_1 = __importDefault(require("./commands/project/update"));
const install_1 = __importDefault(require("./commands/skill/install"));
const pull_1 = __importDefault(require("./commands/source-control/pull"));
const create_4 = __importDefault(require("./commands/tag/create"));
const delete_5 = __importDefault(require("./commands/tag/delete"));
const list_5 = __importDefault(require("./commands/tag/list"));
const update_2 = __importDefault(require("./commands/tag/update"));
const get_5 = __importDefault(require("./commands/user/get"));
const list_6 = __importDefault(require("./commands/user/list"));
const create_5 = __importDefault(require("./commands/variable/create"));
const delete_6 = __importDefault(require("./commands/variable/delete"));
const list_7 = __importDefault(require("./commands/variable/list"));
const update_3 = __importDefault(require("./commands/variable/update"));
const activate_1 = __importDefault(require("./commands/workflow/activate"));
const create_6 = __importDefault(require("./commands/workflow/create"));
const deactivate_1 = __importDefault(require("./commands/workflow/deactivate"));
const delete_7 = __importDefault(require("./commands/workflow/delete"));
const get_6 = __importDefault(require("./commands/workflow/get"));
const list_8 = __importDefault(require("./commands/workflow/list"));
const tags_1 = __importDefault(require("./commands/workflow/tags"));
const transfer_2 = __importDefault(require("./commands/workflow/transfer"));
const update_4 = __importDefault(require("./commands/workflow/update"));
exports.commands = {
    login: login_1.default,
    logout: logout_1.default,
    'config:set-url': set_url_1.default,
    'config:set-api-key': set_api_key_1.default,
    'config:show': show_1.default,
    'workflow:list': list_8.default,
    'workflow:get': get_6.default,
    'workflow:create': create_6.default,
    'workflow:update': update_4.default,
    'workflow:delete': delete_7.default,
    'workflow:activate': activate_1.default,
    'workflow:deactivate': deactivate_1.default,
    'workflow:tags': tags_1.default,
    'workflow:transfer': transfer_2.default,
    'execution:list': list_3.default,
    'execution:get': get_3.default,
    'execution:retry': retry_1.default,
    'execution:stop': stop_1.default,
    'execution:delete': delete_3.default,
    'credential:list': list_1.default,
    'credential:get': get_1.default,
    'credential:schema': schema_1.default,
    'credential:create': create_1.default,
    'credential:delete': delete_1.default,
    'credential:transfer': transfer_1.default,
    'tag:list': list_5.default,
    'tag:create': create_4.default,
    'tag:update': update_2.default,
    'tag:delete': delete_5.default,
    'project:list': list_4.default,
    'project:get': get_4.default,
    'project:create': create_3.default,
    'project:update': update_1.default,
    'project:delete': delete_4.default,
    'project:members': members_1.default,
    'project:add-member': add_member_1.default,
    'project:remove-member': remove_member_1.default,
    'variable:list': list_7.default,
    'variable:create': create_5.default,
    'variable:update': update_3.default,
    'variable:delete': delete_6.default,
    'data-table:list': list_2.default,
    'data-table:get': get_2.default,
    'data-table:create': create_2.default,
    'data-table:delete': delete_2.default,
    'data-table:rows': rows_1.default,
    'data-table:add-rows': add_rows_1.default,
    'data-table:update-rows': update_rows_1.default,
    'data-table:upsert-rows': upsert_rows_1.default,
    'data-table:delete-rows': delete_rows_1.default,
    'user:list': list_6.default,
    'user:get': get_5.default,
    'skill:install': install_1.default,
    'source-control:pull': pull_1.default,
    audit: index_1.default,
};
//# sourceMappingURL=index.js.map