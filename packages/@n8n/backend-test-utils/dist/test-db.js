"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBootstrapDBOptions = exports.testDbPrefix = void 0;
exports.init = init;
exports.isReady = isReady;
exports.terminate = terminate;
exports.truncate = truncate;
const config_1 = require("@n8n/config");
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const assert_1 = __importDefault(require("assert"));
const n8n_workflow_1 = require("n8n-workflow");
exports.testDbPrefix = 'n8n_test_';
let isInitialized = false;
let testDbName;
let originalDatabase;
const getBootstrapDBOptions = () => {
    const globalConfig = di_1.Container.get(config_1.GlobalConfig);
    (0, assert_1.default)(globalConfig.database.type === 'postgresdb', 'Database type must be postgresdb');
    return {
        type: 'postgres',
        ...di_1.Container.get(db_1.DbConnectionOptions).getPostgresOverrides(),
        database: globalConfig.database.postgresdb.database,
        entityPrefix: globalConfig.database.tablePrefix,
        schema: globalConfig.database.postgresdb.schema,
    };
};
exports.getBootstrapDBOptions = getBootstrapDBOptions;
async function init() {
    if (isInitialized)
        return;
    const globalConfig = di_1.Container.get(config_1.GlobalConfig);
    const dbType = globalConfig.database.type;
    testDbName = `${exports.testDbPrefix}${(0, n8n_workflow_1.randomString)(6, 10).toLowerCase()}_${Date.now()}`;
    if (dbType === 'postgresdb') {
        originalDatabase = globalConfig.database.postgresdb.database;
        const bootstrapPostgres = await new typeorm_1.DataSource((0, exports.getBootstrapDBOptions)()).initialize();
        await bootstrapPostgres.query(`CREATE DATABASE ${testDbName}`);
        await bootstrapPostgres.destroy();
        globalConfig.database.postgresdb.database = testDbName;
    }
    const dbConnection = di_1.Container.get(db_1.DbConnection);
    await dbConnection.init();
    await dbConnection.migrate();
    await di_1.Container.get(db_1.AuthRolesService).init();
    isInitialized = true;
}
function isReady() {
    const { connectionState } = di_1.Container.get(db_1.DbConnection);
    return connectionState.connected && connectionState.migrated;
}
async function terminate() {
    const dbConnection = di_1.Container.get(db_1.DbConnection);
    await dbConnection.close();
    dbConnection.connectionState.connected = false;
    if (testDbName && originalDatabase) {
        const globalConfig = di_1.Container.get(config_1.GlobalConfig);
        if (globalConfig.database.type === 'postgresdb') {
            try {
                globalConfig.database.postgresdb.database = originalDatabase;
                const bootstrap = await new typeorm_1.DataSource((0, exports.getBootstrapDBOptions)()).initialize();
                await bootstrap.query(`DROP DATABASE IF EXISTS "${testDbName}"`);
                await bootstrap.destroy();
            }
            catch (error) {
                console.warn(`Failed to drop test database "${testDbName}":`, error);
            }
        }
        testDbName = undefined;
    }
    isInitialized = false;
}
async function truncate(entities) {
    const connection = di_1.Container.get(typeorm_1.DataSource);
    const junctionTablesToClean = new Set();
    for (const name of entities) {
        try {
            const metadata = connection.getMetadata(name);
            for (const relation of metadata.manyToManyRelations) {
                if (relation.junctionEntityMetadata) {
                    const junctionTableName = relation.junctionEntityMetadata.tablePath;
                    junctionTablesToClean.add(junctionTableName);
                }
            }
        }
        catch (error) {
        }
    }
    for (const tableName of junctionTablesToClean) {
        await connection.query(`DELETE FROM ${tableName}`);
    }
    for (const name of entities) {
        await connection.getRepository(name).delete({});
    }
}
//# sourceMappingURL=test-db.js.map