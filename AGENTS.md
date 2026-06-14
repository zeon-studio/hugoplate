<!-- BEGIN:hugo-agent-rules -->

# Hugo: verify against docs, not memory

Treat <https://gohugo.io/documentation/> as truth. Two project specifics your training data gets wrong:

1. **New template system** (Hugo 0.146+): partials in `layouts/_partials/`, homepage is `home.html`, `baseof.html` is top-level. Never "fix" to `partials/`, `index.html`, or `_default/baseof.html`.
2. **Tailwind CSS v4**, CSS-first via `@theme`/`data/theme.json` -> `generated-theme.css`, imported in `assets/css/main.css`. No `tailwind.config.js`.

<!-- END:hugo-agent-rules -->

<!-- BEGIN:package-manager-rules -->

# Detect the package manager — don't assume pnpm

Commands below use `<pm>` as a placeholder for this project's package manager:

1. `package.json` → `"packageManager"` field, if present — authoritative.
2. Otherwise, a lock file in the project root: `pnpm-lock.yaml` → `pnpm`, `package-lock.json` → `npm`, `yarn.lock` → `yarn`, `bun.lock`/`bun.lockb` → `bun`.
3. No lock file yet (deps not installed) → default to **yarn**.

<!-- END:package-manager-rules -->

<!-- BEGIN:setup-mode-detection-rules -->

# Detect setup mode, then convert to project-setup FIRST before changing or reading anything, after project-setup check the edge case rules

This theme ships in two structures; the same logical file lives at a different path in each. Detect before touching anything:

- **`exampleSite/hugo.toml` exists → theme-setup** — theme at root (`layouts/`, `assets/`, `theme.toml`), demo site in `exampleSite/`.
- **Root `hugo.toml` + `themes/` → project-setup** — site at root (`content/`, `config/`, `data/`, `hugo.toml`), theme vendored in `themes/<theme>/` (the single folder under `themes/` — run `ls themes/` to confirm its name; in this repo it's `hugoplate`).

### Edge case

If all of the following are true:

- `exampleSite/` exists
- `themes/<theme>/` exists
- `exampleSite/hugo.toml` is the active Hugo config
- `themes/<theme>/layouts/home.html` does **not** exist

then treat the repository as **theme-setup**, not **project-setup**. So Before running `<pm> project-setup` or `<pm> dev` ask user if they want to delete the `themes/` directory and run `<pm> project-setup` to convert to project-setup, deleting `themes/` is required otherwise when running `<pm> project-setup`, it will detect current mode as `project-setup` which is false.

**Always work in project-setup.** If the repo is currently in theme-setup, run `<pm> project-setup` BEFORE editing any content, config, layout, or style file — this is non-negotiable. The script is idempotent (it logs "Project already setup" and no-ops if already converted), so it's always safe to run. Never move files between modes by hand — only `<pm> project-setup` / `<pm> theme-setup` (reverse).

Full detail and path-resolution table: `template-guidance` skill → `references/detect-mode.md`.

<!-- END:setup-mode-detection-rules -->

<!-- BEGIN:preflight-checks-rules -->

# Pre-flight checks before running, starting or reading the project in **project-setup**

Before `<pm> install` / `<pm> dev` / `<pm> build` / `<pm> preview` (or any other request to run/build/preview the project), verify all of:

1. **Setup mode** — project-setup (see above); run `<pm> project-setup` first if not.
2. **Node** — `node -v` succeeds.
3. **Hugo Extended, version == `HUGO_VERSION` in `netlify.toml`** — read `[build.environment].HUGO_VERSION` from `netlify.toml`; run `hugo version` and confirm output contains `extended` AND the version matches **exactly** (not just `>=`).
4. **Package manager (`<pm>`)** — see package-manager detection above; confirm `<pm> -v` succeeds.

   If any check fails — tool missing, Hugo not the extended build, or Hugo version doesn't match `HUGO_VERSION` from `netlify.toml` — **stop and ask the user to install/upgrade it**; don't try to work around it. Recommend [mise](https://mise.jdx.dev/) also ask user to run `eval "$(mise activate zsh)"` to activate the correct environment after installing hugo version with mise.

- Install mise if missing (see mise's install docs for the OS).
- Version mismatch (wrong version or not extended) → `mise use hugo-extended@<HUGO_VERSION>` using the value from `netlify.toml` (currently `mise use hugo-extended@0.160.0`) — installs and pins the exact build this project requires.
- Node and package manager: `mise use node@lts` and `mise use <pm>@latest` (or the user's existing version manager).

<!-- END:preflight-checks-rules -->

<!-- BEGIN:running-the-project-rules -->

# Running the project

**Even for a plain "run/build/preview the project" request**: run the pre-flight checks above first. If the repo is in theme-setup, run `<pm> project-setup` first, then use the project-setup commands below — don't reach for the `:example` scripts as a shortcut to avoid converting.

Package manager is `<pm>` (see package-manager detection above). Always use these scripts — never run bare `hugo`/`hugo server`.

| Command        | Use                                                               |
| -------------- | ----------------------------------------------------------------- |
| `<pm> install` | install dependencies (first run / after pulling)                  |
| `<pm> dev`     | dev server with live theme regen, default `http://localhost:1313` |
| `<pm> build`   | production build to `public/`                                     |
| `<pm> preview` | production-flavored local server                                  |

The `dev:example` / `build:example` / `preview:example` variants exist only for theme-setup (running against `exampleSite/`) — once converted via `<pm> project-setup`, they no longer apply.

## Restart the dev server after changes

After changing content, code, or layouts etc., restart it:

```sh
npx kill-port 1313 -y && <pm> dev
```

<!-- END:running-the-project-rules -->

<!-- BEGIN:template-guidance-rules -->

# Read template guidance before changing or reading structure

Before modifying or reading structure, styles, pages, config, content, or scripts, trigger the `template-guidance` skill for the relevant reference so you follow project conventions (modes, theme tokens, Hugo Modules, the theme generator, adding languages).

<!-- END:template-guidance-rules -->
