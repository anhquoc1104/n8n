export interface DependencyTypeCounts {
    credentialId: number;
    dataTableId: number;
    workflowCall: number;
    workflowParent: number;
}
export type DependencyCountsBatchResponse = Record<string, DependencyTypeCounts>;
