import type { DependenciesBatchResponse, DependencyCountsBatchResponse, DependencyResourceType } from '@n8n/api-types';
import { CredentialsRepository, ProjectRelationRepository, WorkflowDependencyRepository, WorkflowRepository } from '@n8n/db';
import type { User } from '@n8n/db';
import { CredentialsFinderService } from '../../credentials/credentials-finder.service';
import { DataTableRepository } from '../../modules/data-table/data-table.repository';
import { RoleService } from '../../services/role.service';
import { WorkflowFinderService } from '../../workflows/workflow-finder.service';
export declare class WorkflowDependencyQueryService {
    private readonly dependencyRepository;
    private readonly credentialsRepository;
    private readonly workflowRepository;
    private readonly dataTableRepository;
    private readonly workflowFinderService;
    private readonly credentialsFinderService;
    private readonly projectRelationRepository;
    private readonly roleService;
    constructor(dependencyRepository: WorkflowDependencyRepository, credentialsRepository: CredentialsRepository, workflowRepository: WorkflowRepository, dataTableRepository: DataTableRepository, workflowFinderService: WorkflowFinderService, credentialsFinderService: CredentialsFinderService, projectRelationRepository: ProjectRelationRepository, roleService: RoleService);
    getDependencyCounts(resourceIds: string[], resourceType: DependencyResourceType, user: User): Promise<DependencyCountsBatchResponse>;
    getResourceDependencies(resourceIds: string[], resourceType: DependencyResourceType, user: User): Promise<DependenciesBatchResponse>;
    private loadDepsForResources;
    private buildDepMaps;
    private buildEnrichedResult;
    private filterByAccess;
    private filterDataTableIdsByAccess;
}
