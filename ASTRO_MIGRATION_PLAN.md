# Astro Migration Plan — DevPortfolio Theme

**Project:** PersonalWebsite  
**Current frontend:** React 18 + Vite 5 SPA  
**Target frontend:** Astro 5 + Tailwind CSS v4, based on [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio)  
**Target backend:** None — fully static, self-contained site  
**Blog:** Markdown files rendered with Astro content collections  
**Deployment:** GitHub Pages project site  
**Live URL:** <https://lincolntex.github.io/PersonalWebsite>  
**Status:** Ready for implementation (accent assumption + 2 minor open questions)  
**Last updated:** 2026-11-08

---

## Revision Notes

This version incorporates the following decisions:

1. **Remove the server entirely.** The Fastify server, PostgreSQL schema, API routes, Docker setup, and API test collection will be deleted. This migration produces a self-contained static site.
2. **Preserve content, not the old design.** All existing Home, About, Education, Work, Projects, and hobby content will be carried over into the modern `devportfolio` Astro theme.
3. **Blog will be Markdown.** Blog posts become `.md` files in `src/content/blog/`. The API-backed create/delete workflow is removed.
4. **Content decisions confirmed:**
   - Hero name: **Chasen Young**
   - Hero subtitle: **Information Systems Graduate and IT specialist**
   - Accent color: keep the theme default for now (assumed; if the old teal was intended, set `accentColor` to `teal`).
   - About content: keep it on a separate `/about/` page.
   - Skills: add **Git** to the list.
   - Blog: no existing posts to migrate; start with an empty blog.
   - Images: use `HomeHeroIMG` in the hero and `aboutHeroIMG` on the About page.
   - Blog slugs: human-readable.
   - Footer: keep the commit hash.

---

## 1. Executive Summary

Replace the current React + Vite SPA in `client/` with the **devportfolio** Astro theme, then port all existing personal content into the theme's configuration and content collections.

The result is a modern, single-page portfolio with additional pages for the expanded About/Interests content and the Markdown blog. The site remains fully static and deploys to GitHub Pages at:

`https://lincolntex.github.io/PersonalWebsite/`

### What changes

- React, Vite, react-router, Bootstrap, and react-bootstrap are removed.
- The `server/` directory and all database/API code are removed.
- The old visual design is replaced by the devportfolio theme.
- The Blog page becomes a Markdown-driven static section.
- GitHub Pages deployment moves to the official Pages Actions workflow.

### What stays

- All personal content: intro, education, work history, projects, hobbies, images, and contact links.
- The public URL and GitHub Pages hosting model.
- The blog concept, now implemented with Markdown instead of an API.

---

## 2. Goals and Non-Goals

### Goals

- Adopt the modern `devportfolio` Astro + Tailwind design.
- Preserve all existing content, including text and images.
- Remove the server, database, and all backend dependencies.
- Implement the blog as Markdown content collections.
- Keep the site fully static and self-contained.
- Fix direct navigation/refresh on nested routes on GitHub Pages.
- Deploy automatically from `main` with GitHub Actions.
- Reduce shipped JavaScript to only the theme's small navigation/scroll scripts.
- Improve image handling, SEO metadata, accessibility, and mobile navigation.

### Non-Goals

- Keeping the Fastify server, PostgreSQL database, or any backend in the repository.
- Preserving the old React layout or Bootstrap styling.
- Adding a CMS, authentication, comments, or live blog authoring.
- Server-side rendering. The site is static (`output: 'static'`).
- Replacing the server with another backend. The final repository is frontend-only.

---

## 3. Current State Analysis

### 3.1 Repository layout

```text
PersonalWebsite/
├── .github/
│   └── workflows/
│       └── deploy.yaml          # Builds client/, publishes client/dist to gh-pages
├── client/                      # React + Vite SPA (will be replaced by the theme)
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── public/                  # Extensionless hero/activity images
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── router.jsx
│       ├── const.js
│       ├── styles.css
│       ├── assets/
│       ├── Components/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── util/
├── server/                      # Fastify + PostgreSQL API (will be deleted)
├── package-lock.json            # Stray empty root lockfile (will be deleted)
└── README.md
```

### 3.2 Current frontend stack

| Concern | Current implementation | Migration outcome |
| --- | --- | --- |
| Framework | React 18 | Removed; Astro theme |
| Build tool | Vite 5 | Astro 5 with Vite under the hood |
| Routing | `react-router-dom` v6 | Astro file-based routing |
| UI library | Bootstrap 5 + `react-bootstrap` | Tailwind CSS v4 |
| Styling | Plain CSS per component | Theme's Tailwind styles + small custom CSS |
| Data | Static arrays in `src/Components/data/data.jsx` | Theme `src/config.ts` + `src/data/interests.ts` |
| Blog data | `fetch('/blogs')` against local API | Markdown content collections |
| Images | `public/` files without extensions | `src/assets/images/` with Astro `<Image />` |
| Build metadata | `__COMMIT_HASH__` via Vite define | `PUBLIC_COMMIT_HASH` env var, displayed in footer |
| Deployment | `peaceiris/actions-gh-pages@v3` | Official GitHub Pages Actions |

### 3.3 Routes

| Current route | Current page | New route |
| --- | --- | --- |
| `/PersonalWebsite/` | Client-side redirect to `/home` | `/PersonalWebsite/` (theme home) |
| `/PersonalWebsite/home` | Home | `/PersonalWebsite/` + legacy redirect |
| `/PersonalWebsite/about` | About/hobbies | `/PersonalWebsite/about/` |
| `/PersonalWebsite/blog` | Blog list + create modal | `/PersonalWebsite/blog/` |
| `/PersonalWebsite/blog/:uuid` | Blog detail from API | `/PersonalWebsite/blog/<slug>/` |

