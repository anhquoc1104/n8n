export interface PaginatedResponse<T> {
    data: T[];
    nextCursor?: string;
}
export interface ClientOptions {
    baseUrl: string;
    apiKey: string;
    debug?: (message: string) => void;
}
export declare class ApiError extends Error {
    readonly statusCode: number;
    readonly hint?: string | undefined;
    constructor(statusCode: number, message: string, hint?: string | undefined);
}
export declare class N8nClient {
    private readonly baseUrl;
    private readonly headers;
    private readonly debug?;
    constructor(options: ClientOptions);
    private request;
    private get;
    private post;
    private put;
    private patch;
    private del;
    paginate<T>(path: string, query?: Record<string, string>, limit?: number): Promise<T[]>;
    listWorkflows(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getWorkflow(id: string): Promise<Record<string, unknown>>;
    createWorkflow(body: unknown): Promise<Record<string, unknown>>;
    updateWorkflow(id: string, body: unknown): Promise<Record<string, unknown>>;
    deleteWorkflow(id: string): Promise<Record<string, unknown>>;
    activateWorkflow(id: string): Promise<Record<string, unknown>>;
    deactivateWorkflow(id: string): Promise<Record<string, unknown>>;
    getWorkflowTags(id: string): Promise<Record<string, unknown>[]>;
    updateWorkflowTags(id: string, tagIds: string[]): Promise<Record<string, unknown>[]>;
    transferWorkflow(id: string, projectId: string): Promise<undefined>;
    listExecutions(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getExecution(id: string, includeData?: boolean): Promise<Record<string, unknown>>;
    retryExecution(id: string): Promise<Record<string, unknown>>;
    stopExecution(id: string): Promise<Record<string, unknown>>;
    deleteExecution(id: string): Promise<Record<string, unknown>>;
    listCredentials(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getCredential(id: string): Promise<Record<string, unknown>>;
    getCredentialSchema(typeName: string): Promise<Record<string, unknown>>;
    createCredential(body: unknown): Promise<Record<string, unknown>>;
    deleteCredential(id: string): Promise<Record<string, unknown>>;
    transferCredential(id: string, projectId: string): Promise<undefined>;
    listTags(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    createTag(name: string): Promise<Record<string, unknown>>;
    updateTag(id: string, name: string): Promise<Record<string, unknown>>;
    deleteTag(id: string): Promise<Record<string, unknown>>;
    listProjects(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getProject(id: string): Promise<Record<string, unknown>>;
    createProject(name: string): Promise<Record<string, unknown>>;
    updateProject(id: string, name: string): Promise<undefined>;
    deleteProject(id: string): Promise<undefined>;
    listProjectMembers(projectId: string, limit?: number): Promise<Record<string, unknown>[]>;
    addProjectMember(projectId: string, userId: string, role: string): Promise<undefined>;
    updateProjectMemberRole(projectId: string, userId: string, role: string): Promise<undefined>;
    removeProjectMember(projectId: string, userId: string): Promise<undefined>;
    listVariables(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    createVariable(key: string, value: string): Promise<Record<string, unknown>>;
    updateVariable(id: string, key: string, value: string): Promise<undefined>;
    deleteVariable(id: string): Promise<undefined>;
    listDataTables(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getDataTable(id: string): Promise<Record<string, unknown>>;
    createDataTable(body: unknown): Promise<Record<string, unknown>>;
    deleteDataTable(id: string): Promise<undefined>;
    listDataTableRows(tableId: string, query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    addDataTableRows(tableId: string, data: unknown[]): Promise<Record<string, unknown>>;
    updateDataTableRows(tableId: string, filter: unknown, data: unknown): Promise<unknown>;
    upsertDataTableRows(tableId: string, filter: unknown, data: unknown): Promise<unknown>;
    deleteDataTableRows(tableId: string, filter: string): Promise<unknown>;
    listUsers(query?: Record<string, string>, limit?: number): Promise<Record<string, unknown>[]>;
    getUser(id: string): Promise<Record<string, unknown>>;
    sourceControlPull(options?: {
        force?: boolean;
    }): Promise<Record<string, unknown>>;
    audit(categories?: string[]): Promise<Record<string, unknown>>;
}
