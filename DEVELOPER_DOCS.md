# Documentation

Explains how to change colors, fonts, configuration, content, and layouts. Provide this to an AI agent as context when asking it to modify the project.

---

## 1. Quick Facts

- Stack: Hugo (extended) + Tailwind CSS (Hugo Pipes) + Hugo Modules.
- Theme Tokens: `exampleSite/data/theme.json`.
- Config: `exampleSite/hugo.toml` + `exampleSite/config/_default/*.toml`.
- Content Root (English): `exampleSite/content/english`.
- Layouts & Partials: `layouts/`.
- CSS Source: `assets/css/` (`main.css` is the Tailwind entry).
- Tailwind Plugins (custom): `exampleSite/tailwind-plugin/`.
- Output (built site): `public/` (do not edit).

---

## 2. Theme Design Tokens (`theme.json`)

File: `exampleSite/data/theme.json`

```json
{
  "colors": {
    "default": {
      "theme_color": {
        "primary": "#121212",
        "body": "#fff",
        "border": "#eaeaea",
        "light": "#f6f6f6",
        "dark": "#040404"
      },
      "text_color": {
        "text": "#444444",
        "text_dark": "#040404",
        "text_light": "#717171"
      }
    },
    "darkmode": {
      "theme_color": {
        "primary": "#fff",
        "body": "#1c1c1c",
        "border": "#3E3E3E",
        "light": "#222222",
        "dark": "#fff"
      },
        "text_color": {
          "text": "#B4AFB6",
          "text_dark": "#fff",
          "text_light": "#B4AFB6"
        }
    }
  },
  "fonts": {
    "font_family": {
      "primary": "Heebo:wght@400;600",
      "primary_type": "sans-serif",
      "secondary": "Signika:wght@500;700",
      "secondary_type": "sans-serif"
    },
    "font_size": {
      "base": "16",
      "scale": "1.2"
    }
  }
}
```

### 2.1 Changing Colors

- Edit light mode colors under `colors.default.theme_color` and `colors.default.text_color`.
- Edit dark mode analogs under `colors.darkmode.*`.
- Common keys:
  - `primary`: Brand accent (buttons / highlights).
  - `body`: Background.
  - `border`: Neutral stroke.
  - `light` / `dark`: Surface utilities.
  - Text keys differentiate tone.
- Add new semantic tokens (e.g. `accent`, `success`) then expose them via Tailwind plugin (see Section 7).

### 2.2 Changing Fonts

- `font_family.primary` & `secondary` use Google Fonts syntax: `Family:wght@weights`.
- The partial `layouts/partials/essentials/style.html` injects a dynamic `<link>` using these values.
- Change fonts by replacing those strings (example: `Inter:wght@400;600;700`).
- `*_type` is CSS generic fallback (`sans-serif`, `serif`, etc.).

### 2.3 Font Sizing

- `font_size.base`: Root size in px (string of number). Avoid large jumps (>18) unless deliberate.
- `font_size.scale`: Modular scale multiplier consumed by custom Tailwind theme plugin for heading hierarchy.

### 2.4 Example AI Prompt (Theme Change)

"Update primary color to #0F62FE (light) and #FFFFFF (dark mode), change primary font to `Inter:wght@400;600;700`, base font size to 17, scale to 1.22, and expose a new `accent` color #FF9900 in Tailwind classes."

---

## 3. Configuration Overview

Location: `exampleSite/hugo.toml` and `exampleSite/config/_default/`

| File | Purpose |
|------|---------|
| `hugo.toml` | Site core settings (baseURL, outputs, pagination, modules, imaging, markup). |
| `params.toml` | Theme/runtime parameters (logos, switches, search, metadata, UI feature toggles). |
| `menus.en.toml` | Main & footer navigation (English). |
| `languages.toml` | Multilingual language definitions. |
| `module.toml` | Hugo module imports (theme + feature modules). |

### 3.1 Critical Keys (`hugo.toml`)

