export type DependencyType = 'credentialId' | 'dataTableId' | 'workflowCall' | 'workflowParent';
export type DependencyResourceType = 'workflow' | 'credential' | 'dataTable';
export interface ResolvedDependency {
    type: DependencyType;
    id: string;
    name: string;
    projectId?: string;
}
export interface ResolvedDependenciesResult {
    dependencies: ResolvedDependency[];
    inaccessibleCount: number;
}
export type DependenciesBatchResponse = Record<string, ResolvedDependenciesResult>;
