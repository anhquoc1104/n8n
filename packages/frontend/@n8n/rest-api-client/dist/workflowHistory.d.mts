import { t as IRestApiContext } from "./types2.mjs";
import { IConnections, INode } from "n8n-workflow";

//#region src/api/workflowHistory.d.ts
type WorkflowHistory = {
  versionId: string;
  authors: string;
  createdAt: string;
  updatedAt: string;
  workflowPublishHistory: WorkflowPublishHistory[];
  name: string | null;
  description: string | null;
};
type WorkflowVersionData = Pick<WorkflowHistory, 'versionId' | 'name' | 'description'>;
type WorkflowPublishHistory = {
  createdAt: string;
  id: number;
  event: 'activated' | 'deactivated';
  userId: string | null;
  versionId: string;
  workflowId: string;
};
type WorkflowVersionId = WorkflowHistory['versionId'];
type WorkflowVersion = WorkflowHistory & {
  workflowId: string;
  nodes: INode[];
  connections: IConnections;
};
type WorkflowHistoryActionTypes = Array<'restore' | 'publish' | 'unpublish' | 'clone' | 'open' | 'download' | 'name'>;
type WorkflowHistoryRequestParams = {
  take: number;
  skip?: number;
};
type UpdateWorkflowHistoryVersion = {
  nodes?: INode[];
  connections?: IConnections;
  authors?: string;
  name?: string | null;
  description?: string | null;
};
declare const getWorkflowHistory: (context: IRestApiContext, workflowId: string, queryParams: WorkflowHistoryRequestParams) => Promise<WorkflowHistory[]>;
declare const getWorkflowVersion: (context: IRestApiContext, workflowId: string, versionId: string) => Promise<WorkflowVersion>;
declare const getWorkflowVersionsByIds: (context: IRestApiContext, workflowId: string, versionIds: string[]) => Promise<{
  versions: Array<{
    versionId: string;
    createdAt: string;
  }>;
}>;
declare const updateWorkflowHistoryVersion: (context: IRestApiContext, workflowId: string, versionId: string, data: UpdateWorkflowHistoryVersion) => Promise<void>;
//#endregion
export { WorkflowPublishHistory as a, WorkflowVersionId as c, getWorkflowVersionsByIds as d, updateWorkflowHistoryVersion as f, WorkflowHistoryRequestParams as i, getWorkflowHistory as l, WorkflowHistory as n, WorkflowVersion as o, WorkflowHistoryActionTypes as r, WorkflowVersionData as s, UpdateWorkflowHistoryVersion as t, getWorkflowVersion as u };
//# sourceMappingURL=workflowHistory.d.mts.map