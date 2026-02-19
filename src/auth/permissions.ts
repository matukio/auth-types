/**
 * Defines the types of permissions available for resources.
 * Maps directly to CRUD operations and HTTP methods.
 */
export enum Permission {
  Create = "create", // POST - create new resources
  Read = "read",     // GET - view/list resources
  Update = "update", // PUT/PATCH - modify existing resources
  Delete = "delete", // DELETE - remove resources
}