### 3.4 Content inventory to preserve

This is the source-of-truth checklist for the migration. No content should be dropped.

#### Site identity and hero

- Name: **Chasen Young**
- Subtitle: **Information Systems Graduate and IT specialist**
- Home hero description:
  > A graduate of the University of Nevada, Reno with a Bachelors of Science in Information Systems working toward a career in Web Development.
- About hero description:
  > Who am I really? Here are some hobbies and interests I enjoy during my free time.
- Contact links:
  - Email: `chasen.m.young@gmail.com`
  - GitHub: `https://github.com/Lincolntex`
  - LinkedIn: `https://www.linkedin.com/in/chasen-young-13y7189/`
- Footer build hash: currently `__COMMIT_HASH__`; preserve it in the new footer via `PUBLIC_COMMIT_HASH`.

#### Education

- **University of Nevada, Reno**
- **Bachelors of Science in Information Systems**
- **Aug 2020 – May 2024**
- Description: coursework and experience with computer/tech repair and troubleshooting, HTML, CSS, JavaScript, C#, SQL, and the React framework.

#### Work experience

| Company | Title | Date range | Content to preserve |
| --- | --- | --- | --- |
| Clear Capital | Customer Service Rep 1 | Jan 2022 – Current | Complex reporting software (Jaspersoft), soft skills, attention to detail |
| Chime | Member Support Rep | Feb 2021 – Nov 2021 | Finance/accounting exposure, ticket handling, CRM software, time management, sensitive information handling |
| Tesla | Production Associate | March 2018 – March 2019 | Troubleshooting/fixing production line equipment, deadlines, quotas |
| Army National Guard | Heavy Equipment Operator | Feb 2011 – Feb 2019 | Staying level-headed under stress, teamwork, discipline, initiative |

#### Projects

| Project | Date range | Link | Content to preserve |
| --- | --- | --- | --- |
| Sandy Valley Website | Aug 2023 – Dec 2023 | None (not hosted) | Managed a small team building a website for Sandy Valley, Nevada; simple, easy-to-maintain site to improve the town's online presence and information sharing |
| UNR College of Business Advisor Bot | Aug 2023 – Dec 2023 | `www.unr.edu` | Product Owner for a small team building a chatbot to answer student questions about major checklists and reduce advising appointments |

#### About / interests

| Section | Item | Image | Content to preserve |
| --- | --- | --- | --- |
| Play Music | Guitar & Vocals | `PlayMusicIMG` | Shower singer, guitar since high school, ~15 years off and on, folk/country/rock covers, original songs, open mic interest |
| Outdoor Adventures | Offroading | `OffroadActivityIMG` | Northern Nevada trails, friend's 4Runner, lookouts, hidden hot springs, exploring until sunrise |
| Outdoor Adventures | Fishing | `OutdoorActivitiesIMG` | Fishing with dad for bass, trout, and catfish; family memories; "A bad day fishing beats a good day of anything else" |
| Tech/Gaming | PC & Gaming | `TechGamingIMG` | Love of technology, self-taught troubleshooting, FPS/RPG games |
| Tabletop Gaming | Dungeons and Dragons | `TabletopGamingIMG` | New hobby, learned to DM, building first campaign, excited to start |

> `ACTIVITY_CARD_DATA` in the current data file is unused by the rendered About page. It can be omitted unless its content is intentionally revived.

#### Images

| Current file | Size | New name |
| --- | --- | --- |
| `HomeHeroIMG` | ~605 KB | `home-hero.jpg` |
| `aboutHeroIMG` | ~213 KB | `about-hero.jpg` |
| `OffroadActivityIMG` | ~196 KB | `offroad.jpg` |
| `OutdoorActivitiesIMG` | ~1.0 MB | `outdoor-activities.jpg` |
| `PlayMusicIMG` | ~229 KB | `play-music.jpg` |
| `TabletopGamingIMG` | ~143 KB | `tabletop-gaming.jpg` |
| `TechGamingIMG` | ~515 KB | `tech-gaming.jpg` |

### 3.5 Blog and server context

The current Blog page depends on the local Fastify/PostgreSQL server and is non-functional in production. The server exposes `GET/POST/PATCH/DELETE /blogs` routes, but GitHub Pages cannot host it.

**Decision:** Remove the server and database entirely. Replace the blog with Markdown content collections. There are no existing blog posts to preserve, so the new blog starts empty and no database export is required.

### 3.6 Current deployment

The existing workflow:

1. Runs on push to `main`.
2. Installs and builds `client/`.
3. Uploads `client/dist` as an artifact.
4. Publishes it to the `gh-pages` branch with `peaceiris/actions-gh-pages`.

Important constraints:

- This is a **GitHub Pages project site**, served under `/PersonalWebsite/`, not `/`.
- Astro must know the origin (`site`) and the subpath (`base`).
- Astro emits `_astro/`; if deploying from a branch, `.nojekyll` is required.
- The devportfolio theme uses root-absolute paths such as `/favicon.svg`, which must be made base-aware.

### 3.7 Theme analysis

The `devportfolio` theme is a strong fit for the requested modern redesign:

