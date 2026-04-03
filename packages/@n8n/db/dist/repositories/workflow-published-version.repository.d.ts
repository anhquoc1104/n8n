import { DataSource, Repository } from '@n8n/typeorm';
import { WorkflowPublishedVersion } from '../entities';
export declare class WorkflowPublishedVersionRepository extends Repository<WorkflowPublishedVersion> {
    constructor(dataSource: DataSource);
    setPublishedVersion(workflowId: string, publishedVersionId: string): Promise<void>;
    removePublishedVersion(workflowId: string): Promise<void>;
    getPublishedVersionId(workflowId: string): Promise<string | null>;
}
