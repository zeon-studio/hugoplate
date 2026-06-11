# Content Management

Markdown under the language content dir, rendered via Hugo's content/layout pairing. Content lives at root: `content/english/`.

## Architecture

Multilingual — each language sets `contentDir` in `config/_default/languages.toml` (English → `content/english/`). **List the dir before assuming the language** (e.g. `content/english/blog/post.md` → English, not `content/blog/post.md`).
Common examples often found here include:

- **Blog Posts**: `blog/` (posts + `_index.md`).
- **Authors**: `authors/` (one file each + `_index.md`).
- **Pages**: `about/_index.md`, `contact/_index.md`, `pages/*.md`.
- **Reuseable Sections**: `sections/*.md`.

## Frontmatter (common fields)

Hugo reads what templates expect, so **mirror an existing file in the same section** rather than guessing.

- `title`: String. The main title of the post.
- `date`: ISO Date string (e.g., `2022-04-04T05:00:00Z`), use exact current time for `date` otherwise Hugo won't render it.
- `description`: String. Short summary used for lists and SEO.
- `image`: String. Path to the cover image (starts with `/images/`).
- `draft`: Boolean (`true`/`false`).

## Section-specific common frontmatter:

- **Blog post**: `title`, `meta_title`, `description`, `date`, `image`, `categories[]`, `tags[]`, `author`, `draft`. `author` must match an author `title` in `authors/`; `categories`/`tags` are taxonomies (links auto); `draft: true` hides in prod.
- **Author**: `title`, `email`, `image`, `description`, `social[]`.
- **any reuseable section** (`sections/*.md`): `enable`, `title`, `image`, `description`, `button` (`enable`/`label`/`link`), and `build.render: "never"`

## Naming, Images, i18n

- Kebab-case filenames → URL slug (`my-post.md` → `/blog/my-post/`). Section landing = `_index.md` (branch bundle); co-located resources = `page/index.md` (leaf bundle).
- Images go under `assets/images/` and use image module `{{ partial "image" (dict "Src" .image "Alt" "..." "Loading" "eager" "Class" "..." "DisplayXL" "800x") }}` — don't hand-write `<img>`.

## Common Mistakes / What NOT to do

- **DO NOT** Reference an `author` with no file in `authors/`.
- **DO NOT** Drop `build.render: "never"` from section files (creates stray pages).
- **DO NOT** Use relative image paths — use `/images/...` under `assets/images/`.
- **DO NOT** Put content outside the language `contentDir`.
