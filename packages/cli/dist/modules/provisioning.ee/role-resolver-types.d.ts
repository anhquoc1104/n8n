export interface RoleResolverContext {
    $claims: Record<string, unknown>;
    $oidc?: {
        idToken: Record<string, unknown>;
        userInfo: Record<string, unknown>;
    };
    $saml?: {
        attributes: Record<string, unknown>;
    };
    $provider: 'oidc' | 'saml' | 'ldap';
    $project?: ProjectInfo;
}
export interface RoleMappingRule {
    id: string;
    expression: string;
    role: string;
    projectId?: string;
    enabled: boolean;
    description?: string;
}
export interface RoleMappingConfig {
    instanceRoleRules: RoleMappingRule[];
    projectRoleRules: RoleMappingRule[];
    fallbackInstanceRole: string;
}
export interface ResolvedRoles {
    instanceRole: string;
    projectRoles: Map<string, string>;
}
export interface ProjectInfo {
    id: string;
    name: string;
    type: 'personal' | 'team';
    description: string | null;
}