- **Astro 5** static site.
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first configuration; no `tailwind.config.js` in the current repo).
- **TypeScript** for `src/config.ts` and `tsconfig.json`.
- **Single-page layout:** `Header`, `Hero`, `About`, `Projects`, `Experience`, `Education`, `Footer`.
- **Configuration-driven content:** name, title, description, accent color, social links, about text, skills, projects, experience, and education all live in `src/config.ts`.
- **No blog or multi-page support out of the box.** Both must be added.
- **No profile image by default.** The hero is text-only; the existing portrait images should be added.
- **Desktop-only header navigation** (`hidden md:block`). A mobile menu should be added.
- **MIT licensed.** Keep the theme's license/attribution.

The theme's README mentions `tailwind.config.js`, but the actual repository uses Tailwind v4 with the Vite plugin and `@import "tailwindcss"` in `src/styles/global.css`. Follow the actual repository structure.

---

## 4. Target Architecture

### 4.1 Repository layout after migration

```text
PersonalWebsite/
├── .github/
│   └── workflows/
│       └── deploy.yaml          # Official GitHub Pages build + deploy
├── client/                      # Astro + Tailwind portfolio
│   ├── astro.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── LICENSE.md               # Theme MIT license/attribution
│   ├── public/
│   │   ├── .nojekyll
│   │   ├── favicon.svg
│   │   └── robots.txt
│   └── src/
│       ├── assets/
│       │   └── images/
│       │       ├── home-hero.jpg
│       │       ├── about-hero.jpg
│       │       ├── offroad.jpg
│       │       ├── outdoor-activities.jpg
│       │       ├── play-music.jpg
│       │       ├── tabletop-gaming.jpg
│       │       └── tech-gaming.jpg
│       ├── components/
│       │   ├── Header.astro      # Theme + page links + mobile menu
│       │   ├── Hero.astro        # Theme + profile image
│       │   ├── About.astro       # Theme
│       │   ├── Projects.astro    # Theme + optional date range
│       │   ├── Experience.astro  # Theme
│       │   ├── Education.astro   # Theme
│       │   ├── Interests.astro   # New: hobby cards with images
│       │   ├── Footer.astro      # Theme + Blog link + commit hash
│       │   └── BlogCard.astro    # New: blog list card
│       ├── content/
│       │   └── blog/
│       │       └── *.md
│       ├── content.config.ts      # Content collection schema (Astro 5)
│       ├── data/
│       │   └── interests.ts      # Hobby content + image imports
│       ├── layouts/
│       │   └── BaseLayout.astro  # Shared head, header, footer
│       ├── pages/
│       │   ├── index.astro       # Home: Hero + About + Projects + Experience + Education
│       │   ├── home.astro        # Legacy redirect to /
│       │   ├── about.astro       # About + Interests
│       │   ├── 404.astro
│       │   └── blog/
│       │       ├── index.astro
│       │       └── [slug].astro
│       ├── styles/
│       │   └── global.css        # Tailwind import + theme tokens
│       ├── config.ts             # Theme site configuration
│       └── utils/
│           └── with-base.ts      # Base-aware URL helper
├── README.md
└── (server/ removed)
```

### 4.2 Page structure

| Page | Content |
| --- | --- |
| `/` | Theme one-page portfolio: Hero, About, Projects, Experience, Education |
| `/about/` | Expanded About page: intro + Interests sections with images |
| `/blog/` | Markdown post list |
| `/blog/<slug>/` | Markdown post detail |
| `/404.html` | Custom not-found page |

The old `/about` URL is preserved as a dedicated page. This keeps the home page focused like the theme while retaining all hobby content.

### 4.3 Navigation

Recommended header/footer navigation:

- **Home** → `/PersonalWebsite/`
- **About** → `/PersonalWebsite/about/`
- **Projects** → `/PersonalWebsite/#projects`
- **Experience** → `/PersonalWebsite/#experience`
- **Education** → `/PersonalWebsite/#education`
- **Blog** → `/PersonalWebsite/blog/`

Anchor links must be base-aware so they work from `/about/` and `/blog/`. Add a responsive mobile menu because the theme's header is hidden below the `md` breakpoint.

### 4.4 Rendering and styling model

- `output: 'static'`.
- Tailwind CSS v4 via `@tailwindcss/vite`.
- Theme accent color configured in `src/config.ts`.
- Blog body uses `@tailwindcss/typography` (`prose` classes) so Markdown renders nicely inside Tailwind's reset.
- Keep the theme's IBM Plex Mono font for visual consistency. Optionally self-host it later.
- No React, Bootstrap, react-bootstrap, or react-router dependencies.

### 4.5 Blog model

- Posts live in `src/content/blog/*.md` with human-readable filenames.
- The initial collection is empty; the blog index shows an empty state until the first post is added.
- Frontmatter schema: `title`, `topic`, `author`, `pubDate`, `updatedDate`, `description`, `draft`, optional `heroImage`.
- `src/pages/blog/index.astro` lists non-draft posts.
- `src/pages/blog/[slug].astro` renders each post with `render(post)`.
- No create/delete UI, no API, no database.
- Authoring workflow: add a Markdown file, commit, push.

### 4.6 Base-path strategy

The theme assumes the site is served from `/`. This project is served from `/PersonalWebsite/`. Every internal URL must use the base path.

```ts
// src/utils/with-base.ts
export function withBase(path = '') {
  const base = import.meta.env.BASE_URL; // "/PersonalWebsite/"
  return `${base}${path.replace(/^\/+/, '')}`;
}
```

Use `withBase()` for:

- Header/footer links.
- Favicon and static public assets.
- Blog links and post links.
- The legacy redirect target.

Anchor links like `withBase('#projects')` resolve to `/PersonalWebsite/#projects`.

---

## 5. Key Decisions

