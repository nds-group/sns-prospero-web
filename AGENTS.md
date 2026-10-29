## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Publishing Content (News, Press, Videos, Publications, Deliverables, Partners)

There is no CMS and no Astro content collection. All dynamic content lives in **`public/data.json`** and is fetched client-side (`fetch('/data.json')`) by an inline `<script>` in each page, which builds the HTML with template strings. To post something, edit `data.json` (plus add any image), run a build, commit, and push to `main`.

### Site structure (where content goes)

Navigation: `Home | About ▾ | Results ▾ | News & Events`.

- **News & Events (`/media`)** is the single feed for everything *announced*: project news, events, press releases, and third-party media coverage, told apart by `type`. There is no separate Press page: `/press` was removed and redirects to `/media` (`redirects` in `astro.config.mjs`). This follows the original design mockups (`../DESIGN/.../prospero_news_media_feed`), which mix "Press Release" and "Event" cards in one feed with a "Press & Media" sidebar holding the media kit.
- **Results ▾** (`/deliverables`, `/publications`, `/datasets`, `/open-source`, `/videos`) is the permanent archive of what the project *produces*. Videos are project outputs published on the PROSPERO YouTube channel, so they live here, not in the news feed. A notable new video can additionally get a short `News` item in the feed linking to it.

### `data.json` keys and the pages that render them

| Key | Rendered by | Fields used (all strings unless noted) |
|---|---|---|
| `news` | `src/pages/media.astro` (News & Events) | `date`, `type`, `title`, `summary`, `source`?, `thumbnail`?, `link`? |
| `videos` | `src/pages/videos.astro` (Results → Videos) | `date`, `title`, `youtube`, `thumbnail`?, `description`?, `duration`?, `type`? |
| `papers` | `src/pages/publications.astro` ("Research Papers") | `title`, `authors`, `venue`, `year`, `link` |
| `posters` | `src/pages/publications.astro` ("Posters & Presentations") | `title`, `event`, `link` |
| `zenodo` | `src/pages/publications.astro` ("Open Data (Zenodo)") | `title`, `date`, `link` |
| `deliverables.wp1`…`wp5` | `src/pages/deliverables.astro` | `id`, `name`, `description`, `date`, `lead`, `status`, `access`, `url`? |
| `deliverables.summary` | `src/pages/deliverables.astro` (WP overview) | `wp`, `title`, `lead`, `months`, `pm` (number) |
| `partners` | `src/pages/index.astro` (home logo grid) | `name`, `logo` |

`?` = optional. Sections in `publications.astro` are hidden while their array is empty; if all three are empty an empty-state card is shown.

### News, events, press (`news`)

Entries render **in array order with no sorting**, so insert new items at the **top** of the array (newest first).

```json
{
  "date": "July 8, 2026",
  "type": "Event",
  "title": "PROSPERO Project Kicks Off in Madrid",
  "summary": "One short paragraph (2–4 sentences).",
  "thumbnail": "/images/media/260708-prospero-kicking-off-thumb.webp",
  "link": "https://www.linkedin.com/..."
}
```

- `date`: human-readable, `Month D, YYYY` format.
- `type`: one of
  - `"News"` (default if omitted, green badge): project milestones, published deliverables, announcements.
  - `"Event"` (blue accent badge): plenary meetings, workshops, talks, conference participation.
  - `"Press Release"` (sovereign-blue badge): official press releases from the project or a partner's communication office (e.g. the UC3M newsroom).
  - `"In the Media"` (teal badge): coverage of PROSPERO by external media.
- `source` (optional): who published it, shown above the title, e.g. `"UC3M Newsroom"`, `"El País"`. Use it for `Press Release` and `In the Media`.
- Language: the site is in English. When a partner publishes both a Spanish and an English version, use the English title, summary and link.
- `thumbnail` (optional): put the file in `public/images/media/` named `YYMMDD-short-slug-thumb.webp` (WebP, 16:9, 640×360 like the existing one, ~30 KB). It is shown in a 224px-wide column on desktop (full width, 192px tall on mobile) with `object-cover` and `mix-blend-screen` over a sovereign-blue background, so keep the subject centred and follow the image guidelines below.
- `link` (optional): adds a "Read More →" link, usually to the LinkedIn post or the partner/press article. External (`http…`) links open in a new tab.
- Commit style used so far: `feat(news): add <short description>` (corrections: `fix(news): ...`).

### Videos (`videos`)

Newest first. Each video is a card linking out to YouTube (new tab); the page also links to the channel (from `src/config/socialLinks.ts`). An empty-state card shows while the array is empty.

```json
{
  "date": "November 12, 2026",
  "title": "What is PROSPERO?",
  "description": "One or two sentences.",
  "youtube": "https://www.youtube.com/watch?v=VIDEO_ID",
  "thumbnail": "/images/videos/261112-what-is-prospero.webp",
  "duration": "3:45",
  "type": "Explainer"
}
```

