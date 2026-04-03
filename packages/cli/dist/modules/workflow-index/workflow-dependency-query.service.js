"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDependencyQueryService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const permissions_1 = require("@n8n/permissions");
const typeorm_1 = require("@n8n/typeorm");
const credentials_finder_service_1 = require("../../credentials/credentials-finder.service");
const data_table_repository_1 = require("../../modules/data-table/data-table.repository");
const role_service_1 = require("../../services/role.service");
const workflow_finder_service_1 = require("../../workflows/workflow-finder.service");
let WorkflowDependencyQueryService = class WorkflowDependencyQueryService {
    constructor(dependencyRepository, credentialsRepository, workflowRepository, dataTableRepository, workflowFinderService, credentialsFinderService, projectRelationRepository, roleService) {
        this.dependencyRepository = dependencyRepository;
        this.credentialsRepository = credentialsRepository;
        this.workflowRepository = workflowRepository;
        this.dataTableRepository = dataTableRepository;
        this.workflowFinderService = workflowFinderService;
        this.credentialsFinderService = credentialsFinderService;
        this.projectRelationRepository = projectRelationRepository;
        this.roleService = roleService;
    }
    async getDependencyCounts(resourceIds, resourceType, user) {
        const loaded = await this.loadDepsForResources(resourceIds, resourceType, user);
        if (!loaded)
            return {};
        const { accessibleInputIds, maps } = loaded;
        const result = {};
        for (const id of accessibleInputIds) {
            result[id] = {
                credentialId: maps.credMap.get(id)?.size ?? 0,
                dataTableId: maps.dtMap.get(id)?.size ?? 0,
                workflowCall: maps.subMap.get(id)?.size ?? 0,
                workflowParent: maps.parentMap.get(id)?.size ?? 0,
            };
        }
        return result;
    }
    async getResourceDependencies(resourceIds, resourceType, user) {
        const loaded = await this.loadDepsForResources(resourceIds, resourceType, user);
        if (!loaded)
            return {};
        const { accessibleInputIds, maps } = loaded;
        const [accessibleWfIds, accessibleCredIds, accessibleDtIds] = await Promise.all([
            this.filterByAccess([...maps.allWfIds], 'workflow', user),
            this.filterByAccess([...maps.allCredIds], 'credential', user),
            this.filterByAccess([...maps.allDtIds], 'dataTable', user),
        ]);
        const [credentials, workflows, dataTables] = await Promise.all([
            accessibleCredIds.length > 0
                ? this.credentialsRepository.find({
                    where: { id: (0, typeorm_1.In)(accessibleCredIds) },
                    select: ['id', 'name'],
                })
                : [],
            accessibleWfIds.length > 0
                ? this.workflowRepository.find({
                    where: { id: (0, typeorm_1.In)(accessibleWfIds) },
                    select: ['id', 'name'],
                })
                : [],
            accessibleDtIds.length > 0
                ? this.dataTableRepository.find({
                    where: { id: (0, typeorm_1.In)(accessibleDtIds) },
                    select: ['id', 'name', 'projectId'],
                })
                : [],
        ]);
        const wfNames = new Map();
        const credNames = new Map();
        const dtNames = new Map();
        for (const c of credentials)
            credNames.set(c.id, c.name ?? c.id);
        for (const w of workflows)
            wfNames.set(w.id, w.name ?? w.id);
        for (const dt of dataTables)
            dtNames.set(dt.id, { name: dt.name ?? dt.id, projectId: dt.projectId });
        return this.buildEnrichedResult(accessibleInputIds, maps, {
            wfNames,
            credNames,
            dtNames,
        });
    }
    async loadDepsForResources(resourceIds, resourceType, user) {
        const accessibleInputIds = await this.filterByAccess(resourceIds, resourceType, user);
        if (accessibleInputIds.length === 0)
            return null;
        const rawDeps = await this.dependencyRepository.find({
            where: [
                {
                    workflowId: (0, typeorm_1.In)(accessibleInputIds),
                    dependencyType: (0, typeorm_1.In)(['credentialId', 'dataTableId', 'workflowCall']),
                },
                { dependencyKey: (0, typeorm_1.In)(accessibleInputIds) },
            ],
            select: ['workflowId', 'dependencyType', 'dependencyKey'],
        });
        if (rawDeps.length === 0)
            return null;
        return { accessibleInputIds, maps: this.buildDepMaps(rawDeps) };
    }
    buildDepMaps(rawDeps) {
        const credMap = new Map();
        const dtMap = new Map();
        const subMap = new Map();
        const parentMap = new Map();
        const allCredIds = new Set();
        const allWfIds = new Set();
        const allDtIds = new Set();
        for (const dep of rawDeps) {
            allWfIds.add(dep.workflowId);
            addToSet(parentMap, dep.dependencyKey, dep.workflowId);
            switch (dep.dependencyType) {
                case 'credentialId':
                    addToSet(credMap, dep.workflowId, dep.dependencyKey);
                    allCredIds.add(dep.dependencyKey);
                    break;
                case 'dataTableId':
                    addToSet(dtMap, dep.workflowId, dep.dependencyKey);
                    allDtIds.add(dep.dependencyKey);
                    break;
                case 'workflowCall':
                    addToSet(subMap, dep.workflowId, dep.dependencyKey);
                    allWfIds.add(dep.dependencyKey);
                    break;
            }
        }
        return { credMap, dtMap, subMap, parentMap, allCredIds, allWfIds, allDtIds };
    }
    buildEnrichedResult(resourceIds, maps, accessMaps) {
        const result = {};
        for (const resourceId of resourceIds) {
            const dependencies = [];
            let inaccessibleCount = 0;
            const resolve = (ids, nameMap, type) => {
                for (const id of ids ?? []) {
                    const name = nameMap.get(id);
                    if (name !== undefined) {
                        dependencies.push({ id, name, type });
                    }
                    else {
                        inaccessibleCount++;
                    }
                }
            };
            resolve(maps.subMap.get(resourceId), accessMaps.wfNames, 'workflowCall');
            resolve(maps.parentMap.get(resourceId), accessMaps.wfNames, 'workflowParent');
            resolve(maps.credMap.get(resourceId), accessMaps.credNames, 'credentialId');
            for (const id of maps.dtMap.get(resourceId) ?? []) {
                const dt = accessMaps.dtNames.get(id);
                if (dt) {
                    dependencies.push({ id, name: dt.name, type: 'dataTableId', projectId: dt.projectId });
                }
                else {
                    inaccessibleCount++;
                }
            }
            result[resourceId] = { dependencies, inaccessibleCount };
        }
        return result;
    }
    async filterByAccess(ids, resourceType, user) {
        if (ids.length === 0)
            return [];
        switch (resourceType) {
            case 'workflow': {
                const accessible = await this.workflowFinderService.findWorkflowIdsWithScopeForUser(ids, user, ['workflow:read']);
                return ids.filter((id) => accessible.has(id));
            }
            case 'credential': {
                const accessible = await this.credentialsFinderService.findCredentialIdsWithScopeForUser(ids, user, ['credential:read']);
                return ids.filter((id) => accessible.has(id));
            }
            case 'dataTable': {
                return await this.filterDataTableIdsByAccess(ids, user);
            }
        }
    }
    async filterDataTableIdsByAccess(ids, user) {
        if ((0, permissions_1.hasGlobalScope)(user, 'dataTable:listProject'))
            return ids;
        const dataTables = await this.dataTableRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
            select: ['id', 'projectId'],
        });
        const roles = await this.roleService.rolesWithScope('project', ['dataTable:listProject']);
        const accessibleProjectIds = new Set(await this.projectRelationRepository.getAccessibleProjectsByRoles(user.id, roles));
        return dataTables.filter((dt) => accessibleProjectIds.has(dt.projectId)).map((dt) => dt.id);
    }
};
exports.WorkflowDependencyQueryService = WorkflowDependencyQueryService;
exports.WorkflowDependencyQueryService = WorkflowDependencyQueryService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [db_1.WorkflowDependencyRepository,
        db_1.CredentialsRepository,
        db_1.WorkflowRepository,
        data_table_repository_1.DataTableRepository,
        workflow_finder_service_1.WorkflowFinderService,
        credentials_finder_service_1.CredentialsFinderService,
        db_1.ProjectRelationRepository,
        role_service_1.RoleService])
], WorkflowDependencyQueryService);
function addToSet(map, key, val) {
    let set = map.get(key);
    if (!set) {
        set = new Set();
        map.set(key, set);
    }
    set.add(val);
}
//# sourceMappingURL=workflow-dependency-query.service.js.map