| Decision | Recommendation | Rationale |
| --- | --- | --- |
| Design direction | Adopt `devportfolio` theme | Requested modern look; theme is Astro + Tailwind and config-driven |
| Content approach | Preserve all content, remap into theme | User requirement; old layout/styling is intentionally replaced |
| Server | Delete `server/` entirely | Static-only migration; no backend replacement |
| Blog | Markdown content collections | Works on GitHub Pages; no API/database |
| Styling | Tailwind CSS v4 | Native to the theme; removes Bootstrap |
| Accent color | Keep the theme default `#1d4ed8` | Assumed; use `teal` if the old accent was intended |
| React | Remove completely | Theme is Astro-only; no islands needed |
| About content | Dedicated `/about/` page | Preserves old URL and keeps home focused |
| Blog location | `/blog/` | Preserves existing route concept |
| Base path | `/PersonalWebsite` | GitHub Pages project site |
| Deployment | Official Pages Actions | Modern, no `gh-pages` branch, avoids Jekyll issues |
| Commit hash | Keep `PUBLIC_COMMIT_HASH` in footer | User confirmed it should remain |
| Theme license | Keep `LICENSE.md` / attribution | MIT compliance |

---

## 6. Content Mapping to the Theme

### 6.1 `src/config.ts`

| Theme field | Source content |
| --- | --- |
| `name` | Chasen Young — used as the Hero heading |
| `title` | Information Systems Graduate and IT specialist — used as the Hero subtitle |
| `description` | New site description, e.g. "Personal portfolio of Chasen Young, Information Systems graduate and IT specialist." |
| `accentColor` | Keep the theme default `#1d4ed8` for now (assumption; use `teal` if the old accent was intended) |
| `social.email` | `chasen.m.young@gmail.com` |
| `social.github` | `https://github.com/Lincolntex` |
| `social.linkedin` | `https://www.linkedin.com/in/chasen-young-13y7189/` |
| `social.twitter` | Omit unless a profile exists |
| `heroSummary` | Existing home hero description |
| `aboutMe` | Existing About intro: "Who am I really? Here are some hobbies and interests I enjoy during my free time." |
| `skills` | JavaScript, React, HTML, CSS, C#, SQL, Git |
| `projects` | Sandy Valley Website, UNR College of Business Advisor Bot |
| `experience` | Clear Capital, Chime, Tesla, Army National Guard |
| `education` | University of Nevada, Reno — B.S. Information Systems |

The theme's `projects` and `experience` types may need small extensions:

- Add optional `dateRange` to projects so the existing project dates are preserved.
- Keep the existing `dateRange` field on experience.
- Convert each experience paragraph into 1–3 `bullets` without dropping information.
- Convert the education paragraph into `achievements` bullets.

Three theme adjustments are needed to preserve the existing content:

- The theme's `Hero.astro` renders `I'm {name}` as the heading. If the heading should read exactly **Chasen Young**, remove the `I'm ` prefix. Set `siteConfig.name = "Chasen Young"` and `siteConfig.title = "Information Systems Graduate and IT specialist"`.
- Add a `heroSummary` field to `siteConfig` and render the existing home hero paragraph beneath the subtitle, or move that paragraph into the About section.
- The theme's `Footer.astro` renders all social links unconditionally. Make Twitter optional/conditional so omitting it does not produce a broken link.

### 6.2 `src/data/interests.ts`

Create a typed data file for the hobby content and image imports:

```ts
import playMusic from '../assets/images/play-music.jpg';
import offroad from '../assets/images/offroad.jpg';
import outdoorActivities from '../assets/images/outdoor-activities.jpg';
import techGaming from '../assets/images/tech-gaming.jpg';
import tabletopGaming from '../assets/images/tabletop-gaming.jpg';

export const interestSections = [
  {
    title: 'Play Music',
    items: [
      {
        heading: 'Guitar & Vocals',
        content: '...existing content...',
        image: playMusic,
        alt: 'Playing guitar and singing',
      },
    ],
  },
  // Outdoor Adventures, Tech/Gaming, Tabletop Gaming...
];
```

### 6.3 Images

- Rename extensionless files with proper extensions.
- Move them to `src/assets/images/` so Astro can optimize and fingerprint them.
- Use the Astro `<Image />` component with explicit dimensions and `alt` text.
- Use `HomeHeroIMG` as the hero portrait.
- Use `aboutHeroIMG` on the About page.
- Optimize `OutdoorActivitiesIMG` (about 1 MB) and `HomeHeroIMG` (about 600 KB) during the move.

### 6.4 Footer

The theme footer already includes name, title, social links, navigation, and copyright. Add:

- A **Blog** link.
- The commit hash using `PUBLIC_COMMIT_HASH`.
- Keep the existing social URLs.

---

## 7. Migration Phases

### Phase 0 — Preparation and backup

**Goal:** Create a reversible starting point before replacing the frontend and deleting the server.

- [ ] Create a migration branch: `git checkout -b astro-migration`.
- [ ] Tag the current state: `git tag pre-astro-migration`.
- [ ] Capture screenshots of the current Home and About pages for content reference.
- [ ] No existing blog posts to preserve; the new blog starts empty.
- [ ] Confirm the theme's MIT license and decide how to preserve attribution.
- [ ] Review the confirmed content decisions in the Revision Notes.

**Exit criteria:** A migration branch, a backup tag, and no outstanding content decisions.

---

### Phase 1 — Replace the React client with the Astro theme

**Goal:** Establish the theme as the new `client/` application.

- [ ] Download the theme into a temporary directory:

```bash
npx degit RyanFitzgerald/devportfolio#master ../devportfolio-theme
```

