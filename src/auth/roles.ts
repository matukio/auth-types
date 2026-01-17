import { Resource } from "./resources.js";
import { Permission } from "./permissions.js";

/**
 * Interface representing a role in the system.
 * Each role has a unique id, name, and a mapping of resources to permissions.
 */
export interface Role {
  id: string; // Unique identifier for the role
  name: string; // Human-readable role name
  resources: Partial<Record<Resource, Permission[]>>; // Resource -> allowed permissions
}
