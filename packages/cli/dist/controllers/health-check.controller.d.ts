import { GlobalConfig } from '@n8n/config';
import { DbConnection } from '@n8n/db';
export declare class HealthCheckController {
    private readonly globalConfig;
    private readonly dbConnection;
    private readonly startTime;
    constructor(globalConfig: GlobalConfig, dbConnection: DbConnection);
    getHealth(): {
        status: string;
        version: string;
        uptime: number;
        timestamp: string;
        database: {
            connected: boolean;
            migrated: boolean;
            type: "sqlite" | "postgresdb";
        };
    };
}
