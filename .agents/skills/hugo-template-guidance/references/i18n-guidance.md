# Adding a New Language, Translations, i18n Strings, and Menu Items

Multilingual via Hugo's standard system. Mirrors an existing language (`en`) — config, menu, i18n strings, content tree.

## Files involved (all at root)

| File             | Path                              |
| ---------------- | --------------------------------- |
| Languages config | `config/_default/languages.toml`  |
| Menu             | `config/_default/menus.<xx>.toml` |
| i18n strings     | `i18n/<xx>.yaml`                  |
| Content          | `content/<langdir>/`              |
| Build/verify     | `<pm> dev` / `<pm> build`         |

## Adding New Language Checklist

1. **`config/_default/languages.toml`** — add a block:

   ```toml
   [xx]
   label = "Native Name"        # <- shown in the header language switcher
   locale = "xx-yy"
   contentDir = "content/<langdir>"
   weight = N
   ```

2. **`config/_default/menus.<xx>.toml`** — copy `menus.en.toml`, translate `name` values (keep `url`/`weight`/`parent` keys as-is so routes still match).

3. **`i18n/<xx>.yaml`** — copy `i18n/en.yaml`, translate values.

4. **`content/<langdir>/`** — copy `content/english/` (or the existing language's content), keeping the same relative paths (e.g., `content/english/blog/post.md` → `content/<langdir>/blog/post.md`), then translate frontmatter and markdown.

## Verify

Build with `<pm> build` — **never bare `hugo`**

## DO NOT

- Don't translate paths/filenames in `content/<langdir>/` — Hugo matches translations by identical relative path.
- Don't run `<pm> remove-multilang` to "reset" — it's destructive and permanent.
