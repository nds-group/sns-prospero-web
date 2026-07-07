# PROSPERO Website

Official static website for the PROSPERO project, built with Astro and Tailwind CSS.

PROSPERO focuses on programmable and scalable operations for efficient, resource-aware architecture in 6G networks. The website presents the project vision, objectives, methodology, consortium, deliverables, public outputs, and communication material.

## Site Structure

The site follows the public structure used by related SNS JU project websites:

- `Home`: project logo, vision, scope, and partner preview.
- `Overview`: high-level description of the project and its scope.
- `Objectives & Impact`: UIS 6G architecture, TCO reduction, new revenue streams, and resilience objectives.
- `Methodology`: work plan, iterative flow, and Work Package structure.
- `Consortium`: partner cards with logos, countries, contacts, teams, and project roles.
- `Ethics`: ethics-by-conception, inclusion, responsible AI, and open science.
- `Deliverables`: dynamic Work Package tabs populated from `public/data.json`.
- `Publications`, `Datasets`, `Open-Source Code`, `Press`, `Videos`: placeholder pages ready for public outputs.
- `News & Events`: dynamic news list populated from `public/data.json`.

## Project Files

```text
src/
├── layouts/
│   └── Layout.astro        # Shared page shell, navigation, footer
├── pages/                  # Astro routes
└── styles/
    └── global.css          # Tailwind theme tokens and custom utilities

public/
├── data.json               # Publications, news, deliverables, and partner data
├── images/
│   ├── project-logos/      # PROSPERO logos
│   ├── partners-logos/     # Consortium partner logos
│   ├── eu-logos/           # EU, SNS JU, and country flags
│   └── stock/              # Temporary/stock visual assets
└── images/prospero-*.svg   # Brand texture assets
```

## Data-Driven Sections

Several pages read from `public/data.json` in the browser:

- `deliverables.astro` uses `deliverables.wp1` through `deliverables.wp5`.
- `media.astro` uses `news`.
- `publications.astro` uses `papers`, `posters`, and `zenodo`, and shows an empty state when these arrays are empty.
- `index.astro` uses `partners` for the homepage partner grid.

Keep placeholder arrays empty when no official public output exists yet.

## Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build the production site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

The project requires Node.js `>=22.12.0`.

## Local Workflow Note

Project instructions prefer Astro's background dev server when starting it manually:

```sh
astro dev --background
```

Manage it with:

```sh
astro dev status
astro dev logs
astro dev stop
```

## Visual Guidelines

The current visual identity combines:

- PROSPERO green and sovereign blue palette.
- Project logo and generated brand textures.
- SNS/EU footer attribution.
- Temporary hero background image on internal pages.
- Technology, sustainability, 6G, AI, and ecotech sovereignty themes.

When adding new images, keep them aligned with advanced 6G networking, green infrastructure, AI automation, and clean technology aesthetics.
