---
name: hugoplate-best-practices
description: Best practices and architectural patterns for working with the Hugoplate Hugo boilerplate. Use this when modifying theme tokens, configuration, content, layouts, or Tailwind v4 styles in a Hugoplate project.
license: MIT
---

# Hugoplate Agent Skill

This skill provides the best practices and architectural patterns for working with the **Hugoplate** boilerplate. Use this as your primary guide when modifying theme tokens, configuration, content, or layouts.

## 1. Core Architecture

Hugoplate is a modern Hugo boilerplate built with:

- **Hugo (Extended)**: Static site generator.
- **Tailwind CSS v4**: Utility-first CSS using Hugo Pipes and the `@theme` directive.
- **Hugo Modules**: Theme and feature functionality are imported as modules.
- **Theme Generator**: A custom Node.js script (`scripts/themeGenerator.js`) that syncs `data/theme.json` with Tailwind CSS variables.

## 2. Design System (`theme.json`)

All design tokens (colors, fonts, sizes) are managed in `exampleSite/data/theme.json`.

### 2.1 Color Tokens

- **Default (Light)**: `colors.default.theme_color` and `colors.default.text_color`.
- **Dark Mode**: `colors.darkmode.theme_color` and `colors.darkmode.text_color`.
- **Logic**: The `themeGenerator.js` script maps these to CSS variables (e.g., `--color-primary`, `--color-darkmode-primary`).

### 2.2 Typography

- **Google Fonts**: Defined in `fonts.font_family`. Use the syntax `Family:wght@weights` (e.g., `Inter:wght@400;700`).
- **Scale**: `fonts.font_size.scale` controls the heading hierarchy (H1-H6).
- **Base**: `fonts.font_size.base` sets the root font size in pixels.

### 2.3 Workflow: Design Changes

1. **Modify `theme.json`**: Update colors or fonts.
2. **Run Dev Server**: `npm run dev` or `pnpm dev`. This automatically runs `themeGenerator.js` and `hugo server`.
3. **Verify**: Check `assets/css/generated-theme.css` to see the updated variables.

## 3. Configuration System

Configuration is split across several files in `exampleSite/config/_default/`:

- `hugo.toml`: Core site settings, build options, and asset fingerprinting.
- `params.toml`: Theme-specific toggles (dark mode, search, navigation, etc.).
- `menus.en.toml`: Menu structures for English.
- `languages.toml`: Multilingual setup.
- `module.toml`: Import declarations for Hugo Modules.

### 3.1 Feature Toggles (`params.toml`)

Most UI components (e.g., `preloader`, `announcement`, `cookies`) have an `enable` flag. Toggle them here without touching the code.

## 4. Content Development

Content is located in `exampleSite/content/english/`.

### 4.1 Section Content

Files in `content/english/sections/` are typically used for homepage sections. They often use `build.render = "never"` because they are pulled into `index.html` via `site.GetPage`.

### 4.2 Front Matter Standards

Always include `title`, `description` (for SEO), and `image` (feature image). Use `draft: false` to publish.

## 5. Layouts & Templates

- **Base**: `layouts/baseof.html` is the master wrapper.
- **Homepage**: `layouts/index.html` iterates through section files.
- **Partials**: Reusable fragments in `layouts/partials/`.
- **Overriding Modules**: To override a module partial, create a file with the same path in your local `layouts/` directory.

## 6. CSS & Tailwind Best Practices

- **Tailwind v4**: Uses `@theme` in `assets/css/main.css`. Avoid creating `tailwind.config.js` as it's not the primary way to configure v4 in this project.
- **Layers**: Add custom CSS to `assets/css/custom.css` or within `@layer` blocks in `main.css`.
- **Images**: Use the `partial "image"` for automatic Hugo responsive processing and WebP conversion.

## 7. Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with theme watching. |
| `npm run build` | Production build with minification and fingerprinting. |
| `npm run update-modules` | Clean and update Hugo modules to latest. |
| `npm run remove-darkmode` | Permanently remove dark mode functionality. |
| `npm run remove-multilang` | Permanently remove multilingual support. |

## 8. Troubleshooting

- **Styles not updating**: Ensure `npm run dev` is running (it needs to regenerate `generated-theme.css`).
- **Classes missing**: Tailwind v4 in this project scans `hugo_stats.json`. If a new class isn't working, try a full rebuild.
- **Google Fonts error**: Check for spaces or incorrect weight syntax in `theme.json`.

## 9. AI Agent Guidelines

- **Always Read Context**: Before modifying a layout, check if a partial exists in `layouts/partials/essentials/` that might already handle it.
- **Prefer Tokens**: Never hardcode hex colors in CSS. Add them to `theme.json` and use the generated Tailwind classes.
- **Check Params**: Before writing logic to hide/show a section, check `params.toml` for an existing toggle.
