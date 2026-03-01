import { Resource } from "./resources.js";
import { RoleName } from "./role-names.js";
import { Permission } from "./permissions.js";

/**
 * Human-readable display names for roles.
 * Use these in dropdowns, tables, and UI elements instead of enum values.
 *
 * @example
 * ```typescript
 * <select>
 *   {Object.values(RoleName).map(role => (
 *     <option value={role}>{RoleDisplayNames[role]}</option>
 *   ))}
 * </select>
 * ```
 */
export const RoleDisplayNames: Record<RoleName, string> = {
  [RoleName.Admin]: "Administrator",
  [RoleName.Editor]: "Editor",
  [RoleName.Author]: "Author",
  [RoleName.Viewer]: "Viewer",
  [RoleName.Contributor]: "Contributor",
  [RoleName.Publisher]: "Publisher",
  [RoleName.Reviewer]: "Reviewer",
};

/**
 * Descriptive explanations for each role.
 * Use these for tooltips, help text, or role selection interfaces.
 *
 * @example
 * ```typescript
 * <option value={role} title={RoleDescriptions[role]}>
 *   {RoleDisplayNames[role]}
 * </option>
 * ```
 */
export const RoleDescriptions: Record<RoleName, string> = {
  [RoleName.Admin]:
    "Full system access with ability to manage all resources, users, and settings.",
  [RoleName.Editor]:
    "Manages all content including articles, categories, tags, and media library.",
  [RoleName.Author]: "Creates and manages own articles and media uploads.",
  [RoleName.Viewer]: "Read-only access to published content and analytics.",
  [RoleName.Contributor]:
    "Submits draft articles for review without publishing rights.",
  [RoleName.Publisher]:
    "Publishes reviewed articles and manages published content lifecycle.",
  [RoleName.Reviewer]:
    "Reviews and approves contributor submissions before publication.",
};

/**
 * Human-readable display names for resources.
 * Use these in permission matrices and resource selection interfaces.
 *
 * @example
 * ```typescript
 * <Checkbox label={ResourceDisplayNames[resource]} />
 * ```
 */
export const ResourceDisplayNames: Record<Resource, string> = {
  // Legacy (deprecated)
  [Resource.ArticleCreate]: "Create Articles (deprecated)",
  [Resource.ArticleRead]: "Read Articles (deprecated)",
  [Resource.UserManage]: "Manage Users (full)",

  // Articles
  [Resource.ArticleDraft]: "Draft Articles",
  [Resource.ArticlePublished]: "Published Articles",
  [Resource.ArticleArchived]: "Archived Articles",

  // Users
  [Resource.UserView]: "View Users",

  // Content management
  [Resource.CategoryManage]: "Manage Categories",
  [Resource.TagManage]: "Manage Tags",

  // Media
  [Resource.MediaUpload]: "Upload Media",
  [Resource.MediaManage]: "Manage Media Library",

  // Analytics
  [Resource.AnalyticsView]: "View Analytics",

  // System
  [Resource.SettingsManage]: "Manage Settings",
};

/**
 * Logical grouping of resources by domain/feature area.
 * Use this to organize resources in UI sections with collapsible panels or tabs.
 *
 * @example
 * ```typescript
 * Object.entries(ResourceGroups).map(([groupName, resources]) => (
 *   <Section title={groupName}>
 *     {resources.map(resource => (
 *       <PermissionCheckbox resource={resource} />
 *     ))}
 *   </Section>
 * ))
 * ```
 */
export const ResourceGroups = {
  /**
   * Article-related resources organized by content lifecycle status.
   */
  Articles: [
    Resource.ArticleDraft,
    Resource.ArticlePublished,
    Resource.ArticleArchived,
  ],

  /**
   * Content organization and media management resources.
   */
  "Content Management": [
    Resource.CategoryManage,
    Resource.TagManage,
    Resource.MediaUpload,
    Resource.MediaManage,
  ],

  /**
   * User and role management resources.
   */
  Users: [Resource.UserView, Resource.UserManage],

  /**
   * Analytics and reporting resources.
   */
  Analytics: [Resource.AnalyticsView],

  /**
   * System-wide configuration and settings.
   */
  System: [Resource.SettingsManage],
} as const;

