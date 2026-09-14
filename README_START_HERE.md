# Eggy --- Codex Starter Pack

This folder contains the product context and first implementation prompt
for Eggy.

## Files

### `EGGY_CONTEXT.md`

The durable product and technical source of truth.

Give this file to Codex as project context and keep it in the
repository. Update it when major product decisions change.

### `CODEX_MILESTONE_01.md`

The first implementation task.

It asks Codex to build the complete mocked vertical slice:

Home → suggestions → ingredients → cooking → timers → Ask Eggy →
completion → saved recipes.

## Recommended usage

Create/open the Eggy repository in Codex and include these files at the
repository root:

``` text
EGGY_CONTEXT.md
CODEX_MILESTONE_01.md
```

Then instruct Codex:

> Read `EGGY_CONTEXT.md` and execute `CODEX_MILESTONE_01.md`. Inspect
> the repository first, then implement the milestone and validate the
> result.

Do not add a real AI API key during this milestone.

Once milestone 1 is working on-device, the next task should introduce
the real AI service layer and a secure backend boundary.
