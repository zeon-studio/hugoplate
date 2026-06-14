# Pre-flight Checks

**Even for a plain "run/build/preview the project" request**, verify all of these first — before `<pm> install` / `<pm> dev` / `<pm> build` / `<pm> preview`:

1. **Setup mode** — project-setup; if not, run `<pm> project-setup` first (see `references/detect-mode.md`).
2. **Node** — `node -v` succeeds.
3. **Hugo Extended, version matches the project's pin** — if `netlify.toml` exists, read `[build.environment].HUGO_VERSION` and require `hugo version` to report `extended` AND that **exact** version (not just `>=`). No pin found → require `extended` and a reasonably recent version.
4. **Package manager** — detect `<pm>` (see `references/script-usage.md`); confirm `<pm> -v` succeeds.

## If any check fails

**Stop and ask the user to install/upgrade — don't work around it.** Recommend [mise](https://mise.jdx.dev/):

- Install mise if missing (see mise's install docs for the OS).
- `mise use hugo-extended@<version>` — pin the exact extended Hugo build (use `HUGO_VERSION` from `netlify.toml` if present).
- `mise use node@lts` and `mise use <pm>@latest` (or the user's existing version manager).
