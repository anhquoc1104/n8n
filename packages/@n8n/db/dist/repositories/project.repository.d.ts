import type { EntityManager } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import { Project } from '../entities';
export declare class ProjectRepository extends Repository<Project> {
    constructor(dataSource: DataSource);
    getPersonalProjectForUser(userId: string, entityManager?: EntityManager): Promise<Project | null>;
    getPersonalProjectForUserOrFail(userId: string, entityManager?: EntityManager): Promise<Project>;
    getAccessibleProjects(userId: string): Promise<Project[]>;
    findAllProjectsAndCount(options: ProjectListOptions): Promise<[Project[], number]>;
    getAccessibleProjectsAndCount(userId: string, options: ProjectListOptions): Promise<[Project[], number]>;
    private applyFilters;
    private applyActivationOrder;
    private applyPagination;
    getProjectCounts(): Promise<{
        personal: number;
        team: number;
    }>;
}
export interface ProjectListOptions {
    skip?: number;
    take?: number;
    search?: string;
    type?: 'personal' | 'team';
    activated?: boolean;
}
