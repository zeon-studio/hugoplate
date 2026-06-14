# Styling and Theming

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
