---
description: Initialize workspace context by scanning the n8n monorepo and producing a project overview
---

# /init Workflow

// turbo-all

## Steps

1. Read `CLAUDE.md` at project root to understand coding conventions and project overview.
2. Read `package.json` at project root for scripts, dependencies, and engine requirements.
3. List `packages/` and `packages/@n8n/` directories to map all workspace packages.
4. Read `pnpm-workspace.yaml` for workspace configuration and catalog versions.
5. Read `turbo.json` for build orchestration settings.
6. Check `.node-version` for required Node.js version.
7. Produce a concise project context summary for the user, including:
   - Tech stack overview
   - Key packages and their roles
   - Essential commands (build, test, lint, dev)
   - Architectural patterns
   - Coding conventions and constraints