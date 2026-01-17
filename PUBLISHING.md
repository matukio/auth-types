# Publishing Guide

This package uses GitHub Actions to automatically publish to npm when version tags are pushed.

## Prerequisites

### 1. Create npm Access Token

You need to create an npm access token and add it to GitHub secrets:

1. **Login to npm**: https://www.npmjs.com
2. **Go to Access Tokens**: Click your profile → Access Tokens
3. **Generate New Token**:
   - Click "Generate New Token" → "Granular Access Token"
   - **Token name**: `github-actions-matukio-auth-types`
   - **Expiration**: 90 days (or custom)
   - **Packages and scopes**: Select "Read and write"
   - **Select packages**: Choose `@matukio/auth-types` (or "All packages")
   - Click "Generate Token"
4. **Copy the token** (you won't see it again!)

### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/matukio/auth-types
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. **Name**: `NPM_TOKEN`
5. **Secret**: Paste your npm token
6. Click **Add secret**

## Publishing Process

### Step 1: Make Your Changes

Make your code changes and commit them to the `main` branch:

```bash
git add .
git commit -m "Add new feature"
git push origin main
```

### Step 2: Bump the Version

Use npm's built-in versioning commands:

```bash
# For bug fixes (0.1.0 → 0.1.1)
npm version patch

# For new features (0.1.0 → 0.2.0)
npm version minor

# For breaking changes (0.1.0 → 1.0.0)
npm version major
```

This will:
- Update the version in `package.json`
- Create a git commit with the version change
- Create a git tag (e.g., `v0.1.1`)

### Step 3: Push Tags

```bash
git push origin main --tags
```

### Step 4: GitHub Actions Takes Over

Once you push the tag, GitHub Actions will automatically:
1. ✅ Checkout the code
2. ✅ Install dependencies
3. ✅ Run type checking
4. ✅ Build the package
5. ✅ Publish to npm with provenance

### Step 5: Monitor the Workflow

1. Go to: https://github.com/matukio/auth-types/actions
2. Click on the latest "Publish to npm" workflow
3. Watch the progress and check for any errors

## Semantic Versioning Guide

Follow [Semantic Versioning](https://semver.org/):

### Pre-1.0 (Current: 0.x.x)
- **Patch** (0.1.0 → 0.1.1): Bug fixes, typos, small corrections
- **Minor** (0.1.0 → 0.2.0): New features, breaking changes OK
- **Major** (0.9.0 → 1.0.0): First stable release

### Post-1.0 (Future: 1.x.x)
- **Patch** (1.0.0 → 1.0.1): Backwards-compatible bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backwards-compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Quick Reference

```bash
# Complete publishing workflow
git add .
git commit -m "Your changes"
git push origin main

npm version patch   # or minor, or major
git push origin main --tags

# Wait for GitHub Actions to publish
# Check: https://github.com/matukio/auth-types/actions
```

## Troubleshooting

### Workflow fails with "ENEEDAUTH"
- Check that `NPM_TOKEN` secret is set in GitHub
- Token may have expired (regenerate every 90 days)

### Workflow fails with "403 Forbidden"
- Token doesn't have publish permissions
- Package name may already be taken
- You may need to create `@matukio` organization on npm

### Wrong version published
- Delete the tag: `git tag -d v0.1.1 && git push origin :refs/tags/v0.1.1`
- Bump version correctly and push again

## First Time Publishing

If this is the first time publishing `@matukio/auth-types`:

1. You may need to create the `@matukio` organization on npm:
   - Go to https://www.npmjs.com
   - Click "Add Organization"
   - Name it `matukio`

2. OR publish under your username instead:
   - Change package name in `package.json` to `@robertkibet/auth-types`
   - Update repository URLs accordingly

## Security Notes

- ✅ npm tokens are stored securely in GitHub Secrets
- ✅ Tokens have limited permissions (only this package)
- ✅ Provenance enabled (shows package was built on GitHub)
- ✅ Workflow only runs on tag push (controlled access)
- 🔄 Remember to rotate tokens every 90 days
