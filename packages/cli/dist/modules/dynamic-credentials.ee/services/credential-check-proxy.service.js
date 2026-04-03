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
exports.CredentialCheckProxyService = void 0;
const di_1 = require("@n8n/di");
const credentials_service_ee_1 = require("../../../credentials/credentials.service.ee");
const oauth_service_1 = require("../../../oauth/oauth.service");
const n8n_core_1 = require("n8n-core");
const credential_resolver_workflow_service_1 = require("./credential-resolver-workflow.service");
let CredentialCheckProxyService = class CredentialCheckProxyService {
    constructor(credentialResolverWorkflowService, executionContextService, oauthService, enterpriseCredentialsService) {
        this.credentialResolverWorkflowService = credentialResolverWorkflowService;
        this.executionContextService = executionContextService;
        this.oauthService = oauthService;
        this.enterpriseCredentialsService = enterpriseCredentialsService;
    }
    async checkCredentialStatus(workflowId, executionContext) {
        const plaintext = this.executionContextService.decryptExecutionContext(executionContext);
        if (!plaintext.credentials) {
            throw new Error('Execution context is present but contains no credential context. Ensure credential context establishment hooks are configured for this workflow.');
        }
        const statuses = await this.credentialResolverWorkflowService.getWorkflowStatus(workflowId, plaintext.credentials);
        const credentials = await Promise.all(statuses.map(async (status) => {
            const checkStatus = {
                credentialId: status.credentialId,
                credentialName: status.credentialName,
                credentialType: status.credentialType,
                resolverId: status.resolverId,
                status: status.status,
            };
            if (status.status === 'missing' && status.resolverId) {
                checkStatus.authorizationUrl = await this.generateAuthorizationUrl(status.credentialId, status.resolverId, plaintext.credentials);
            }
            return checkStatus;
        }));
        const readyToExecute = credentials.every((c) => c.status === 'configured');
        return { readyToExecute, credentials };
    }
    async generateAuthorizationUrl(credentialId, resolverId, credentialContext) {
        const credential = await this.enterpriseCredentialsService.getOne(credentialId);
        if (!credential)
            return undefined;
        const csrfData = {
            cid: credential.id,
            origin: 'dynamic-credential',
            authorizationHeader: credentialContext.identity ? `Bearer ${credentialContext.identity}` : '',
            authMetadata: credentialContext.metadata,
            credentialResolverId: resolverId,
        };
        const callerData = [credential, csrfData];
        let authorizationUrl;
        if (credential.type.toLowerCase().includes('oauth2')) {
            authorizationUrl = await this.oauthService.generateAOauth2AuthUri(...callerData);
        }
        else if (credential.type.toLowerCase().includes('oauth1')) {
            authorizationUrl = await this.oauthService.generateAOauth1AuthUri(...callerData);
        }
        return authorizationUrl;
    }
};
exports.CredentialCheckProxyService = CredentialCheckProxyService;
exports.CredentialCheckProxyService = CredentialCheckProxyService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [credential_resolver_workflow_service_1.CredentialResolverWorkflowService,
        n8n_core_1.ExecutionContextService,
        oauth_service_1.OauthService,
        credentials_service_ee_1.EnterpriseCredentialsService])
], CredentialCheckProxyService);
//# sourceMappingURL=credential-check-proxy.service.js.map