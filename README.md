# Personal Website

Personal portfolio for **Chasen Young**, an Information Systems graduate and IT specialist. The site is built with [Astro](https://astro.build/) using the [devportfolio](https://github.com/RyanFitzgerald/devportfolio) theme and Tailwind CSS, and it is deployed as a static site to GitHub Pages.

## Tech Stack

- **Astro 5** with static output
- **Tailwind CSS v4** via the Vite plugin
- **Astro content collections** for Markdown blog posts
- **GitHub Pages** for hosting

There is no server, database, or API. The blog is fully Markdown-driven.

## Project Structure

```
client/
├── public/              # Static files such as the favicon
├── src/
│   ├── assets/images/   # Optimized, imported images
│   ├── components/      # Header, Hero, About, Projects, etc.
│   ├── content/blog/    # Markdown blog posts
│   ├── data/            # Interests/hobby content
│   ├── layouts/         # Shared page layout
│   ├── pages/           # Home, About, Blog, 404
│   ├── styles/          # Tailwind entry point
│   ├── config.ts        # Site content and metadata
│   └── content.config.ts
└── astro.config.mjs
```

## Local Development

### Prerequisites

- Node.js 20.19.5 or newer (Node 22 recommended)
- npm

### Setup

```bash
cd client
npm install
npm run dev
```

The site runs at <http://localhost:4321/PersonalWebsite/>.

### Build

```bash
cd client
npm run build
npm run preview
```

The production output is written to `client/dist/`.

## Adding a Blog Post

Create a Markdown file in `client/src/content/blog/` with a human-readable filename, such as `my-first-post.md`. The post will be available at `/PersonalWebsite/blog/my-first-post/`.

```md
---
title: "My First Post"
topic: "Web Development"
author: "Chasen Young"
pubDate: 2026-11-08
description: "A short summary of the post."
draft: false
---

Your content here.
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yaml`. The workflow builds the site and deploys `client/dist/` to GitHub Pages.

The deployed commit hash is passed to the build as `PUBLIC_COMMIT_HASH` and displayed in the footer.

The live site is available at <https://lincolntex.github.io/PersonalWebsite>.
