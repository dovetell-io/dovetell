# Writing Pages

Status: preprod experiment
Created: 2026-05-16
Owner: dovetell-public implementation

The `/writing/` surface is an owned SEO experiment for public-safe category
essays. It is intentionally static: markdown source is converted to committed
HTML, with no CMS, database, runtime rendering, tags, search, or author system.

## Source And Output

| Path | Purpose |
|------|---------|
| `content/writing/*.md` | Public-safe promoted article source |
| `scripts/build-writing.js` | Tiny markdown/frontmatter to HTML generator |
| `writing/` | Generated static pages served by GitHub Pages |

## Workflow

1. Promote reviewed public-safe copy into `content/writing/`.
2. Keep frontmatter simple: `title`, `description`, `date`, `slug`, `status`.
3. Run `node scripts/build-writing.js`.
4. Review the generated `/writing/` index and article page before publishing.

## Boundaries

- Do not automatically sync private GTM drafts into this repo.
- Do not publish private strategy, pricing, launch, customer, or validation
  notes.
- Do not add CMS-like infrastructure until a real publishing workflow demands
  it.
- Treat Medium or LinkedIn as syndication/signal channels, not canonical source
  for owned SEO pages.

---

*Owned writing, not a publishing platform.*
