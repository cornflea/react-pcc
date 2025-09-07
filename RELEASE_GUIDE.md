# Semantic Release Guide

Fully automated release management with semantic-release. Zero configuration needed - just commit and push!

## How It Works

Semantic-release is now configured to **automatically handle everything** when you push to master:

- ✅ **Analyzes commits** to determine version bump
- ✅ **Generates changelog** from commit messages  
- ✅ **Creates GitHub release** with release notes
- ✅ **Publishes to npm** automatically
- ✅ **Updates package.json** version
- ✅ **Commits changes** back to repository

## Required Setup (One-time)

### 1. Add NPM_TOKEN to GitHub Secrets

1. Go to [npm tokens page](https://www.npmjs.com/settings/tokens)
2. Create a new **Automation** token
3. Copy the token
4. Go to your GitHub repository → Settings → Secrets and variables → Actions
5. Add `NPM_TOKEN` with your token value

### 2. Ensure GITHUB_TOKEN has permissions

The `GITHUB_TOKEN` is automatically provided by GitHub Actions and should have the necessary permissions.

## Creating Releases

### Use Conventional Commit Messages

```bash
# Patch release (1.0.0 → 1.0.1)
git commit -m "fix: handle edge case in package validation"

# Minor release (1.0.0 → 1.1.0)  
git commit -m "feat: add support for private registries"

# Major release (1.0.0 → 2.0.0)
git commit -m "feat!: change API interface"
# or
git commit -m "feat: major change

BREAKING CHANGE: This changes the public API"

# No release (docs, chores, tests)
git commit -m "docs: update README"
git commit -m "chore: update dependencies"
git commit -m "test: add more test cases"
```

### Push to Master

```bash
git push origin master
```

**That's it!** Everything else happens automatically:

1. ✅ GitHub Actions runs tests
2. ✅ If tests pass and there are releasable commits:
   - Version is determined automatically
   - CHANGELOG.md is updated
   - GitHub release is created
   - Package is published to npm
   - Changes are committed back

## Local Testing

```bash
# Test what would be released (requires authentication)
npm run release:dry

# Manual local release (not recommended - use CI/CD instead)
npm run release
```

## Commit Types for Releases

| Commit Type | Example | Release Type |
|-------------|---------|--------------|
| `fix:` | `fix: resolve memory leak` | Patch (1.0.0 → 1.0.1) |
| `feat:` | `feat: add new API endpoint` | Minor (1.0.0 → 1.1.0) |
| `feat!:` or `BREAKING CHANGE:` | `feat!: redesign API` | Major (1.0.0 → 2.0.0) |
| `docs:`, `test:`, `chore:` | `docs: update guide` | No release |

## What Gets Generated

- 📝 **CHANGELOG.md** - Automatically updated with all changes
- 🏷️ **Git tags** - Semantic version tags (v1.0.0, v1.1.0, etc.)
- 📦 **GitHub releases** - With auto-generated release notes
- 🚀 **NPM packages** - Published automatically

## Example Workflow

```bash
# Make changes
echo "console.log('new feature');" >> src/core.ts

# Commit with conventional message
git add .
git commit -m "feat: add awesome new feature"

# Push to trigger release
git push origin master

# Check GitHub Actions to see the release happen!
```

## Benefits

- 🔄 **Fully automated** - No manual steps needed
- 📊 **Consistent versioning** - Based on actual changes
- 📝 **Auto-generated docs** - Changelog and release notes
- 🚀 **Fast releases** - No manual intervention
- 🛡️ **Reliable** - Tests must pass before release

This is the cleanest and most professional way to handle releases!
