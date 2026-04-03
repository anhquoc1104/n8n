import type { CredentialCheckResult, DynamicCredentialCheckProxyProvider, IExecutionContext } from 'n8n-workflow';
import { EnterpriseCredentialsService } from '../../../credentials/credentials.service.ee';
import { OauthService } from '../../../oauth/oauth.service';
import { ExecutionContextService } from 'n8n-core';
import { CredentialResolverWorkflowService } from './credential-resolver-workflow.service';
export declare class CredentialCheckProxyService implements DynamicCredentialCheckProxyProvider {
    private readonly credentialResolverWorkflowService;
    private readonly executionContextService;
    private readonly oauthService;
    private readonly enterpriseCredentialsService;
    constructor(credentialResolverWorkflowService: CredentialResolverWorkflowService, executionContextService: ExecutionContextService, oauthService: OauthService, enterpriseCredentialsService: EnterpriseCredentialsService);
    checkCredentialStatus(workflowId: string, executionContext: IExecutionContext): Promise<CredentialCheckResult>;
    private generateAuthorizationUrl;
}