- `baseURL`: Must be set for production (SEO, sitemap, canonical).
- `title`: Global site title.
- `[services.googleAnalytics].ID`: GA4 ID.
- `[services.disqus].shortname`: Enable Disqus comments.
- `[pagination].pagerSize`: Items per list page.
- `[outputs].home`: Add / remove formats (`SearchIndex`, `RSS`, etc.).
- `[[params.plugins.css]]` & `[[params.plugins.js]]` arrays: Declare additional CSS/JS (local or plugin assets) with optional `lazy` flag.

### 3.2 Theme Parameters (`params.toml`)

Notable sections:

- Branding: `favicon`, `logo`, `logo_darkmode`, `logo_width`, `logo_height`, `logo_webp`.
- Theme: `navbar_fixed`, `theme_switcher`, `theme_default` (light|dark|system).
- Sections: `mainSections` (used for listing content like blog on various pages/widgets).
- Tracking & Ads: `google_tag_manager`, `google_adsense`.
- Inline script: `custom_script`.
- Feature Tables: `[preloader]`, `[navigation_button]`, `[search]`, `[announcement]`, `[metadata]`, `[site_verification]`, `[cookies]`, `[mermaid]`, `[widgets]`, `[google_map]`, `[subscription]`.

Enable/disable features with `enable = true|false` inside each table.

### 3.3 Menus (`menus.en.toml`)

- Use multiple `[[main]]` and `[[footer]]` blocks.
- Fields: `name`, `url`, `weight`, optional `parent` for nested dropdown.
- External link: begin with `https://`.

### 3.4 Languages (`languages.toml`)

Example entry:

```toml
[en]
languageName = "En"
languageCode = "en-us"
contentDir = "content/english"
weight = 1
```

Add new language by copying block, pointing `contentDir` to a parallel directory (e.g. `content/spanish`). Duplicate menus & translations.

### 3.5 Modules (`module.toml`)

- Lists theme + functional modules (search, pwa, seo tools, sliders, etc.).
- Comment out unused modules to slim build.
- Ensure `hugoVersion.min` aligns with installed CLI version.

---

## 4. Content Authoring

English root: `exampleSite/content/english/`

Common blog front matter example:

```yaml
---
title: "Post Title"
meta_title: "(Optional meta override)"
description: "SEO summary"
date: 2025-01-01T00:00:00Z
image: "/images/feature.png"
categories: ["CategoryA", "CategoryB"]
author: "John Doe"
tags: ["tag-a", "tag-b"]
draft: false
---
```

Key subdirectories:

- `blog/` (posts)
- `authors/` (author pages / profiles if used)
- `sections/` (homepage sectional content: e.g. `testimonial.md`, `call-to-action.md`) — often contain `build.render = "never"` to avoid page output.

Shortcodes (from imported modules) include: button, notice, accordion, tab, modal, etc.

Example shortcode usage:

```markdown
{{< button label="Get Started" link="/contact" >}}
```

---

## 5. Layouts & Partials

Key templates:

- Base layout: `layouts/_default/baseof.html` (wraps all pages; includes head, header, footer, script/style partials).
- Single page: `layouts/_default/single.html`.
- List page: `layouts/_default/list.html`.
- Homepage: `layouts/index.html` (banner, features iteration, testimonial section).
- Partials: `layouts/partials/essentials/*` (head/style/script/footer), `layouts/partials/components/`, `layouts/partials/widgets/`.

Override strategy: Place a file with same relative path in your project (or site) to supersede module version.

Block pattern example:

```html
{{ define "main" }}
  <!-- page-specific markup -->
{{ end }}
```

### 5.1 Add a Homepage Section

1. Create `content/english/sections/your-section.md` with front matter `enable: true` and any custom fields.
1. Insert block into `layouts/index.html`:

```html
{{ with site.GetPage "sections/your-section" }}
  {{ if .Params.enable }}
    <!-- custom markup using .Params fields -->
  {{ end }}
{{ end }}
```

1. Reference images via `partial "image"` for responsive processing.

### 5.2 Page Header Customization

- Edit `layouts/partials/page-header.html` to change hero/header style for pages & list views.

---

## 6. Assets (CSS & JS)

