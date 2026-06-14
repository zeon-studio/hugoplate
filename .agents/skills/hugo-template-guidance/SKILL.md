---
name: hugo-template-guidance
description: Use whenever you need to understand how this theme works — adding pages, managing content, configuring the site, using partials/components/modules, project architecture, scripts, or styling/theming (Tailwind v4, Bootstrap 5, or a hybrid — verify which). Use for ANY question about the structure, usage, or customization of the template or theme.
---

# Template Guidance

Handbook for this theme (Hugo Extended + Hugo Modules; styling is Tailwind v4, Bootstrap 5, or a hybrid — verify before assuming), assuming the standard **project-setup** layout (site at root, theme vendored in `themes/<theme>/` — the single folder under `themes/`; see `references/detect-mode.md` to find its name). Progressive disclosure: **read the matching `references/` file before acting.**

> If `exampleSite/hugo.toml` exists, the repo is still in theme-setup — run `<pm> project-setup` first (see `references/detect-mode.md`) before using anything below.
>
> **Package manager:** `<pm>` is a placeholder for this project's package manager. Detect it from a lock file (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lock`/`bun.lockb`) or `package.json`'s `packageManager` field before running any command below — don't assume `pnpm`. Details: `references/script-usage.md`.

## Routing Guide

| Request                                                        | Read                                 |
| -------------------------------------------------------------- | ------------------------------------ |
| Detect or convert setup mode (theme-setup vs project-setup)    | `references/detect-mode.md`          |
| pre-flight checks (Node, Hugo version, package manager)        | `references/preflight-checks.md`     |
| Architecture, folder layout, data flow                         | `references/project-architecture.md` |
| Add a page, route, or homepage section                         | `references/adding-new-pages.md`     |
| Partials, components, shortcodes, Hugo Modules                 | `references/component-usage.md`      |
| Add, remove, or enable a Hugo Module (`module.toml`)           | `references/hugo-modules.md`         |
| Markdown content, frontmatter, taxonomies                      | `references/content-management.md`   |
| Add/configure a new language, multilingual, i18n, translate    | `references/i18n-guidance.md`        |
| Site config, menus, social, feature toggles, SEO               | `references/page-configuration.md`   |
| Package manager detection, scripts, generators, module updates | `references/script-usage.md`         |
| Styling/theming (Tailwind v4, Bootstrap 5, or hybrid — verify first), dark mode, design tokens | `references/styling-and-theming.md`  |

## Steps

1. Read the matching reference.
2. Follow it.
