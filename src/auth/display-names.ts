import { Resource } from "./resources.js";
import { RoleName } from "./role-names.js";

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
