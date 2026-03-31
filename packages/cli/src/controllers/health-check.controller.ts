import { GlobalConfig } from '@n8n/config';
import { DbConnection } from '@n8n/db';
import { Get, RestController } from '@n8n/decorators';

import { N8N_VERSION } from '@/constants';

@RestController('/health')
export class HealthCheckController {
	private readonly startTime = Date.now();

	constructor(
		private readonly globalConfig: GlobalConfig,
		private readonly dbConnection: DbConnection,
	) {}

	@Get('/', { skipAuth: true })
	getHealth() {
		const { connected, migrated } = this.dbConnection.connectionState;
		const isHealthy = connected && migrated;

		return {
			status: isHealthy ? 'ok' : 'degraded',
			version: N8N_VERSION,
			uptime: Math.floor((Date.now() - this.startTime) / 1000),
			timestamp: new Date().toISOString(),
			database: {
				connected,
				migrated,
				type: this.globalConfig.database.type,
			},
		};
	}
}