- [ ] Copy the theme's application files into `client/`, excluding `.git`:

```text
astro.config.mjs
package.json
package-lock.json
tsconfig.json
public/
src/
LICENSE.md
```

- [ ] Remove the old React/Vite files:

```text
client/index.html
client/vite.config.js
client/src/main.jsx
client/src/App.jsx
client/src/router.jsx
client/src/const.js
client/src/Components/
client/src/hooks/
client/src/pages/
client/src/types/
client/src/util/
client/src/assets/react.svg
client/public/vite.svg
```

- [ ] Merge `.gitignore` entries from the theme with the repository's existing `.gitignore`.
- [ ] Extract `src/layouts/BaseLayout.astro` from the theme's `src/pages/index.astro` so the head, header, and footer can be shared by the new About and Blog pages. Update `index.astro` to use the layout.
- [ ] Rename the package in `client/package.json` to `personalwebsite`.
- [ ] Add the integrations and dependencies needed for this project:

```bash
cd client
npm install
npx astro add sitemap
npm install -D @tailwindcss/typography
```

- [ ] Update `client/astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lincolntex.github.io',
  base: '/PersonalWebsite',
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] Add `.nojekyll` to `client/public/`.
- [ ] Verify the theme runs at `http://localhost:4321/PersonalWebsite/`.
- [ ] Confirm no React, Bootstrap, or react-router dependencies remain in `package.json`.

**Exit criteria:** The unmodified theme builds and previews under the correct base path.

---

### Phase 2 — Port site content into the theme

**Goal:** Replace the theme's placeholder content with all existing personal content.

- [ ] Edit `src/config.ts` with the identity, social links, about text, skills, projects, experience, and education from the content inventory.
- [ ] Set `name` to **Chasen Young** and `title` to **Information Systems Graduate and IT specialist**.
- [ ] Set `skills` to JavaScript, React, HTML, CSS, C#, SQL, and Git.
- [ ] Add the existing home hero paragraph as `heroSummary` and render it in `Hero.astro` (or move it into the About section).
- [ ] Make optional social links conditional in `Footer.astro`.
- [ ] Convert the work experience paragraphs into bullet lists.
- [ ] Convert the education paragraph into achievement bullets.
- [ ] Add project date ranges and preserve both project descriptions.
- [ ] For projects without a link (Sandy Valley Website), use the theme's no-link rendering path.
- [ ] For the UNR Advisor Bot, use the existing `www.unr.edu` link.
- [ ] Verify every sentence from the content inventory is represented.
- [ ] Add the existing portrait images:
  - [ ] Hero portrait using `home-hero.jpg`.
  - [ ] About portrait using `about-hero.jpg`.
- [ ] Add `alt` text for every image.
- [ ] Wire the footer commit hash to `PUBLIC_COMMIT_HASH`.

**Exit criteria:** The home page contains all identity, education, work, and project content in the new theme.

---

### Phase 3 — Build the About/Interests page

**Goal:** Preserve the old About page content in the new design.

- [ ] Create `src/data/interests.ts` with the four sections and five hobby items.
- [ ] Create `src/components/Interests.astro` using theme-compatible Tailwind cards.
- [ ] Create `src/pages/about.astro` with:
  - [ ] About hero image and intro.
  - [ ] `Interests` sections: Play Music, Outdoor Adventures, Tech/Gaming, Tabletop Gaming.
- [ ] Use Astro `<Image />` for all hobby images.
- [ ] Ensure the page is responsive and uses the theme's spacing/typography.
- [ ] Add `/about/` to the header and footer navigation.
- [ ] Add a legacy `/home` redirect to `/PersonalWebsite/`.

**Exit criteria:** `/PersonalWebsite/about/` contains all hobby content and images in the new design.

---

### Phase 4 — Build the Markdown blog

**Goal:** Replace the API blog with static Markdown content.

- [ ] Create `src/content.config.ts` using Astro 5's content layer API:

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

> The theme uses Astro 5, so use `src/content.config.ts` with the `glob()` loader and `z` from `astro/zod`. Do not use the older Astro 4 `src/content/config.ts` + `type: 'content'` format.

