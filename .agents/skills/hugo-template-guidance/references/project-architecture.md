# Project Architecture

This theme = **Hugo Extended <version from netlify.toml>** + **Hugo Modules**, styled with **Tailwind v4**, **Bootstrap 5 (SCSS)**, or a hybrid depending on the build — verify in `references/styling-and-theming.md` before assuming Tailwind.

This reference assumes the **project-setup** layout: site files at root, theme vendored in `themes/<theme>/`. If `exampleSite/hugo.toml` exists instead, run `<pm> project-setup` first (see `references/detect-mode.md`).

## Folder Structure

**Always list the root + `themes/<theme>/` to confirm before assuming a path.**

```text
hugo.toml                  # entry config
config/_default/           # params, menus, languages, module, security
content/english/           # site content (per-language)
data/                       # theme.json, social.json
i18n/                       # translation strings
static/                     # byte-for-byte files (robots.txt, _redirects)
assets/                     # root overrides: images/, css/custom.css
go.mod / go.sum             # Hugo Modules checksum

themes/<theme>/             # vendored theme
  theme.toml
  layouts/                  # THEME templates (new system):
    baseof.html  home.html  single.html  list.html  taxonomy.html  term.html
    blog/  authors/         # section list+single
    _partials/               # essentials/, components/, widgets/
  assets/                   # THEME assets: css/ (Tailwind entry + layers + generated-theme.css), js/, plugins/
```

> **Hugo unions root over theme** — a root `assets/`, `layouts/`, `static/`, or `content/` file **overrides** the same path in `themes/<theme>/`. That's the correct way to customize without editing vendored files (e.g. `assets/css/custom.css` at root overrides the theme's copy).

Much functionality (search, SEO, images, PWA, shortcodes, announcement…) comes from **Hugo Modules** in `config/_default/module.toml` (`gethugothemes/hugo-modules`), not local code — see `references/component-usage.md`.

## Data Flow

1. Markdown in `content/english/<section>/` carries frontmatter.
2. Hugo maps section→template (e.g. `blog/*` → `layouts/blog/{single,list}.html`; `_index.md` → `home.html`) — resolved from `themes/<theme>/layouts/`, or a root `layouts/` override if present.
3. Template defines `"main"`; `baseof.html` wraps it with `_partials/essentials/*`.
4. Homepage blocks live in `content/english/sections/*.md` (`build.render = "never"`), pulled via `site.GetPage`/`.Params`.
5. `themes/<theme>/assets/css/main.css` imports Tailwind + `generated-theme.css` + custom layers (root `assets/css/custom.css` layers on top).

## Edit vs. Never-touch

**✅ Edit:** `content/**`, `config/_default/**` + `hugo.toml`, `data/theme.json` + `data/social.json`, `assets/css/custom.css`, `i18n/**`. Override theme templates/styles by recreating the same path under root `layouts/` / `assets/`.

**🚫 Never touch:** `themes/<theme>/assets/css/generated-theme.css` (auto-generated from `data/theme.json`), `hugo_stats.json` (Hugo build stat, feeds Tailwind), `scripts/` (breaks the CSS pipeline / mode switches), files under `themes/<theme>/` directly (override via root instead).

## Build Pipeline

`<pm> dev` / `<pm> build` →

1. `themeGenerator.js` reads `data/theme.json` → writes `themes/<theme>/assets/css/generated-theme.css` (`--watch` in dev).
2. Hugo build; `[build.buildStats]` writes `hugo_stats.json` which Tailwind scans (`@source "hugo_stats.json"`) for class detection.
3. Modules resolved from the Go cache (`go.sum`).
