import type { Role } from "./roles.js";

/**
 * Interface representing a user in the system.
 * Each user can have one or more roles assigned.
 */
export interface User {
  id: string;       // Unique user identifier
  email: string;    // User email
  roles: Role[];    // Array of roles assigned to the user
  isActive: boolean; // Whether the user account is active
}
