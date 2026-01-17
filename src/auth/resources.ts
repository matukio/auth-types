/**
 * Defines all the resources that roles can have access to.
 * Example: creating or reading articles, managing users, etc.
 */

export enum Resource {
  ArticleCreate = "art_create",
  ArticleRead = "art_read",
  UserManage = "usr_manage",
}