- [ ] Add Markdown posts to `src/content/blog/` as needed, using human-readable filenames such as `my-first-post.md`. The generated URL will be `/blog/my-first-post/`.
- [ ] The initial blog starts empty. There are no existing posts to migrate, so no UUID redirects are needed.
- [ ] Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { withBase } from '../../utils/with-base';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<BaseLayout title="Blog | Chasen Young">
  <section class="p-8 sm:p-12 md:p-16 lg:p-24">
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900">Blog</h1>
    <div class="mt-12 space-y-6">
      {posts.map((post) => (
        <a
          class="block rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          href={withBase(`blog/${post.id}/`)}
        >
          <p class="text-sm text-gray-500">{post.data.topic}</p>
          <h2 class="mt-2 text-2xl font-bold text-gray-900">{post.data.title}</h2>
          <p class="mt-2 text-gray-600">{post.data.description}</p>
          <p class="mt-4 text-sm text-gray-500">
            {post.data.author} · {post.data.pubDate.toLocaleDateString()}
          </p>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BaseLayout title={`${post.data.title} | Chasen Young`}>
  <article class="mx-auto max-w-3xl p-8 sm:p-12 md:p-16">
    <p class="text-sm text-gray-500">{post.data.topic}</p>
    <h1 class="mt-2 text-4xl md:text-6xl font-bold text-gray-900">
      {post.data.title}
    </h1>
    <p class="mt-4 text-gray-500">
      {post.data.author} · {post.data.pubDate.toLocaleDateString()}
    </p>
    <div class="prose prose-lg mt-10 max-w-none">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] Add the typography plugin to `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

body {
  font-family: 'IBM Plex Mono', monospace;
}
```

- [ ] Add an empty-state message when there are no posts.
- [ ] Remove all old blog components, hooks, types, and the create/delete modal.
- [ ] Add a **Blog** link to the header and footer (or hide it until the first post, per the open question).
- [ ] Optionally add an RSS feed with `@astrojs/rss`.

**Exit criteria:** `/PersonalWebsite/blog/` lists posts and each post renders statically without any API.

---

### Phase 5 — Customize the theme and fix base-path behavior

**Goal:** Make the theme work correctly as a GitHub Pages project site.

- [ ] Finalize the shared `src/layouts/BaseLayout.astro` created in Phase 1 so every page shares the same head, header, and footer.
- [ ] Update the favicon path:

```astro
<link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
```

- [ ] Replace all internal links with `withBase()`.
- [ ] Update the header:
  - [ ] Home link.
  - [ ] About page link.
  - [ ] Projects/Experience/Education anchors that work from other pages.
  - [ ] Blog link.
  - [ ] Responsive mobile menu (the theme's header is desktop-only).
- [ ] Update the footer navigation the same way.
- [ ] Add the theme's accent color consistently to new components.
- [ ] Add page titles and descriptions via layout props.
- [ ] Add Open Graph/Twitter metadata.
- [ ] Add `public/robots.txt` pointing at the sitemap.
- [ ] Add `src/pages/404.astro`.
- [ ] Verify the theme's scroll header script still works with the new navigation.
- [ ] Audit the theme for accessibility:
  - [ ] Mobile navigation keyboard support.
  - [ ] Focus states.
  - [ ] Image alt text.
  - [ ] Heading hierarchy.
  - [ ] Color contrast.

**Exit criteria:** All pages work under `/PersonalWebsite/`, including direct navigation and mobile layout.

---

### Phase 6 — Remove the server and old application code

**Goal:** Leave a self-contained static repository.

- [ ] No existing blog posts to export; the blog starts empty.
- [ ] Delete the `server/` directory entirely:
  - [ ] `server/server.js`
  - [ ] `server/routes/`
  - [ ] `server/services/`
  - [ ] `server/infra/`
  - [ ] `server/APItest/`
  - [ ] `server/package.json`
  - [ ] `server/package-lock.json`
- [ ] Delete the stray root `package-lock.json`.
- [ ] Remove all server, database, Docker, and API references from `README.md`.
- [ ] Remove any remaining API proxy or server-related configuration from `client/`.
- [ ] Remove unused old assets and template files.
- [ ] Search the repository for stale references:

```bash
rg -i "fastify|postgres|docker|localhost:8080|react-bootstrap|react-router|__COMMIT_HASH__|/blogs"
```

- [ ] Update the README:
  - [ ] Astro + Tailwind architecture.
  - [ ] Local development with `cd client && npm install && npm run dev`.
  - [ ] Build and preview commands.
  - [ ] Markdown blog authoring.
  - [ ] GitHub Pages deployment.
  - [ ] Theme attribution.

**Exit criteria:** No server code, database code, API references, React, or Bootstrap remain.

---

### Phase 7 — Configure GitHub Pages deployment

**Goal:** Deploy the static Astro build through the official Pages workflow.

- [ ] Replace `.github/workflows/deploy.yaml`:

```yaml
name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: client/package-lock.json

      - name: Install dependencies
        working-directory: client
        run: npm ci

      - name: Build
        working-directory: client
        run: npm run build
        env:
          PUBLIC_COMMIT_HASH: ${{ github.sha }}

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: client/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] In GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
- [ ] Ensure `client/package-lock.json` is committed for `npm ci`.
- [ ] Keep `public/.nojekyll` in the output.
- [ ] Remove the old `peaceiris` workflow.
- [ ] Optionally delete the old `gh-pages` branch after verification, keeping a backup tag first.

**Exit criteria:** A push to `main` builds and deploys the Astro site successfully.

---

### Phase 8 — Verification, cutover, and cleanup

**Goal:** Confirm the new site is complete and remove obsolete artifacts.

- [ ] Merge the migration branch into `main`.
- [ ] Watch the GitHub Actions run complete.
- [ ] Verify the deployed site:
  - [ ] `/PersonalWebsite/` loads the new home page.
  - [ ] `/PersonalWebsite/about/` loads directly and on refresh.
  - [ ] `/PersonalWebsite/blog/` loads directly and on refresh.
  - [ ] `/PersonalWebsite/blog/<slug>/` loads directly and on refresh once a post exists.
  - [ ] `/PersonalWebsite/home` redirects to `/PersonalWebsite/`.
  - [ ] Unknown URLs render the custom 404 page.
  - [ ] All images load from `_astro/` with correct hashed URLs.
  - [ ] Navigation works on mobile and desktop.
  - [ ] Social links and email link work.
  - [ ] Commit hash displays correctly.
- [ ] Compare content against the content inventory in section 3.4 line by line.
- [ ] Run Lighthouse on Home, About, and Blog.
- [ ] Run a link checker against the deployed site.
- [ ] Confirm no server or API requests occur in the browser.
- [ ] Confirm the repository has no `server/` directory.
- [ ] Update the README and commit.
- [ ] Remove the migration branch or keep it as an archive.

**Exit criteria:** The production site is fully static, content-complete, and deployable from `main`.

---

## 8. File-by-File Mapping

| Current file/directory | Target | Action |
| --- | --- | --- |
| `client/index.html` | `client/src/layouts/BaseLayout.astro` + `src/pages/index.astro` | Replace with theme layout/page |
| `client/vite.config.js` | `client/astro.config.mjs` | Replace with Astro config |
| `client/package.json` | `client/package.json` | Replace with theme dependencies/scripts |
| `client/src/main.jsx` | — | Delete |
| `client/src/App.jsx` | `src/pages/index.astro` | Delete; theme home replaces it |
| `client/src/router.jsx` | `src/pages/*` | Delete; Astro file routing replaces it |
| `client/src/const.js` | `src/utils/with-base.ts` | Replace with base-aware helper |
| `client/src/pages/home/home.jsx` | `src/pages/index.astro` + `src/config.ts` | Port content to theme |
| `client/src/pages/about/about.jsx` | `src/pages/about.astro` + `src/data/interests.ts` | Port content and images |
| `client/src/pages/blog/blog.jsx` | `src/pages/blog/index.astro` | Replace with Markdown list |
| `client/src/pages/blog/blog-details-page.jsx` | `src/pages/blog/[slug].astro` | Replace with static paths |
| `client/src/Components/app-layout/*` | `src/layouts/BaseLayout.astro` | Replace with theme layout |
| `client/src/Components/header/*` | `src/components/Header.astro` | Replace with theme header + nav |
| `client/src/Components/footer/*` | `src/components/Footer.astro` | Replace with theme footer |
| `client/src/Components/section/*` | Theme sections | Delete; theme sections replace |
| `client/src/Components/card/*` | Theme cards | Delete; Tailwind cards replace |
| `client/src/Components/homeHero/*` | `src/components/Hero.astro` | Replace with theme hero + image |
| `client/src/Components/aboutHero/*` | `src/pages/about.astro` | Replace with About hero |
| `client/src/Components/blogs/*` | `src/pages/blog/*` + `BlogCard.astro` | Replace with Markdown rendering |
| `client/src/Components/Modals/*` | — | Delete |
| `client/src/hooks/*` | — | Delete |
| `client/src/types/blog.js` | `src/content.config.ts` | Replace with Zod schema |
| `client/src/Components/data/data.jsx` | `src/config.ts` + `src/data/interests.ts` | Port content |
| `client/src/util/load-asset.js` | `src/utils/with-base.ts` | Replace helper |
| `client/src/styles.css` + component CSS | `src/styles/global.css` + Tailwind classes | Replace styling |
| `client/public/*IMG` | `src/assets/images/*` | Rename, optimize, import |
| `client/public/vite.svg` | `public/favicon.svg` | Replace with theme favicon |
| `client/src/assets/react.svg` | — | Delete |
| `client/README.md` | — | Delete or replace with project README |
| `server/` | — | Delete entirely |
| `package-lock.json` (root) | — | Delete |
| `.github/workflows/deploy.yaml` | Same path | Rewrite for Pages Actions |
| `README.md` | Same path | Update architecture and setup |

---

## 9. URL Map and Redirects

| Old URL | New URL | Handling |
| --- | --- | --- |
| `/PersonalWebsite/` | `/PersonalWebsite/` | Theme home |
| `/PersonalWebsite/home` | `/PersonalWebsite/` | `src/pages/home.astro` meta refresh |
| `/PersonalWebsite/about` | `/PersonalWebsite/about/` | Dedicated About/Interests page |
| `/PersonalWebsite/blog` | `/PersonalWebsite/blog/` | Markdown post list |
| `/PersonalWebsite/blog/:uuid` | `/PersonalWebsite/blog/<slug>/` | Human-readable slugs; no existing posts, so no UUID redirects are required |
| Any unknown URL | `/PersonalWebsite/404.html` | Custom 404 page |

---

## 10. Testing and QA Checklist

### Local development

- [ ] `cd client && npm install`
- [ ] `npm run dev`
- [ ] Open `http://localhost:4321/PersonalWebsite/`.
- [ ] Navigate between Home, About, and Blog.
- [ ] Test direct navigation to each nested route.
- [ ] Test at 1440px, 1024px, 768px, and 375px widths.
- [ ] Open the mobile menu and verify keyboard navigation.
- [ ] Confirm no console errors or failed network requests.

### Content parity

- [ ] Hero displays **Chasen Young** and the subtitle **Information Systems Graduate and IT specialist**.
- [ ] The existing hero paragraph is present.
- [ ] About intro is present.
- [ ] All four work entries are present with dates and content.
- [ ] Both projects are present with descriptions and dates.
- [ ] Education is present with dates and content.
- [ ] All five hobby items are present with images and text.
- [ ] Skills include JavaScript, React, HTML, CSS, C#, SQL, and Git.
- [ ] Email, GitHub, and LinkedIn links are correct.
- [ ] No content from `data.jsx` is missing.
- [ ] The empty blog renders its empty-state message.

### Production build

- [ ] `npm run build`
- [ ] Inspect `client/dist/` for `index.html`, `about/index.html`, `blog/index.html`, `404.html`, `_astro/`, and `.nojekyll`. If a post has been added, also verify `blog/<slug>/index.html`.
- [ ] `npm run preview`
- [ ] Repeat route and responsive checks against the preview server.
- [ ] Confirm generated asset URLs start with `/PersonalWebsite/`.
- [ ] Confirm no root-absolute `/assets/...` or `/favicon.svg` paths bypass the base path.

### Deployed site

- [ ] Verify every route directly, including a hard refresh.
- [ ] Verify the legacy `/home` redirect.
- [ ] Verify the 404 page.
- [ ] Verify the footer commit hash.
- [ ] Verify social links and email link.
- [ ] Run Lighthouse on mobile and desktop.
- [ ] Run an HTML/link checker.
- [ ] Confirm the sitemap and `robots.txt` resolve.
- [ ] Confirm no requests to `localhost:8080` or `/blogs`.

### Repository cleanup

- [ ] No `server/` directory.
- [ ] No Fastify, Postgres, Docker, or API references.
- [ ] No React, Bootstrap, react-bootstrap, or react-router dependencies.
- [ ] No stale Vite files.
- [ ] README describes the Astro setup accurately.

---

## 11. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Content loss while remapping into theme config | Medium | High | Use the content inventory checklist; compare line by line |
| Base path misconfiguration breaks theme assets/links | Medium | High | Set `site`/`base`; use `withBase()`; test built output |
| Theme's absolute `/favicon.svg` path breaks on Pages | High | Low | Replace with `import.meta.env.BASE_URL` |
| Theme has no mobile navigation | High | Medium | Add an accessible mobile menu |
| Theme has no blog support | High | Medium | Add content collections and blog pages with theme styling |
| Tailwind typography missing for Markdown | Medium | Medium | Add `@tailwindcss/typography` and `prose` classes |
| Theme's README/config assumptions differ from actual repo | Medium | Low | Follow the actual `package.json`, `astro.config.mjs`, and `global.css` |
| Visual regressions from theme customization | Medium | Medium | Review at all breakpoints; keep changes minimal |
| Large images hurt performance | Medium | Medium | Optimize and use Astro `<Image />` |
| GitHub Pages ignores `_astro/` via Jekyll | Low | High | Deploy via Pages artifact and include `.nojekyll` |
| Workflow permissions fail | Low | Medium | Set `pages: write` and `id-token: write`; configure Pages source |
| Theme license/attribution omitted | Low | Low | Keep `LICENSE.md` and note attribution in README |
| Server deletion is irreversible without Git history | Low | Medium | Tag `pre-astro-migration` before deleting |

---

## 12. Rollback Plan

1. Keep the `pre-astro-migration` tag and the current `gh-pages` branch until the new site is verified.
2. If the migration fails, revert the merge commit on `main`.
3. Restore the previous `.github/workflows/deploy.yaml` from the tag.
4. If Pages was switched to GitHub Actions, switch it back to the `gh-pages` branch.
5. Restore the `server/` directory from the `pre-astro-migration` tag if it is ever needed again.
6. Do not delete the old `gh-pages` branch or the backup tag until production verification passes.

---

## 13. Effort Estimate

| Phase | Estimate |
| --- | --- |
| Phase 0 — Preparation and backup | 1–2 hours |
| Phase 1 — Theme setup and base path | 2–4 hours |
| Phase 2 — Content porting | 1–2 days |
| Phase 3 — About/Interests page | 4–6 hours |
| Phase 4 — Markdown blog | 4–8 hours |
| Phase 5 — Theme customization and base-path fixes | 4–8 hours |
| Phase 6 — Server removal and cleanup | 2–4 hours |
| Phase 7 — GitHub Pages workflow | 2–4 hours |
| Phase 8 — Verification and cutover | 4–6 hours |
| **Total** | **3–5 working days** |

The theme provides the visual foundation, so most effort goes into content mapping, the About page, the blog extension, and base-path/QA work.

---

## 14. Acceptance Criteria

The migration is complete when:

- [ ] The site uses the devportfolio Astro theme and Tailwind styling.
- [ ] The hero displays **Chasen Young** with the subtitle **Information Systems Graduate and IT specialist**.
- [ ] The skills list includes JavaScript, React, HTML, CSS, C#, SQL, and Git.
- [ ] All existing content is preserved: hero text, about intro, education, work history, projects, hobbies, and images.
- [ ] The old React, Vite, Bootstrap, react-router, and react-bootstrap code is gone.
- [ ] The `server/` directory and all database/API code are gone.
- [ ] The blog is fully Markdown-driven and works without a server.
- [ ] Home, About, and Blog pages work on direct navigation and refresh; blog detail pages work once a post is added.
- [ ] The site is served correctly from `/PersonalWebsite/`.
- [ ] The custom 404 page works.
- [ ] Navigation works on mobile and desktop.
- [ ] Images load from optimized, hashed assets with correct extensions.
- [ ] The footer displays the deployed commit hash.
- [ ] The GitHub Actions workflow deploys successfully from `main`.
- [ ] Lighthouse performance and accessibility scores are at least 90 on static pages.
- [ ] The README reflects the new Astro setup and Markdown blog workflow.
- [ ] Theme license/attribution is preserved.
- [ ] A rollback tag and backup deployment remain available.

---

## 15. Remaining Open Questions

1. **Custom domain:** Stay on `lincolntex.github.io/PersonalWebsite`, or plan for a custom domain later?
2. **Blog visibility:** The blog starts empty. Should the Blog link be shown with an empty-state message, or hidden until the first post is added?

---

## 16. References

- DevPortfolio theme: <https://github.com/RyanFitzgerald/devportfolio>
- Astro documentation: <https://docs.astro.build/>
- Astro GitHub Pages deployment: <https://docs.astro.build/en/guides/deploy/github/>
- Astro content collections: <https://docs.astro.build/en/guides/content-collections/>
- Astro image optimization: <https://docs.astro.build/en/guides/images/>
- Tailwind CSS v4: <https://tailwindcss.com/docs>
- Tailwind typography plugin: <https://tailwindcss.com/docs/typography-plugin>
- GitHub Pages custom workflows: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
