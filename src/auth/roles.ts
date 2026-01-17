import { Resource } from "./resources.js";
import { Permission } from "./permissions.js";
import { RoleName } from "./role-names.js";

/**
 * Interface representing a role in the system.
 * Each role has a unique id, a standardized name from the RoleName enum,
 * and a mapping of resources to permissions.
 *
 * The resources mapping defines what actions (permissions) the role can perform
 * on each resource. An absent resource means no access.
 */
export interface Role {
  /**
   * Unique identifier for the role instance.
   * This allows multiple instances of the same role type with different permissions.
   */
  id: string;

  /**
   * Standardized role name from the RoleName enum.
   * Ensures type safety and consistency across the application.
   */
  name: RoleName;

  /**
   * Mapping of resources to allowed permissions.
   * Only includes resources the role has access to.
   * Missing resources indicate no access.
   *
   * @example
   * ```typescript
   * {
   *   [Resource.ArticleDraft]: [Permission.Read, Permission.Write],
   *   [Resource.MediaUpload]: [Permission.Write]
   * }
   * ```
   */
  resources: Partial<Record<Resource, Permission[]>>;
}
