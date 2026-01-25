# Auth Types Library

## Overview

`@matukio/auth-types` is a shared TypeScript types library for authentication and role-based access control (RBAC). This package provides type-safe definitions for users, roles, permissions, and resources used across the Matukio platform.

## Tech Stack

- **TypeScript 5.9+** - Pure TypeScript library with no runtime dependencies
- **Target**: ES2022+ with module output
- **Package Manager**: npm
- **Build Tool**: TypeScript compiler (tsc)

## Project Structure

```
auth-types/
├── src/
│   ├── index.ts              # Main entry point, re-exports all types
│   └── auth/
│       ├── index.ts          # Auth domain exports
│       ├── user.ts           # User interface definitions
│       ├── roles.ts          # Role interface and types
│       ├── permissions.ts    # Permission enum (Read, Write, Delete)
│       ├── resources.ts      # Resource enum (12 resources)
│       ├── role-names.ts     # RoleName enum (7 predefined roles)
│       ├── helpers.ts        # Utility functions for default permissions
│       └── display-names.ts  # UI metadata (display names, groups)
├── package.json
├── tsconfig.json
└── README.md
```

## Core Concepts

### 1. Resources (12 total)
Resources represent entities that can be accessed/modified:
- **Articles**: ArticleDraft, ArticlePublished, ArticleArchive
- **Content**: Category, Tag, Media
- **System**: Comment, UserView, UserManage, Analytics, SiteSettings, Workflow

### 2. Permissions (3 types)
- `Read` - View/list resources
- `Write` - Create/update resources
- `Delete` - Remove resources

### 3. Roles (7 predefined)
- **Admin** - Full access to everything (special handling - always has all permissions)
- **Editor** - Manage published content
- **Author** - Create and edit drafts
- **Viewer** - Read-only access
- **Contributor** - Submit drafts for review
- **Publisher** - Publish approved content
- **Reviewer** - Review and approve submissions

### 4. Permission Model
Permissions are stored as:
```typescript
{
  [resource: string]: Permission[]
}
```
Example: `{ "article_draft": ["read", "write"], "category": ["read"] }`

## Key Interfaces

### User
```typescript
interface User {
  id: string;
  email: string;
  roles: Role[];
  isActive: boolean;
}
```

### Role
```typescript
interface Role {
  name: RoleName;
  resourcePermissions: ResourcePermissions | null; // null for Admin
}
```

### ResourcePermissions
```typescript
type ResourcePermissions = {
  [key in Resource]?: Permission[];
};
```

## Utility Functions

### `getDefaultRolePermissions(roleName: RoleName): ResourcePermissions`
Returns the default permission set for a given role.

### `getAdminRole(): Role`
Returns the Admin role with full permissions.

### `getAllResources(): Resource[]`
Returns array of all resource enums.

### `getAllPermissions(): Permission[]`
Returns array of all permission enums.

## Coding Patterns

### 1. Enum-Based Type Safety
All roles, resources, and permissions use enums for type safety:
```typescript
enum Resource {
  ArticleDraft = 'article_draft',
  Category = 'category',
  // ...
}
```

### 2. No Runtime Dependencies
This is a pure types library. All exports are either:
- Type definitions (`interface`, `type`)
- Enums (compile to objects in JS)
- Pure functions with no external dependencies

### 3. Centralized Exports
All types are exported through `src/index.ts` for clean imports:
```typescript
import { User, Role, Permission, Resource } from '@matukio/auth-types';
```

### 4. Display Metadata Separation
UI-specific metadata (display names, groupings) is separated from core types in `display-names.ts`.

## Development Workflow

### Building
```bash
npm run build  # Compiles to dist/
```

### Publishing
```bash
npm version patch|minor|major
npm publish
```

### Usage in Other Projects
```bash
npm install @matukio/auth-types
```

```typescript
import { User, Role, Permission, Resource, RoleName } from '@matukio/auth-types';
```

## Important Notes

1. **Admin Role Special Handling**: Admin always has full permissions. In database, Admin role has `resourcePermissions: null`. Use `getAdminRole()` helper for runtime checks.

2. **Immutability**: These types define the contract. Changing enums is a breaking change that requires version bump.

3. **Backend Sync**: The backend (NestJS API) imports these types directly. Any changes here must be compatible with backend implementation.

4. **Version Compatibility**: Backend `package.json` should pin to specific auth-types version to avoid runtime mismatches.

## When Making Changes

- **Adding a new Resource**:
  1. Add to `Resource` enum in `resources.ts`
  2. Add display name in `display-names.ts`
  3. Update default role permissions in `helpers.ts`
  4. Bump minor version

- **Adding a new Role**:
  1. Add to `RoleName` enum in `role-names.ts`
  2. Add display name in `display-names.ts`
  3. Add default permissions in `helpers.ts`
  4. Update backend seed data
  5. Bump minor version

- **Adding a new Permission**:
  1. Add to `Permission` enum in `permissions.ts`
  2. Update all relevant role defaults in `helpers.ts`
  3. Bump major version (breaking change)

## Testing Strategy

Currently no unit tests (pure types). Validation happens at:
1. **Compile time**: TypeScript type checking
2. **Runtime**: Backend integration tests verify type contracts
3. **Manual**: Version compatibility testing with backend

## Related Files

- Backend API: `backend-api/` - Consumes these types
- Frontend: Should also import this package for type safety
