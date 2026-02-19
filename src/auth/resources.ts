/**
 * Defines all the resources that roles can have access to.
 * Resources are granular permission targets organized by feature and status.
 *
 * Article resources are separated by status (draft, published, archived) to enable
 * fine-grained access control. For example, Contributors can write to ArticleDraft
 * but only Publishers can write to ArticlePublished.
 */
export enum Resource {
  // Legacy resources (maintained for backward compatibility)
  /**
   * @deprecated Use ArticleDraft or ArticlePublished instead for granular control
   */
  ArticleCreate = "art_create",

  /**
   * @deprecated Use ArticlePublished with Read permission instead
   */
  ArticleRead = "art_read",

  /**
   * User management - full CRUD access to users and role assignments.
   * Use UserView for read-only access to user lists.
   */
  UserManage = "user_manage",

  // Article resources by status
  /**
   * Draft articles - unpublished content in progress.
   * Authors and Contributors create drafts, Reviewers can edit them.
   */
  ArticleDraft = "article_draft",

  /**
   * Published articles - live content visible to readers.
   * Publishers control what gets published, Editors can modify live content.
   */
  ArticlePublished = "article_published",

  /**
   * Archived articles - removed from public view but retained.
   * Typically only Admins and Editors can access archived content.
   */
  ArticleArchived = "article_archived",

  // User management resources
  /**
   * View user list and profiles.
   * Allows viewing user information without modification rights.
   */
  UserView = "user_view",

  // Content management resources
  /**
   * Manage article categories.
   * Create, edit, delete, and organize categories for article classification.
   */
  CategoryManage = "category_manage",

  /**
   * Manage article tags.
   * Create, edit, delete tags for article metadata and filtering.
   */
  TagManage = "tag_manage",

  // Media management resources
  /**
   * Upload new media files.
   * Authors can upload media for their articles, Editors can upload site-wide.
   */
  MediaUpload = "media_upload",

  /**
   * Manage media library.
   * Organize, delete, and modify existing media files.
   */
  MediaManage = "media_manage",

  // Analytics and reporting
  /**
   * View site analytics and reports.
   * Access to traffic data, article performance metrics, and user statistics.
   */
  AnalyticsView = "analytics_view",

  // System configuration
  /**
   * Manage system settings.
   * Configure site-wide settings, integrations, and system parameters.
   */
  SettingsManage = "settings_manage",
}
