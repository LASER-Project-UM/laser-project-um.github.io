LASER WEBSITE — GITHUB PAGES VERSION
====================================

This is a local, GitHub Pages-ready copy of the LASER website source.

For simple, task-based instructions, start with EDITING-GUIDE.txt.

## Where to make edits

Most routine changes can be made without touching page-layout code:

- `EDIT-CONTENT/` — the three plain-text files used to add updates, datasets,
  publications, and conference entries. Start here for routine additions.
- `src/app/content/homeContent.ts` — home-page wording, research cards, images,
  regions, statistics, and resource links.
- `src/app/content/peopleContent.ts` — leadership biographies, portraits,
  current members, and past contributors.
- `src/app/components/home/` — one file for each visible home-page section.
- `src/app/components/people/` — leadership cards and member-list sections.
- `src/app/components/Datasets.tsx`, `Publications.tsx`, `Blog.tsx`, and
  `Connect.tsx` — the smaller standalone pages.
- `src/app/components/Navigation.tsx` and `Footer.tsx` — site-wide navigation
  and footer content.
- `src/assets/` — locally stored photographs, diagrams, portraits, and logos.

`Home.tsx` and `People.tsx` are intentionally short page outlines. Reorder a
section there; edit its contents in the corresponding content file.

## Preview locally

```sh
npm install
npm run dev
```

## Check the production build

```sh
npm run build
npm run preview
```

The Vite configuration uses relative asset paths, and the site uses hash-based
routing so it works from a GitHub Pages project subdirectory without special
server redirects.

## Publish later

No GitHub repository or remote is configured by this copy. When publication is
approved, create or select the repository, push this folder, and enable GitHub
Pages with **GitHub Actions** as the source. The included workflow will build
and deploy the site after pushes to `main`.
