import { t as IRestApiContext } from "./types2.mjs";
import { CreateRoleDto, RoleAssignmentsResponse, RoleProjectMembersResponse, UpdateRoleDto } from "@n8n/api-types";
import { AllRolesMap, Role as Role$1 } from "@n8n/permissions";

//#region src/api/roles.d.ts
declare const getRoles: (context: IRestApiContext) => Promise<AllRolesMap>;
declare const createProjectRole: (context: IRestApiContext, body: CreateRoleDto) => Promise<Role$1>;
declare const getRoleBySlug: (context: IRestApiContext, body: {
  slug: string;
}) => Promise<Role$1>;
declare const updateProjectRole: (context: IRestApiContext, slug: string, body: UpdateRoleDto) => Promise<Role$1>;
declare const deleteProjectRole: (context: IRestApiContext, slug: string) => Promise<Role$1>;
declare const getRoleAssignments: (context: IRestApiContext, slug: string) => Promise<RoleAssignmentsResponse>;
declare const getRoleProjectMembers: (context: IRestApiContext, slug: string, projectId: string) => Promise<RoleProjectMembersResponse>;
//#endregion
export { getRoleProjectMembers as a, getRoleBySlug as i, deleteProjectRole as n, getRoles as o, getRoleAssignments as r, updateProjectRole as s, createProjectRole as t };
//# sourceMappingURL=roles.d.mts.map