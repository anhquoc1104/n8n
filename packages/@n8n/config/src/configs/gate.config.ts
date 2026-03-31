import { Config, Env } from '../decorators';

@Config
export class GateConfig {
	/** Access code required to enter n8n. Leave empty to disable the gate. */
	@Env('N8N_GATE_CODE')
	code: string = '';
}
