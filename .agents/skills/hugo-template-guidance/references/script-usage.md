# Script Usage

Package manager is **`pnpm`**. This reference assumes project-setup (see `references/detect-mode.md` for the one-time `pnpm project-setup` conversion).

## Dev & Build

| Command         | Does                                                      |
| ---------------- | ----------------------------------------------------------- |
| `pnpm dev`      | `themeGenerator.js --watch` + `hugo server` concurrently |
| `pnpm build`    | `themeGenerator.js` then `hugo --gc --minify`            |
| `pnpm preview`  | production-flavored local server                         |

**Never run bare `hugo server`** — it skips `themeGenerator.js`, leaving `generated-theme.css` stale and colors/fonts broken.

## Modules & Maintenance

| Command                 | Does                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `pnpm update-modules`   | `clearModules.js` + `hugo mod clean --all` / `get -u ./...` / `tidy` |
| `pnpm update-theme`     | pull latest theme updates from upstream                              |
| `pnpm remove-darkmode`  | **permanently** strips dark mode, then `pnpm format`                 |
| `pnpm remove-multilang` | **permanently** strips multilingual scaffolding                      |
| `pnpm format`           | Prettier (Go-template + Tailwind plugins)                            |

`remove-*` are destructive and not cleanly reversible — confirm + commit first.

## `scripts/`

`themeGenerator.js` (theme.json → generated-theme.css, `--watch`; never bypass) · `projectSetup.js`/`themeSetup.js` (mode switches, see `references/detect-mode.md`) · `themeUpdate.js` · `clearModules.js` · `removeDarkmode.js`/`removeMultilang.js`.

## DO NOT

- Run `hugo server` directly — use `pnpm dev`.
- Hand-edit `generated-theme.css` / `hugo_stats.json` — edit `data/theme.json`, let the generator run.
- Move files between modes manually — use `pnpm project-setup` / `pnpm theme-setup`.
- Run `remove-darkmode`/`remove-multilang` casually — they rewrite source permanently.
