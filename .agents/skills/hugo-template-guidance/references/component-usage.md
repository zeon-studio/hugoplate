# Component Usage

Template/partial/module architecture. Theme templates live in `themes/<theme>/layouts/`; override by recreating the same path under **root** `layouts/` (Hugo unions root over theme).

## New template system (don't "fix" to legacy)

Hugo 0.146+: partials in **`layouts/_partials/`** (not `partials/`), homepage **`home.html`** (not `index.html`), base **`baseof.html`** top-level (not `_default/baseof.html`).

```text
themes/<theme>/layouts/
  baseof.html  # <html>/<head>/body, {{ block "main" . }}
  home.html  single.html  list.html  taxonomy.html  term.html  about.html  contact.html  404.en.html
  blog/  authors/        # section list.html + single.html
  _partials/             # reusable partials
    essentials/          # head, header, footer, script, style (used by baseof)
    components/          # author-card, blog-card, breadcrumb, pagination, theme-switcher, language-switcher, tw-size-indicator
    widgets/             # categories, tags, widget-wrapper
    page-header.html  call-to-action.html
```

**List `themes/<theme>/layouts/` + `_partials/` (and any root `layouts/` overrides) before assuming a template exists.** Many partials (`image`, `basic-seo`, `search-modal`, `favicon`, `manifest`, `announcement`…) come from **Hugo Modules**, not this repo.

## Partials & Modules

- `{{ partial "name.html" . }}`; `{{ partialCached ... }}` for page-invariant output (styles, scripts, announcement) — `baseof.html` does this deliberately; match it.
- Override a **module** partial by creating the same path in root `layouts/_partials/` (union FS wins).
- `config/_default/module.toml` lists available `gethugothemes/hugo-modules` modules, check `https://github.com/gethugothemes/hugo-modules` for more.
- **Active:** `llms-txt`, `search`, `pwa`, `images`, `videos`, `icons/font-awesome`, `gzip-caching`, `adsense`, `accordion`, `table-of-contents``tab`, `modal`, `gallery-slider`, `components/{preloader,announcement,cookie-consent,social-share,custom-script,open-remark,render-link}`, `shortcode{button,notice,mermaid}`, `seo-tools/{basic-seo,site-verifications,google-tag-manager}`.
- **Disabled but available** (commented out): `icons/themify-icons`, `components/{valine-comment,crisp-chat}`, `seo-tools/{baidu-analyticmatomo-analytics,plausible-analytics,counter-analytics}`.
- You can create custom partial components into `layouts/_partials/` and use them in templates, but for anything non-trivial, check if a module already provides it first.
- You can create custom shortcodes in `layouts/shortcodes/` and use them in content, but check if a module already provides it first (e.g. `button`, `notice`, `mermaid`, accordion/tab/modal/gallery shortcodes come from modules).

# Most used Shortcodes or Partials

- **Image Module**: responsive images with Tailwind classes, lazy loading, optional XL display; accepts `Src`, `Alt`, `Class`, `Loading`, and `DisplayXL` etc keys in a dict. check `https://github.com/gethugothemes/hugo-modules/tree/master/images` for more (e.g. `DisplayXL` makes it full-width on XL screens and above, but normal on smaller screens and can use background-image can also use at shortcode). Also very important the images are stored in `/assets/images/` (not `static/`) so they get processed by Hugo's image pipeline and can be used with the `image` partial/shortcode.
  partial example: `{{ partial "image" (dict "Src" .Params.featured_image "Alt" .Title "Class" "my-4 rounded-lg") }}`
  shortcode example: `{{< image src="/path/to/image.jpg" alt="Alt text" class="my-4 rounded-lg" display_xl=true >}}`
- **Page Header**: used on almost all single, list or custom templates; accepts `Title`, `Subtitle`, and `Background` keys in a dict; check `layouts/_partials/page-header.html` for usage.
  example: `{{ partial "page-header" . }}` or `{{ partial "page-header" (dict "Title" .Title "Subtitle" .Params.subtitle "Background" .Params.featured_image) }}`

# Reusable components

Reusable components should be added as partials under `layouts/_partials/components/` and used via `{{ partial "components/name.html" . }}`. Check the existing components for examples of how to write them, and check if a Hugo Module already provides the component before creating a new one.

## Styling

Tailwind utilities + tokens (`text-primary`, `bg-body`, `dark:bg-darkmode-body`); reusable CSS classes in `assets/css/components.css` or `custom.css`. See `references/styling-and-theming.md`.

## DO NOT

- Rename `_partials/`→`partials/`, `home.html`→`index.html`, or move `baseof.html` into `_default/`.
- Assume a partial is missing because it's not in `themes/<theme>/layouts/` — check `module.toml` first.
- Edit a vendored module in the Go cache, or files under `themes/<theme>/` directly — override via root `layouts/`.
- Hand-roll `<img>` for content images — use `partial "image"`. Hardcode hex — use tokens.
