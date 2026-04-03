import { GetResourceDependenciesDto, GetResourceDependencyCountsDto } from '@n8n/api-types';
import { WorkflowsConfig } from '@n8n/config';
import { AuthenticatedRequest } from '@n8n/db';
import { WorkflowDependencyQueryService } from './workflow-dependency-query.service';
export declare class WorkflowDependencyController {
    private readonly workflowDependencyQueryService;
    private readonly workflowsConfig;
    constructor(workflowDependencyQueryService: WorkflowDependencyQueryService, workflowsConfig: WorkflowsConfig);
    getResourceDependencyCounts(req: AuthenticatedRequest, _res: unknown, body: GetResourceDependencyCountsDto): Promise<import("@n8n/api-types").DependencyCountsBatchResponse>;
    getResourceDependencies(req: AuthenticatedRequest, _res: unknown, body: GetResourceDependenciesDto): Promise<import("@n8n/api-types").DependenciesBatchResponse>;
    private assertIndexingEnabled;
}