- `thumbnail`: **store a local copy** in `public/images/videos/` (`YYMMDD-slug.webp`, 16:9, 640×360). Take the custom thumbnail uploaded to YouTube, or `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`, crop/resize and convert to WebP. Do not hot-link `i.ytimg.com`: the site only contacts Google after cookie consent, and local copies keep working if YouTube changes them.
- Do not embed YouTube iframes; they set cookies before consent. If embedding is ever needed, use `youtube-nocookie.com` behind a click-to-load placeholder gated by the cookie consent (`src/config/consent.ts`).
- `type` (optional) is shown as a badge on the thumbnail, e.g. `Explainer`, `Demo`, `Talk`, `Interview`, `Webinar`.
- Commit style: `feat(videos): add <short title>`.

### Publications (`papers`, `posters`, `zenodo`)

```json
"papers": [
  {"title": "Paper title", "authors": "A. Author, B. Author, C. Author", "venue": "IEEE INFOCOM 2027", "year": "2027", "link": "https://doi.org/..."}
],
"posters": [
  {"title": "Poster or talk title", "event": "EuCNC & 6G Summit 2027, Location", "link": "https://..."}
],
"zenodo": [
  {"title": "Dataset or record title", "date": "October 1, 2026", "link": "https://zenodo.org/records/..."}
]
```

- Prefer a DOI link (`https://doi.org/...`) for papers; otherwise the Zenodo record or the publisher page. Links open in a new tab.
- Newest first, same as news.
- EU-funded outputs must acknowledge the grant and should be openly deposited (Zenodo). Ask the user for the DOI / Zenodo link rather than inventing one.
- Commit style: `feat(publications): add <short title>`.

### Deliverables (`deliverables.wpN`)

The full list is already in place; publishing a deliverable means **updating its existing entry**, not adding a new one (see commit `a6c0ac8`):

- `status`: `"Planned"` (grey), `"Completed"` (green), or `"Private"` (blue, for submitted SEN deliverables that will not be released).
- `access`: `"Public"` or `"SEN"` (sensitive). Both show an explanatory tooltip.
- `url` (optional): when present, a "Zenodo ↗" link is rendered next to the access level. Set it when a public deliverable is uploaded to Zenodo.

Example: `{"id": "D5.1", ..., "status": "Completed", "access": "Public", "url": "https://zenodo.org/records/23090699"}`.
Commit style: `feat(deliverables): publish D<x.y>`.

### Pages that are still static placeholders

`datasets.astro` and `open-source.astro` contain only hard-coded "coming soon" cards and do **not** read `data.json`. To post content there, add a new key to `data.json` and a fetch/render script modelled on `videos.astro` or `publications.astro`, including an empty state. `consortium.astro` partner details are hard-coded in its frontmatter; only the home-page logo grid uses `data.json` `partners`.

Downloadable files (e.g. the media kit) go in `public/downloads/`.

### Gotchas

- Field values are injected with `innerHTML` **without escaping**. Avoid raw `<`, `>` and `&` in text (use `&amp;` etc.), and avoid double quotes in news `title` because it is also used as the thumbnail `alt` attribute.
- `data.json` must stay valid JSON (no trailing commas, no comments). Check with `node -e "JSON.parse(require('fs').readFileSync('public/data.json','utf8'))"`.
- Asset paths are root-absolute (`/images/...`) and files under `public/` are served as-is.
- Verify with `npm run build` (and `./node_modules/.bin/astro dev --background` to look at the page) before committing. Use the local binary: on this machine `npx astro` can resolve to a cached newer Astro via pnpm dlx, which 500s on pages using `astro:assets`.

### Deployment

Pushing to `main` triggers `.github/workflows/astro.yml`, which builds with Node 22.12 and deploys to GitHub Pages (`https://sns-prospero.eu`). Remote: `git@github.com:nds-group/sns-prospero-web.git`. Only commit/push when the user asks.

## Image Guidelines (Ecotech Sovereignty)

When adding stock images or photos (such as in the Hero or content cards), ensure they align with the PROSPERO "Ecotech Sovereignty" visual identity:

1.  **Themes**: Images should feature advanced 6G networking, clean/green energy data centers, AI automation (smart factories), or glassmorphism technology aesthetics.
2.  **Color Filtering**: To maintain harmony and ensure white text readability, apply a CSS color filter to raw stock images so they blend with the primary (`#0d564e`) and sovereign blue (`#0B2E59`) palettes.
    -   *Example Tailwind classes for hero images*: `mix-blend-multiply opacity-50` layered under a `bg-gradient-to-br from-primary to-sovereign-blue`.
    -   Alternatively, images can be manually tinted in an editor before uploading.
3.  **Generated Assets**: Some placeholder images have been generated and placed in `public/images/stock/`. These already follow the color and thematic guidelines.