- Tailwind entry: `assets/css/main.css` (imports Tailwind + custom layers + plugin directives).
- Custom plugin JS (for Tailwind theme & grid): `exampleSite/tailwind-plugin/`.
- Additional CSS/JS added via `[[params.plugins.css]]` & `[[params.plugins.js]]` arrays in `hugo.toml`.
- Lazy CSS uses the media="print" + onload swap pattern (see `style.html`).
- Production build fingerprints (cache busts) & optionally minifies assets.

Change or extend styles by adding files in `assets/css/` and importing them inside the correct Tailwind layer (`@layer base|components|utilities`).

---

## 7. Extending Theme Tokens (Tailwind)

Files: `exampleSite/tailwind-plugin/tw-theme.js`, `exampleSite/tailwind-plugin/tw-bs-grid.js`.

To add a new color token:

1. Add key(s) to both `colors.default.theme_color` and `colors.darkmode.theme_color` in `theme.json` (example: `"accent": "#FF5733"`).
1. Update the Tailwind theme plugin to read and expose the new token (search for existing color mapping logic in `tw-theme.js`).
1. Rebuild; then you can use classes like `text-accent` or create custom utilities referencing that token.

Font scale or base changes propagate automatically if the plugin consumes `font_size` values.

---

## 8. Internationalization (i18n)

- Translation files: `i18n/en.yaml` (add new languages: `i18n/<code>.yaml`).
- Configure new language in `languages.toml` and create matching `content/<lang>/` directory.
- Duplicate menus (`menus.<lang>.toml`) if language-specific navigation is needed.

---

## 9. Images & Media

- Prefer `partial "image"` to leverage Hugo image processing & responsive sizes.
- Provide `Src`, `Alt`, and optional size keys (`DisplayXL`, `DisplayLG`, etc.).
- Logos & favicon paths configured in `params.toml`.
- WebP generation for logos depends on `logo_webp` flag.

---

## 10. Search

- Provided by search module (imported in `module.toml`).
- Output format `SearchIndex` enabled in `[outputs].home`.
- Configure via `[search]` block in `params.toml` (toggle `enable`, sections included, whether to show images, descriptions, tags, categories).

---

## 11. Dark Mode

- If `theme_switcher = true`, UI toggle script manages `.dark` class.
- If disabled, `<html>` gets a static class with `theme_default` (light|dark) from `baseof.html` logic.
- All dark colors come from `colors.darkmode.*` tokens.

---

## 12. Third-Party & Custom Scripts

- Add or remove plugin entries in `[[params.plugins.js]]` or `[[params.plugins.css]]` in `hugo.toml`.
- One-off inline JS: use `custom_script` param (string of HTML/script tag) or create a new partial and include it in `baseof.html` or an existing essentials partial.

---

## 13. Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Style changes not visible | Hugo cache | Run `hugo server --ignoreCache` or delete `resources/_gen`. |
| Font not loading | Wrong Google Fonts syntax | Use `Family:wght@400;600;700` without spaces. |
| New color missing in classes | Tailwind plugin not updated | Edit `tw-theme.js`, restart build. |
| Dark mode mismatch | Missing `.dark` or tokens not adjusted | Ensure `theme_switcher` true or set `theme_default = "dark"` and update `darkmode` colors. |
| 404 on image | Incorrect path or not processed | Verify original file exists & path relative to site root. |
| Search not indexing | Section not included | Add section to `include_sections` in `[search]` params. |

---

## 14. Change Workflow Summary

1. Adjust design tokens in `data/theme.json`.
1. Modify site behavior & features in `params.toml`.
1. Add or edit content in relevant section directory.
1. Change or extend layouts/partials in `layouts/`.
1. Extend Tailwind tokens via plugin if adding new theme keys.
1. Build & verify; commit & deploy.

---

## 15. Glossary (AI-Friendly)

- TOKEN: Configurable value in `theme.json` (e.g. color hex, font family).
- PARAM: User-adjustable runtime setting in `params.toml`.
- SECTION CONTENT: Markdown file in `content/<lang>/sections/` used by layout via `site.GetPage`.
- PARTIAL: Reusable template fragment included with `partial` / `partialCached`.
- MODULE: External Hugo module imported in `module.toml`.
- PLUGIN ENTRY: An object inside `[[params.plugins.css]]` or `[[params.plugins.js]]` describing an asset.
