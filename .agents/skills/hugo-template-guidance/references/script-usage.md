# Script Usage

This reference assumes project-setup (see `references/detect-mode.md` for the one-time project-setup conversion).

## Package Manager

**Detect before running anything — don't assume `pnpm`.**

1. `package.json` → `"packageManager"` field (e.g. `"pnpm@9.x"`), if present — authoritative.
2. Otherwise, check the project root for a lock file:

   | Lock file                | Package manager |
   | ------------------------ | --------------- |
   | `pnpm-lock.yaml`         | `pnpm`          |
   | `package-lock.json`      | `npm`           |
   | `yarn.lock`              | `yarn`          |
   | `bun.lock` / `bun.lockb` | `bun`           |

3. No lock file (deps not installed yet) → default to `yarn`.

Everything below uses `<pm>` for whatever you detected. Run syntax differs:

- `pnpm` / `yarn` / `bun`: `<pm> <script>` (e.g. `pnpm dev`, `yarn dev`, `bun dev`)
- `npm`: `npm run <script>` — npm requires `run` for custom scripts

## Dev & Build

| Command        | Does                                                     |
| -------------- | -------------------------------------------------------- |
| `<pm> dev`     | `themeGenerator.js --watch` + `hugo server` concurrently |
| `<pm> build`   | `themeGenerator.js` then `hugo --gc --minify`            |
| `<pm> preview` | production-flavored local server                         |

**Never run bare `hugo server`** — it skips `themeGenerator.js`, leaving `generated-theme.css` stale and colors/fonts broken.

## Modules & Maintenance

| Command                 | Does                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `<pm> update-modules`   | `clearModules.js` + `hugo mod clean --all` / `get -u ./...` / `tidy` |
| `<pm> update-theme`     | pull latest theme updates from upstream                              |
| `<pm> remove-darkmode`  | **permanently** strips dark mode, then `<pm> format`                 |
| `<pm> remove-multilang` | **permanently** strips multilingual scaffolding                      |
| `<pm> format`           | Prettier (Go-template + Tailwind plugins)                            |

`remove-*` are destructive and not cleanly reversible — confirm + commit first.

## DO NOT

- Run `hugo server` directly — use `<pm> dev`.
- Hand-edit `generated-theme.css` / `hugo_stats.json` — edit `data/theme.json`, let the generator run.
- Move files between modes manually — use `<pm> project-setup` / `<pm> theme-setup`.
- Run `remove-darkmode`/`remove-multilang` casually — they rewrite source permanently.
