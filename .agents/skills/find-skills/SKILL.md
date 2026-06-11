---
name: find-skills
description: Helps users discover and install agent skills when they ask "how do I do X", "find a skill for X", "is there a skill that can...", or want to extend capabilities.
---

# Find Skills

Discover and install skills from the open agent-skills ecosystem.

## When to use

User asks "how do I do X" / "find a skill for X" / "can you do X", wants to search tools or workflows, or wishes for help in a domain (design, testing, deployment…).

## Skills CLI (`npx skills`)

- `npx skills find [query]` — search
- `npx skills add <owner/repo@skill> -g -y` — install (`-g` global, `-y` no prompt)
- `npx skills check` / `update` — updates
- Browse: https://skills.sh/

## How to help

1. **Identify** domain + specific task; judge if a skill likely exists.
2. **Check the leaderboard** (https://skills.sh/) first — ranked by installs. Known good: `vercel-labs/agent-skills`, `anthropics/skills`.
3. **Search** if needed: `npx skills find hugo seo`.
4. **Verify before recommending**: install count (prefer 1K+, wary <100), source reputation (official > unknown), GitHub stars.
5. **Present**: name + what it does, install count/source, install command, skills.sh link.
6. **Offer to install** if they want.

## Tips & fallback

Use specific keywords ("hugo seo" > "seo"); try synonyms (deploy/deployment/ci-cd). If nothing found: say so, offer to do the task directly, suggest `npx skills init` for a custom skill.
