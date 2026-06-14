# Detect Setup Mode

This theme ships in two structures; the same logical file lives at a different path in each. **Always detect the current mode first** — before reading or editing any content, config, layout, style, or script file.

## Detection

- **`exampleSite/hugo.toml` exists → theme-setup** — theme at root (`layouts/`, `assets/`, `theme.toml`), demo site in `exampleSite/`.
- **Root `hugo.toml` + `themes/` → project-setup** — site at root (`content/`, `config/`, `data/`, `hugo.toml`), theme vendored in `themes/<theme>/` (the single folder under `themes/` — run `ls themes/` to confirm its name; in this repo it's `hugoplate`).

### Edge case

If all of the following are true:

- `exampleSite/` exists
- `themes/<theme>/` exists
- `exampleSite/hugo.toml` is the active Hugo config
- `themes/<theme>/layouts/home.html` does **not** exist

then treat the repository as **theme-setup**, not **project-setup**. So Before running `<pm> project-setup` or `<pm> dev` ask user if they want to delete the `themes/` directory and run `<pm> project-setup` to convert to project-setup, deleting `themes/` is required otherwise when running `<pm> project-setup`, it will detect current mode as `project-setup` which is false.

## Always work in `project-setup` mode

If the repo or project is currently in theme-setup, run `<pm> project-setup` **before** editing or reading any content, config, layout, or style file — this is non-negotiable.

- **Idempotent** — logs "Project already setup" and no-ops if already converted, so it's always safe to run.
- **Never move files between modes by hand** — only `<pm> project-setup` / `<pm> theme-setup` (reverse) do this correctly.
- `dev:example` / `build:example` / `preview:example` scripts exist only for theme-setup (run against `exampleSite/`). Once converted via `<pm> project-setup`, they no longer apply — don't reach for them as a shortcut to avoid converting.

## After conversion

For the full project-setup folder layout and path-resolution table, see `references/project-architecture.md`.

## Canonical source

This file is the canonical source for setup-mode detection and conversion. `AGENTS.md` and the other references in this skill link here instead of repeating the rule.
