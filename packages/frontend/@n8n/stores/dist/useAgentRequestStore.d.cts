import * as _vueuse_core0 from "@vueuse/core";
import * as pinia0 from "pinia";
import { AgentRequestQuery } from "n8n-workflow";

//#region src/useAgentRequestStore.d.ts
interface IAgentRequest {
  query: AgentRequestQuery;
  toolName?: string;
}
interface IAgentRequestStoreState {
  [workflowId: string]: {
    [nodeName: string]: IAgentRequest;
  };
}
declare const useAgentRequestStore: pinia0.StoreDefinition<"agentRequest", Pick<{
  agentRequests: _vueuse_core0.RemovableRef<IAgentRequestStoreState>;
  getAgentRequests: (workflowId: string, nodeId: string) => IAgentRequest["query"];
  getQueryValue: (workflowId: string, nodeId: string, nodeName: string, paramName?: string) => unknown;
  setAgentRequestForNode: (workflowId: string, nodeId: string, request: IAgentRequest) => void;
  clearAgentRequests: (workflowId: string, nodeId: string) => void;
  clearAllAgentRequests: (workflowId?: string) => void;
  getAgentRequest: (workflowId: string, nodeId: string) => IAgentRequest | undefined;
}, "agentRequests">, Pick<{
  agentRequests: _vueuse_core0.RemovableRef<IAgentRequestStoreState>;
  getAgentRequests: (workflowId: string, nodeId: string) => IAgentRequest["query"];
  getQueryValue: (workflowId: string, nodeId: string, nodeName: string, paramName?: string) => unknown;
  setAgentRequestForNode: (workflowId: string, nodeId: string, request: IAgentRequest) => void;
  clearAgentRequests: (workflowId: string, nodeId: string) => void;
  clearAllAgentRequests: (workflowId?: string) => void;
  getAgentRequest: (workflowId: string, nodeId: string) => IAgentRequest | undefined;
}, never>, Pick<{
  agentRequests: _vueuse_core0.RemovableRef<IAgentRequestStoreState>;
  getAgentRequests: (workflowId: string, nodeId: string) => IAgentRequest["query"];
  getQueryValue: (workflowId: string, nodeId: string, nodeName: string, paramName?: string) => unknown;
  setAgentRequestForNode: (workflowId: string, nodeId: string, request: IAgentRequest) => void;
  clearAgentRequests: (workflowId: string, nodeId: string) => void;
  clearAllAgentRequests: (workflowId?: string) => void;
  getAgentRequest: (workflowId: string, nodeId: string) => IAgentRequest | undefined;
}, "getAgentRequests" | "getQueryValue" | "setAgentRequestForNode" | "clearAgentRequests" | "clearAllAgentRequests" | "getAgentRequest">>;
//#endregion
export { IAgentRequest, IAgentRequestStoreState, useAgentRequestStore };
//# sourceMappingURL=useAgentRequestStore.d.cts.map