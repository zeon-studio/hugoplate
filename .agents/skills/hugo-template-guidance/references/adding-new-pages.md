# Adding New Pages or New Sections

Hugo derives the URL from the content path under the language `contentDir`, and the template from section/kind/`layout`. Content goes under `content/english/` (root, project-setup).

There are three distinct things you'll be asked for — pick the matching recipe:

| Asking for...                                                   | It means...                                                           | Recipe   |
| --------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| "Add a page like About" (custom layout, image, hero, etc.)      | Content + a **dedicated template** selected via `layout:` frontmatter | Recipe 1 |
| "Add a page like Elements / Privacy Policy" (just text content) | Content only, rendered by the **existing generic template**           | Recipe 2 |
| "Add a section like Call to Action" (homepage block)            | A **content block** + **partial** wired into `home.html`              | Recipe 3 |

## Where new/overridden layouts go — root `layouts/`, never `themes/<theme>/layouts/`

Hugo's union filesystem makes root take precedence over the theme for the **same relative path**. This is the standard Hugo way to customize a theme without forking it, and it's how this theme stays upgradeable:

- **New templates, template overrides, new sections, new partials/components** → create them under root `layouts/` at the same relative path the theme would use (e.g. `layouts/about.html`, `layouts/_partials/components/my-card.html`).
- **Never create or edit files directly under `themes/<theme>/layouts/`** — those are vendored and reset/overwritten on theme updates (`<pm> update-theme` etc.).
- To override an existing theme template/partial, copy it from `themes/<theme>/layouts/...` to the identical path under root `layouts/...`, then edit the copy.
- To add something brand new (a new partial, a new template, a new shortcode), just create it under root `layouts/...` directly — no theme copy needed.

## Recipe 1 — Custom-templated page with frontmatter (like `about`)

Use when the page needs its own layout (hero image, custom sections) beyond plain content — not just a title + body.

1. **Content** — `content/english/<section>/_index.md` (or `pages/my-page.md`).

2. **Template** — `layouts/<layout-name>.html` (root, mirroring the theme path — see above). Define `"main"` and read `.Title`, `.Params.*`, `.Content`.
   - The frontmatter `layout: "<name>"` must match the template filename (`layouts/<name>.html`).
   - **Analyze an existing template first** (`about.html`, `contact.html`)
   - `baseof.html` supplies head/header/footer/SEO around `"main"` — never omit `{{ define "main" }}`.

## Recipe 2 — Generic markdown page (like `elements`, `privacy-policy`)

Use when the page is just a title + long-form content — no custom layout needed.

1. **Content only** — `content/english/pages/my-page.md`, frontmatter has **no `layout` field**:
2. **No template needed** — falls through to the existing `single.html`.

## Recipe 3 — New section (like `call-to-action`)

Use when adding a new block to the homepage or any other page that's toggled on/off and editable via content frontmatter.

1. **Content block** — `content/english/sections/my-section.md`. Must include `enable: true/false` and `build.render: "never"` (so it doesn't become a standalone page); add whatever params the partial needs:

   ```yaml
   ---
   enable: true
   title: "Section title"
   image: "/images/my-section.png"
   description: "Section description"
   button:
     enable: true
     label: "Call to action"
     link: "https://example.com"
   build:
     render: "never"
   ---
   ```

2. **Partial** — `layouts/_partials/my-section.html` (root, new file — no theme copy needed). Fetch the content via `site.GetPage`, gate on `.Params.enable`, render using `.Title` / `.Params.*`:

   ```go-html-template
   <!-- My Section -->
   {{ with site.GetPage "sections/my-section" }}
     {{ if .Params.enable }}
       <section class="section">
         <div class="container">
           <h2>{{ .Title | markdownify }}</h2>
           <p>{{ .Params.description | markdownify }}</p>
           {{ with .Params.button }}
             {{ if .enable }}
               <a class="btn btn-primary" href="{{ .link | absURL }}">{{ .label }}</a>
             {{ end }}
           {{ end }}
         </div>
       </section>
     {{ end }}
   {{ end }}
   <!-- /My Section -->
   ```

3. **Wire into the page layout** — `layouts/home.html` (root override; copy from `themes/<theme>/layouts/home.html` first if not already present), add:

   ```go-html-template
   {{ partial "my-section" . }}
   ```

   Place it in the right position relative to the other `{{ partial ... }}` / section blocks already in `home.html`.

## Navigation

Surface a page (Recipes 1 & 2) via `config/_default/menus.en.toml` (don't hardcode links):

```toml
[[main]]
name = "My New Page"   url = "/my-new-page"   weight = 5   # parent = "Pages" to nest
```

## Linking other pages with relative URLs

`<a href="{{ .link | absURL }}">` — Hugo's `absURL` generates the correct URL based on the content path and `[permalinks]` config. Don't hardcode paths.

## DO NOT

- Use legacy paths — `_partials/`, `home.html`, top-level `baseof.html`.
- Create or edit files directly under `themes/<theme>/layouts/` — add new templates/sections/components or override existing ones under root `layouts/` at the same relative path.
- Add a `layout:` frontmatter field that doesn't match an existing/new `layouts/<name>.html` (Recipe 1) — Hugo silently falls back to the default template.
- Omit `{{ define "main" }}` — page renders with no head/header/footer/SEO.
- Invent frontmatter — copy a same-recipe page (e.g. copy `about` for Recipe 1, `privacy-policy` for Recipe 2, `call-to-action` for Recipe 3).
- Create a section file (Recipe 3) without `build.render: "never"` (stray page).
- Hardcode nav links; guess permalink behavior — check `[permalinks]` in `hugo.toml`.
