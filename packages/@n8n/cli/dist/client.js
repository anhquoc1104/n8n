"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nClient = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, hint) {
        super(message);
        this.statusCode = statusCode;
        this.hint = hint;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
class N8nClient {
    constructor(options) {
        let url = options.baseUrl.replace(/\/+$/, '');
        if (!url.endsWith('/api/v1')) {
            url = `${url}/api/v1`;
        }
        this.baseUrl = url;
        this.headers = new Headers({
            'X-N8N-API-KEY': options.apiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'n8n-cli',
        });
        this.debug = options.debug;
    }
    async request(method, path, options = {}) {
        const url = new URL(`${this.baseUrl}${path}`);
        if (options.query) {
            for (const [k, v] of Object.entries(options.query)) {
                if (v !== undefined && v !== '')
                    url.searchParams.set(k, v);
            }
        }
        this.debug?.(`→ ${method} ${url}`);
        const start = Date.now();
        let response;
        try {
            response = await fetch(url.toString(), {
                method,
                headers: this.headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
            });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            this.debug?.(`✗ Connection failed (${Date.now() - start}ms): ${msg}`);
            throw new ApiError(0, `Could not connect to n8n at ${this.baseUrl.replace('/api/v1', '')}`, `Connection error: ${msg}. Check the URL and ensure the instance is running.`);
        }
        this.debug?.(`← ${response.status} ${response.statusText} (${Date.now() - start}ms)`);
        if (response.status === 204) {
            return undefined;
        }
        const contentType = response.headers.get('content-type') ?? '';
        const isJson = contentType.includes('application/json');
        const data = isJson ? await response.json() : await response.text();
        if (!response.ok) {
            const message = typeof data === 'object' && data !== null && 'message' in data
                ? String(data.message)
                : `Request failed (${response.status})`;
            const hint = response.status === 401
                ? "Check your API key. Run 'n8n-cli config set-api-key <key>' or set N8N_API_KEY."
                : response.status === 404
                    ? 'Resource not found. Verify the ID is correct.'
                    : undefined;
            throw new ApiError(response.status, message, hint);
        }
        return data;
    }
    async get(path, query) {
        return await this.request('GET', path, { query });
    }
    async post(path, body) {
        return await this.request('POST', path, { body });
    }
    async put(path, body) {
        return await this.request('PUT', path, { body });
    }
    async patch(path, body) {
        return await this.request('PATCH', path, { body });
    }
    async del(path, query) {
        return await this.request('DELETE', path, { query });
    }
    async paginate(path, query = {}, limit) {
        const results = [];
        let cursor;
        do {
            const q = { ...query, ...(cursor ? { cursor } : {}) };
            if (limit !== undefined) {
                q.limit = String(Math.min(limit - results.length, 250));
            }
            const page = await this.get(path, q);
            results.push(...page.data);
            cursor = page.nextCursor;
        } while (cursor && (limit === undefined || results.length < limit));
        return limit !== undefined ? results.slice(0, limit) : results;
    }
    async listWorkflows(query = {}, limit) {
        return await this.paginate('/workflows', query, limit);
    }
    async getWorkflow(id) {
        return await this.get(`/workflows/${id}`);
    }
    async createWorkflow(body) {
        return await this.post('/workflows', body);
    }
    async updateWorkflow(id, body) {
        return await this.put(`/workflows/${id}`, body);
    }
    async deleteWorkflow(id) {
        return await this.del(`/workflows/${id}`);
    }
    async activateWorkflow(id) {
        return await this.post(`/workflows/${id}/activate`);
    }
    async deactivateWorkflow(id) {
        return await this.post(`/workflows/${id}/deactivate`);
    }
    async getWorkflowTags(id) {
        return await this.get(`/workflows/${id}/tags`);
    }
    async updateWorkflowTags(id, tagIds) {
        return await this.put(`/workflows/${id}/tags`, tagIds.map((tid) => ({ id: tid })));
    }
    async transferWorkflow(id, projectId) {
        return await this.put(`/workflows/${id}/transfer`, {
            destinationProjectId: projectId,
        });
    }
    async listExecutions(query = {}, limit) {
        return await this.paginate('/executions', query, limit);
    }
    async getExecution(id, includeData = false) {
        const query = includeData ? { includeData: 'true' } : {};
        return await this.get(`/executions/${id}`, query);
    }
    async retryExecution(id) {
        return await this.post(`/executions/${id}/retry`);
    }
    async stopExecution(id) {
        return await this.post(`/executions/${id}/stop`);
    }
    async deleteExecution(id) {
        return await this.del(`/executions/${id}`);
    }
    async listCredentials(query = {}, limit) {
        return await this.paginate('/credentials', query, limit);
    }
    async getCredential(id) {
        return await this.get(`/credentials/${id}`);
    }
    async getCredentialSchema(typeName) {
        return await this.get(`/credentials/schema/${typeName}`);
    }
    async createCredential(body) {
        return await this.post('/credentials', body);
    }
    async deleteCredential(id) {
        return await this.del(`/credentials/${id}`);
    }
    async transferCredential(id, projectId) {
        return await this.put(`/credentials/${id}/transfer`, {
            destinationProjectId: projectId,
        });
    }
    async listTags(query = {}, limit) {
        return await this.paginate('/tags', query, limit);
    }
    async createTag(name) {
        return await this.post('/tags', { name });
    }
    async updateTag(id, name) {
        return await this.put(`/tags/${id}`, { name });
    }
    async deleteTag(id) {
        return await this.del(`/tags/${id}`);
    }
    async listProjects(query = {}, limit) {
        return await this.paginate('/projects', query, limit);
    }
    async getProject(id) {
        return await this.get(`/projects/${id}`);
    }
    async createProject(name) {
        return await this.post('/projects', { name });
    }
    async updateProject(id, name) {
        return await this.put(`/projects/${id}`, { name });
    }
    async deleteProject(id) {
        return await this.del(`/projects/${id}`);
    }
    async listProjectMembers(projectId, limit) {
        return await this.paginate(`/projects/${projectId}/users`, {}, limit);
    }
    async addProjectMember(projectId, userId, role) {
        return await this.post(`/projects/${projectId}/users`, {
            relations: [{ userId, role }],
        });
    }
    async updateProjectMemberRole(projectId, userId, role) {
        return await this.patch(`/projects/${projectId}/users/${userId}`, { role });
    }
    async removeProjectMember(projectId, userId) {
        return await this.del(`/projects/${projectId}/users/${userId}`);
    }
    async listVariables(query = {}, limit) {
        return await this.paginate('/variables', query, limit);
    }
    async createVariable(key, value) {
        return await this.post('/variables', { key, value });
    }
    async updateVariable(id, key, value) {
        return await this.put(`/variables/${id}`, { key, value });
    }
    async deleteVariable(id) {
        return await this.del(`/variables/${id}`);
    }
    async listDataTables(query = {}, limit) {
        return await this.paginate('/data-tables', query, limit);
    }
    async getDataTable(id) {
        return await this.get(`/data-tables/${id}`);
    }
    async createDataTable(body) {
        return await this.post('/data-tables', body);
    }
    async deleteDataTable(id) {
        return await this.del(`/data-tables/${id}`);
    }
    async listDataTableRows(tableId, query = {}, limit) {
        return await this.paginate(`/data-tables/${tableId}/rows`, query, limit);
    }
    async addDataTableRows(tableId, data) {
        return await this.post(`/data-tables/${tableId}/rows`, {
            data,
            returnType: 'all',
        });
    }
    async updateDataTableRows(tableId, filter, data) {
        return await this.patch(`/data-tables/${tableId}/rows/update`, {
            filter,
            data,
            returnData: true,
        });
    }
    async upsertDataTableRows(tableId, filter, data) {
        return await this.post(`/data-tables/${tableId}/rows/upsert`, {
            filter,
            data,
            returnData: true,
        });
    }
    async deleteDataTableRows(tableId, filter) {
        return await this.del(`/data-tables/${tableId}/rows/delete`, {
            filter,
            returnData: 'true',
        });
    }
    async listUsers(query = {}, limit) {
        return await this.paginate('/users', query, limit);
    }
    async getUser(id) {
        return await this.get(`/users/${id}`);
    }
    async sourceControlPull(options = {}) {
        return await this.post('/source-control/pull', {
            force: options.force ?? false,
        });
    }
    async audit(categories) {
        const body = {};
        if (categories) {
            body.additionalOptions = { categories };
        }
        return await this.post('/audit', body);
    }
}
exports.N8nClient = N8nClient;
//# sourceMappingURL=client.js.map