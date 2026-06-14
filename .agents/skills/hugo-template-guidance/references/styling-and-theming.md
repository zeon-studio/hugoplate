# Styling and Theming

> [!IMPORTANT]
> **Styling stack verification required:** This skill is reused across multiple theme builds. **Tailwind v4** below is the common pattern but **not universal** — some builds are **Bootstrap 5 (SCSS)**, or a hybrid of both. Check before describing or changing any styling:
>
> - `themes/<theme>/assets/css/main.css` importing `tailwindcss` → **Tailwind v4** — the rest of this doc applies.
> - `themes/<theme>/assets/scss/` with a `style.scss`/`_bootstrap.scss` importing Bootstrap's SCSS, and/or `gohugoio/hugo-mod-bootstrap-scss` listed in `config/_default/module.toml` → **Bootstrap 5 (SCSS)** drives the theme. Variables live in SCSS (often fed by `site.Params.variables`), not `data/theme.json`.
> - `data-bs-*` attributes, or `navbar`/`dropdown`/`collapse`/`modal`/`accordion` classes in layouts, plus `assets/js/bootstrap.js` importing Bootstrap JS components → those widgets are **Bootstrap-driven**. Don't treat them as dead Tailwind-migration leftovers, and don't rebuild them with Hugo Modules or custom JS.
> - `@plugin 'tailwind-bootstrap-grid'` in `main.css` → Tailwind v4 **with** Bootstrap-style grid classes (`row`, `col-*`, `container`) as real utilities — both systems are active, neither is a mistake.

**Tailwind v4** (CSS-first) + a **design-token engine** driven by `data/theme.json` (root). Generated/source CSS lives in `themes/<theme>/assets/css/`; your overrides go in root `assets/css/custom.css` (Hugo unions root over theme).

## Tokens (`data/theme.json`)

Colors, fonts, type scale live here. **Read it before editing** (schema may be customized). `scripts/themeGenerator.js` reads it → writes `generated-theme.css` (a Tailwind `@theme` block); runs automatically in `<pm> dev`/`build`.

```json
"colors": {
  "default":  { "theme_color": {...}, "text_color": {...} },
  "darkmode": { "theme_color": {...}, "text_color": {...} }
},
"fonts": {
  "font_family": { "primary": "Heebo:wght@400;600", "primary_type": "sans-serif", "secondary": "...", "secondary_type": "..." },
  "font_size":   { "base": "16", "scale": "1.2" }
}
```

- Colors → utilities: `default` → `--color-primary` → `text-primary`, `bg-body`; `darkmode` → `--color-darkmode-*` → use via `dark:` (`dark:bg-darkmode-body`).
- Fonts: Google syntax `Family:wght@weights`, `_type` = fallback. `base`→`--text-base` (px); `scale`→ heading sizes `--text-h1…h6`. Stray spaces/bad weights break the font request.

**Change flow:** edit `data/theme.json` → `<pm> dev` (generator watches) → verify in browser.

## Tailwind v4 (`themes/<theme>/assets/css/main.css`)

Config is all in CSS:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin 'tailwind-bootstrap-grid';
@source "hugo_stats.json"; /* class detection */
@custom-variant dark (&:where(.dark, .dark *));
@import "./generated-theme.css"; /* auto-generated tokens */
@import "./safe.css";
@import "./utilities.css";
@layer base {
  @import "./base.css";
}
@layer components {
  @import "./components.css";
  @import "./navigation.css";
  @import "./buttons.css";
}
/* module layers ... */
@import "module-overrides.css";
@import "custom.css";
```

**Class detection = `hugo_stats.json`**, not a content glob. Tailwind scans it (Hugo emits it via `[build.buildStats]`). New class not applying? Full rebuild so `hugo_stats.json` regenerates.

CSS files (in `themes/<theme>/assets/css/`): `generated-theme.css` (**DO NOT EDIT**) · `base/components/utilities/navigation/buttons/safe.css` (theme layers) · `module-overrides.css` (module CSS) · `custom.css` (**your** styles — create/edit at root `assets/css/custom.css` to override the theme copy).

## Dark Mode

`.dark` on `<html>` activates `darkmode` tokens via the `dark:` variant. Toggle/default in `params.toml` (`theme_switcher`, `theme_default`). Remove entirely with `<pm> remove-darkmode`.

## DO NOT

- Edit `generated-theme.css` — overwritten each dev/build; edit `theme.json`.
- Hardcode hex (`text-[#121212]`) — use tokens (`text-primary`, `bg-body`).
- Create `tailwind.config.js` — v4 configures in `main.css`; add rules to `custom.css` or a `@layer`.
- Add a content `@source` glob expecting template scanning — detection is `hugo_stats.json`.
