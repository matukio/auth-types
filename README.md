# @matukio/auth-types

TypeScript types for authentication and authorization, including roles, permissions, resources, and user interfaces. This package ensures type safety across frontend and backend when implementing access control rules.

## Installation

```bash
npm install @matukio/auth-types
```

## Usage

### Basic Import

```typescript
import { User, Role, Permission, Resource } from '@matukio/auth-types';

// Define a user with roles
const user: User = {
  id: '123',
  email: 'user@example.com',
  roles: [
    {
      id: 'editor',
      name: 'Editor',
      resources: {
        [Resource.ArticleCreate]: [Permission.Read, Permission.Write],
        [Resource.ArticleRead]: [Permission.Read]
      }
    }
  ]
};
```

### Available Types

#### `User`
Represents a user in the system with assigned roles.

```typescript
interface User {
  id: string;       // Unique user identifier
  email: string;    // User email
  roles: Role[];    // Array of roles assigned to the user
}
```

#### `Role`
Defines a role with resource-based permissions.

```typescript
interface Role {
  id: string;       // Unique identifier for the role
  name: string;     // Human-readable role name
  resources: Partial<Record<Resource, Permission[]>>;  // Resource -> allowed permissions
}
```

#### `Permission` (Enum)
Available permission types:
- `Permission.Read` - Read access to a resource
- `Permission.Write` - Write/modify access to a resource
- `Permission.Delete` - Delete access to a resource

#### `Resource` (Enum)
Available resources in the system:
- `Resource.ArticleCreate` - Article creation resource
- `Resource.ArticleRead` - Article reading resource
- `Resource.UserManage` - User management resource

## Development

```bash
# Type check without building
npm run type-check

# Build the package
npm run build

# Clean build artifacts
npm run clean
```

## Publishing

This package is automatically published to npm via GitHub Actions when version tags are pushed. See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

**Quick publish:**
```bash
npm version patch  # or minor/major
git push origin main --tags
```

## Extensibility

Future domains (e.g., billing, analytics) can be added as separate modules within this package while maintaining backward compatibility.

## License

MIT