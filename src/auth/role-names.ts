/**
 * Defines the fixed set of roles available in the system.
 * These roles represent different levels of access and capabilities for an article website.
 * Admins configure which resources each role can access, but cannot create custom role names.
 */
export enum RoleName {
  /**
   * Full system administrator with unrestricted access to all resources.
   * Can manage users, configure system settings, and perform all operations.
   */
  Admin = "admin",

  /**
   * Content editor who can manage all articles and content regardless of author.
   * Can edit/delete any article, manage categories, tags, and media library.
   */
  Editor = "editor",

  /**
   * Article author who can create and manage their own content.
   * Can create articles, upload media for own articles, and edit own drafts.
   */
  Author = "author",

  /**
   * Read-only user with access to published content.
   * Can view published articles and analytics but cannot make modifications.
   */
  Viewer = "viewer",

  /**
   * Content contributor who can submit drafts for review.
   * Can create draft articles but cannot publish or edit after submission.
   */
  Contributor = "contributor",

  /**
   * Publishing manager who can approve and publish reviewed content.
   * Can publish articles from draft to published status and archive articles.
   */
  Publisher = "publisher",

  /**
   * Content reviewer who can review and approve contributor submissions.
   * Can edit and approve drafts submitted by contributors.
   */
  Reviewer = "reviewer",
}
