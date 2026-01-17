import { RoleName } from "./role-names.js";
import { Resource } from "./resources.js";
import { Permission } from "./permissions.js";
import { ResourceGroups } from "./display-names.js";
import type { ResourceGroupName } from "./display-names.js";

/**
 * Returns the default permissions configuration for a given role.
 * This provides sensible defaults for each role type based on typical use cases.
 *
 * Note: These are suggested defaults. Applications may customize permissions
 * per role instance based on organizational needs.
 *
 * @param roleName - The role to get default permissions for
 * @returns A mapping of resources to their permitted actions
 *
 * @example
 * ```typescript
 * const authorRole: Role = {
 *   id: "role_001",
 *   name: RoleName.Author,
 *   resources: getDefaultRolePermissions(RoleName.Author)
 * };
 * ```
 */
export function getDefaultRolePermissions(
  roleName: RoleName
): Partial<Record<Resource, Permission[]>> {
  switch (roleName) {
    case RoleName.Admin:
      // Full access to everything
      return {
        [Resource.ArticleDraft]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.ArticlePublished]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.ArticleArchived]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.UserView]: [Permission.Read],
        [Resource.UserManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.CategoryManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.TagManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.MediaUpload]: [Permission.Write],
        [Resource.MediaManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.AnalyticsView]: [Permission.Read],
        [Resource.SettingsManage]: [Permission.Read, Permission.Write],
      };

    case RoleName.Editor:
      // Manage all content, but no user/system management
      return {
        [Resource.ArticleDraft]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.ArticlePublished]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.ArticleArchived]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.UserView]: [Permission.Read],
        [Resource.CategoryManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.TagManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.MediaUpload]: [Permission.Write],
        [Resource.MediaManage]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.AnalyticsView]: [Permission.Read],
      };

    case RoleName.Author:
      // Create and manage own articles (enforcement at application level)
      return {
        [Resource.ArticleDraft]: [
          Permission.Read,
          Permission.Write,
          Permission.Delete,
        ],
        [Resource.ArticlePublished]: [Permission.Read, Permission.Write],
        [Resource.CategoryManage]: [Permission.Read],
        [Resource.TagManage]: [Permission.Read],
        [Resource.MediaUpload]: [Permission.Write],
        [Resource.MediaManage]: [Permission.Read, Permission.Delete], // Own media only
        [Resource.AnalyticsView]: [Permission.Read], // Own article analytics
      };

    case RoleName.Viewer:
      // Read-only access to published content
      return {
        [Resource.ArticlePublished]: [Permission.Read],
        [Resource.AnalyticsView]: [Permission.Read],
      };

    case RoleName.Contributor:
      // Create drafts only, cannot publish
      return {
        [Resource.ArticleDraft]: [Permission.Read, Permission.Write],
        [Resource.CategoryManage]: [Permission.Read],
        [Resource.TagManage]: [Permission.Read],
        [Resource.MediaUpload]: [Permission.Write],
      };

    case RoleName.Publisher:
      // Publish and archive articles
      return {
        [Resource.ArticleDraft]: [Permission.Read],
        [Resource.ArticlePublished]: [Permission.Read, Permission.Write],
        [Resource.ArticleArchived]: [Permission.Read, Permission.Write],
        [Resource.CategoryManage]: [Permission.Read],
        [Resource.TagManage]: [Permission.Read],
        [Resource.AnalyticsView]: [Permission.Read],
      };

    case RoleName.Reviewer:
      // Review and approve drafts
      return {
        [Resource.ArticleDraft]: [Permission.Read, Permission.Write],
        [Resource.ArticlePublished]: [Permission.Read],
        [Resource.CategoryManage]: [Permission.Read],
        [Resource.TagManage]: [Permission.Read],
        [Resource.AnalyticsView]: [Permission.Read],
      };

    default:
      // Exhaustiveness check - TypeScript will error if we miss a role
      const _exhaustive: never = roleName;
      return {};
  }
}

/**
 * Returns all available role names as an array.
 * Useful for iterating over all roles or populating dropdowns.
 *
 * @returns Array of all RoleName enum values
 *
 * @example
 * ```typescript
 * const allRoles = getAllRoleNames(); // [RoleName.Admin, RoleName.Editor, ...]
 * ```
 */
export function getAllRoleNames(): RoleName[] {
  return Object.values(RoleName);
}

/**
 * Returns all available resources as an array.
 * Useful for iterating over all resources or building permission matrices.
 *
 * @returns Array of all Resource enum values
 *
 * @example
 * ```typescript
 * const allResources = getAllResources();
 * allResources.forEach(resource => console.log(ResourceDisplayNames[resource]));
 * ```
 */
export function getAllResources(): Resource[] {
  return Object.values(Resource);
}

/**
 * Finds which group a resource belongs to in the ResourceGroups structure.
 * Returns undefined if the resource is not in any group (e.g., deprecated resources).
 *
 * @param resource - The resource to find the group for
 * @returns The group name or undefined if not found
 *
 * @example
 * ```typescript
 * getResourceGroup(Resource.ArticleDraft); // "Articles"
 * getResourceGroup(Resource.MediaUpload); // "Content Management"
 * ```
 */
export function getResourceGroup(
  resource: Resource
): ResourceGroupName | undefined {
  for (const [groupName, resources] of Object.entries(ResourceGroups)) {
    if ((resources as readonly Resource[]).includes(resource)) {
      return groupName as ResourceGroupName;
    }
  }
  return undefined;
}

/**
 * Checks if a resource set includes a specific permission for a resource.
 * Helper for permission checking logic.
 *
 * @param resourcePermissions - The permissions map from a Role
 * @param resource - The resource to check
 * @param permission - The permission to verify
 * @returns true if the permission is granted
 *
 * @example
 * ```typescript
 * hasPermission(role.resources, Resource.ArticleDraft, Permission.Write); // true/false
 * ```
 */
export function hasPermission(
  resourcePermissions: Partial<Record<Resource, Permission[]>>,
  resource: Resource,
  permission: Permission
): boolean {
  const permissions = resourcePermissions[resource];
  return permissions ? permissions.includes(permission) : false;
}
