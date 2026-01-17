# Publishing Guide

This package uses GitHub Actions to automatically publish to npm when the version in `package.json` changes on the `main` branch.

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

### Option 1: Direct to Main (For Maintainers)

1. **Update the version** in `package.json`:
   ```bash
   # Edit package.json and change version from "0.1.0" to "0.1.1"
   ```

2. **Commit and push**:
   ```bash
   git add package.json
   git commit -m "Bump version to 0.1.1"
   git push origin main
   ```

3. **Done!** GitHub Actions detects the version change and automatically publishes.

### Option 2: Via Pull Request (Recommended for Teams)

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** and update version in `package.json`:
   ```json
   {
     "version": "0.1.1",
     ...
   }
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new feature and bump version"
   git push origin feature/my-new-feature
   ```

4. **Create Pull Request** on GitHub

5. **Review and merge** to `main`

6. **Auto-publish!** Once merged, GitHub Actions detects the version change and publishes.

## How It Works

The workflow:
1. Triggers on every push to `main`
2. Checks if `package.json` version changed in the commit
3. If changed: runs type check, builds, and publishes to npm
4. If not changed: skips publishing (regular commit)
5. Creates a git tag (e.g., `v0.1.1`) after successful publish

## Monitor the Workflow

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
# Complete publishing workflow (direct to main)
# 1. Update version in package.json to 0.1.1
# 2. Commit and push
git add package.json
git commit -m "Bump version to 0.1.1"
git push origin main

# GitHub Actions automatically publishes!
# Check: https://github.com/matukio/auth-types/actions
```

## Troubleshooting

### Workflow runs but doesn't publish
- Check that the version in `package.json` actually changed
- Compare with the previous commit to ensure the version is different
- View workflow logs: https://github.com/matukio/auth-types/actions

### Workflow fails with "ENEEDAUTH"
- Check that `NPM_TOKEN` secret is set in GitHub
- Token may have expired (regenerate every 90 days)

### Workflow fails with "403 Forbidden"
- Token doesn't have publish permissions
- Package name may already be taken
- You may need to create `@matukio` organization on npm

### Wrong version published
- You cannot unpublish recent versions from npm (within 72 hours, special rules apply)
- Instead, publish a new patch version with the fix
- Use `npm deprecate @matukio/auth-types@0.1.1 "Accidental publish, use 0.1.2"` if needed

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

- npm tokens are stored securely in GitHub Secrets
- Tokens have limited permissions (only this package)
- Provenance enabled (shows package was built on GitHub)
- Workflow only runs on tag push (controlled access)
- Remember to rotate tokens every 90 days
