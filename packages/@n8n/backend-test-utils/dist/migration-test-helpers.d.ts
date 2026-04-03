import { type DatabaseType } from '@n8n/db';
import { DataSource, type ObjectLiteral, type QueryRunner } from '@n8n/typeorm';
export interface TestMigrationContext {
    queryRunner: QueryRunner;
    tablePrefix: string;
    dbType: DatabaseType;
    isSqlite: boolean;
    isPostgres: boolean;
    escape: {
        columnName(name: string): string;
        tableName(name: string): string;
        indexName(name: string): string;
    };
    runQuery: <T = unknown>(sql: string, namedParameters?: ObjectLiteral) => Promise<T>;
}
export declare function createTestMigrationContext(dataSource: DataSource): TestMigrationContext;
export declare function initDbUpToMigration(beforeMigrationName: string): Promise<void>;
export declare function undoLastSingleMigration(): Promise<void>;
export declare function runSingleMigration(migrationName: string): Promise<void>;
