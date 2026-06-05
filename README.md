# Jacob's Notes

Personal digital garden — notes on theology, parenting, communication, and software — published at [japenner.github.io/personal-notes-site](https://japenner.github.io/personal-notes-site).

## Overview

Built on [Quartz v4](https://quartz.jzhao.xyz/), a static site generator that turns a folder of Markdown notes into a linked, searchable website. Notes live in `content/`, organized by topic. Every push to `main` triggers a GitHub Actions build that publishes the site to GitHub Pages. A local scheduled job auto-commits and pushes note changes (the `[AUTOMATED]` commits), so the published site stays in sync without manual deploys.

## Prerequisites

- Node.js >= 22 (pinned to `v22.16.0` in `.node-version`)
- npm >= 10.9.2

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/japenner/personal-notes-site.git
   cd personal-notes-site
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

## Configuration

There are no environment variables. Site behavior is configured in two TypeScript files:

| File | Controls |
| --- | --- |
| `quartz.config.ts` | Site title, base URL, theme (fonts and the "Expedition" parchment/obsidian-gold palette), analytics (Plausible), and the transformer/filter/emitter plugin pipeline |
| `quartz.layout.ts` | Which components render where on each page (sidebar, table of contents, footer, etc.) |

See the [Quartz configuration docs](https://quartz.jzhao.xyz/configuration) for all options.

## Running

Build and serve locally with hot reload (defaults to `http://localhost:8080`):

```bash
npx quartz build --serve
```

Build only (output goes to `public/`):

```bash
npx quartz build
```

## Writing Content

- Add Markdown files under `content/<topic>/`. Obsidian-flavored Markdown (wikilinks, callouts, embeds) is supported.
- Notes with `draft: true` in their frontmatter are excluded from the build.
- Files under `private/`, `templates/`, and `.obsidian/` are ignored (`ignorePatterns` in `quartz.config.ts`).
- Dates default to last-modified, resolved from frontmatter, then git history, then the filesystem.

## Testing

Run the test suite:

```bash
npm test
```

Type-check and verify formatting:

```bash
npm run check
```

Auto-format:

```bash
npm run format
```

## Project Structure

| Path | Purpose |
| --- | --- |
| `content/` | The notes — Markdown organized by topic (`theology/`, `parenting/`, `communication/`, `tech/`) |
| `quartz/` | Quartz framework source (components, plugins, build pipeline) — vendored, edit to customize |
| `quartz.config.ts` | Site and plugin configuration |
| `quartz.layout.ts` | Page layout composition |
| `public/` | Build output (generated, not committed) |
| `docs/` | Upstream Quartz documentation, browsable locally with `npm run docs` |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with `npx quartz build` and deploys `public/` to GitHub Pages. No manual steps.

The other workflows in `.github/workflows/` (`ci.yaml`, `build-preview.yaml`, `deploy-preview.yaml`, `docker-build-push.yaml`) are inherited from upstream Quartz and gated to the `jackyzha0/quartz` repository — they do not run here.

To pull in upstream Quartz updates:

```bash
npx quartz update
```

## License

MIT — see [LICENSE.txt](LICENSE.txt). Quartz is © [jackyzha0](https://github.com/jackyzha0).