/**
 * Type representing the keys of ResourceGroups for type-safe group names.
 *
 * @example
 * ```typescript
 * function renderGroup(groupName: ResourceGroupName) {
 *   const resources = ResourceGroups[groupName];
 *   // ...
 * }
 * ```
 */
export type ResourceGroupName = keyof typeof ResourceGroups;

/**
 * Context-specific permission labels for each resource.
 * These provide user-friendly labels instead of generic CRUD terms.
 *
 * For example, "Create" for ArticlePublished becomes "Publish Articles",
 * and "Create" for MediaUpload becomes "Upload Files".
 *
 * Only permissions that are applicable to a resource are included.
 * This allows the UI to only show relevant checkboxes.
 */
export const ResourcePermissionLabels: Record<Resource, Partial<Record<Permission, string>>> = {
  // Draft Articles - full CRUD for managing unpublished content
  [Resource.ArticleDraft]: {
    [Permission.Create]: "Create Drafts",
    [Permission.Read]: "View Drafts",
    [Permission.Update]: "Edit Drafts",
    [Permission.Delete]: "Delete Drafts",
  },
  // Published Articles - "Create" means publish, "Delete" means unpublish
  [Resource.ArticlePublished]: {
    [Permission.Create]: "Publish Articles",
    [Permission.Read]: "View Published",
    [Permission.Update]: "Edit Published",
    [Permission.Delete]: "Unpublish",
  },
  // Archived Articles - "Create" means archive
  [Resource.ArticleArchived]: {
    [Permission.Create]: "Archive Articles",
    [Permission.Read]: "View Archived",
    [Permission.Update]: "Edit Archived",
    [Permission.Delete]: "Delete Archived",
  },
  // User View - read-only access to user list
  [Resource.UserView]: {
    [Permission.Read]: "View User List",
  },
  // User Management - full user administration
  [Resource.UserManage]: {
    [Permission.Create]: "Invite Users",
    [Permission.Read]: "View User Details",
    [Permission.Update]: "Edit Users & Roles",
    [Permission.Delete]: "Deactivate Users",
  },
  // Category Management
  [Resource.CategoryManage]: {
    [Permission.Create]: "Create Categories",
    [Permission.Read]: "View Categories",
    [Permission.Update]: "Edit Categories",
    [Permission.Delete]: "Delete Categories",
  },
  // Tag Management
  [Resource.TagManage]: {
    [Permission.Create]: "Create Tags",
    [Permission.Read]: "View Tags",
    [Permission.Update]: "Edit Tags",
    [Permission.Delete]: "Delete Tags",
  },
  // Media Upload - only create permission
  [Resource.MediaUpload]: {
    [Permission.Create]: "Upload Files",
  },
  // Media Management - manage existing media
  [Resource.MediaManage]: {
    [Permission.Read]: "View Media Library",
    [Permission.Update]: "Edit Media Details",
    [Permission.Delete]: "Delete Media",
  },
  // Analytics - read-only
  [Resource.AnalyticsView]: {
    [Permission.Read]: "View Analytics",
  },
  // Settings - view and modify
  [Resource.SettingsManage]: {
    [Permission.Read]: "View Settings",
    [Permission.Update]: "Change Settings",
  },
  // Legacy resources (deprecated - empty means hidden in UI)
  [Resource.ArticleCreate]: {},
  [Resource.ArticleRead]: {},
};

/**
 * Returns which permissions are available for a given resource.
 * Used to only show relevant checkboxes in the UI.
 *
 * @param resource - The resource to get available permissions for
 * @returns Array of permissions that apply to this resource
 *
 * @example
 * ```typescript
 * getAvailablePermissions(Resource.MediaUpload) // [Permission.Create]
 * getAvailablePermissions(Resource.ArticleDraft) // [Permission.Create, Permission.Read, Permission.Update, Permission.Delete]
 * ```
 */
export function getAvailablePermissions(resource: Resource): Permission[] {
  const labels = ResourcePermissionLabels[resource];
  return Object.keys(labels) as Permission[];
}
