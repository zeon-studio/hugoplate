# Page and Site Configuration

Global settings, navigation, social, feature toggles, SEO. Files are at the project root (`hugo.toml`, `config/_default/`, `data/`). **Read the actual file before editing; prefer toggling a flag over deleting keys.**

## Files

- **`hugo.toml`** — core: `baseURL`, `title`, `timeZone`, taxonomies/permalinks, pagination, `[build.buildStats]` (feeds Tailwind), `[outputs]`, markup, imaging, `[[params.plugins.css/js]]` asset lists. The `theme =` line is comment-managed by the setup scripts — don't toggle by hand.
- **`config/_default/params.toml`** — theme params + **feature toggles** (most components have an `enable` flag): branding (`logo*`, `favicon`), `navbar_fixed`, `theme_switcher`, `theme_default`, `mainSections`; `[preloader]`/`[search]`/`[announcement]`/`[cookies]`/`[subscription]`/`[google_map]`/`[open_remark]`/`[navigation_button]`; SEO `[metadata]`; `[llms]`; `[site_verification]`. **Check here for an existing toggle before writing show/hide template logic.**
- **`config/_default/menus.en.toml`** — header `[[main]]` (`name`, `url`, `weight`; nest via `parent`), footer `[[footer]]`. One file per language.
- **`config/_default/languages.toml`** — per-language `label`/`locale`/`contentDir`/`weight`.
- **`config/_default/module.toml`** — `[hugoVersion]` range + `[[imports]]` (the `gethugothemes/hugo-modules` packages). Self-import comment-managed by setup scripts. See `references/component-usage.md`.
- **`config/_default/security.toml`** — Hugo security policy; touch only if a build is blocked.
- **`data/social.json`** — footer/social links (`name`, `icon` FA class, `link`); empty/remove to hide.
- **`data/theme.json`** — colors/fonts → see `references/styling-and-theming.md`.

## SEO

Resolves with fallback (via `basic-seo` module): per-page frontmatter (`title`, `meta_title`, `description`, `image`) → global `params.toml [metadata]`.

## DO NOT

- Toggle `theme =` (`hugo.toml`) or `[[imports]]` (`module.toml`) by hand — the setup scripts own that state.
- Delete keys to disable a feature — set its `enable = false`.
- Hardcode nav links into templates — use `menus.*.toml`.
- Use a relative `baseURL` in production — fully-qualified URL.
