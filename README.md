# Ella Wright — Artist Portfolio

A minimal, production-ready artist portfolio built with Next.js (App Router), Tailwind CSS, Framer Motion, and Lucide React.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

- **`/`** — Work: masonry grid of artworks; click to open lightbox
- **`/about`** — Biography, artist statement, CV (Education, Exhibitions, Residencies)
- **`/contact`** — Email, Instagram, contact form

Artwork data lives in `lib/data.ts`. Replace placeholder image URLs and copy with real artwork and content.

## Secret editor

To edit all site content (name, contact, artworks, about, CV) in the browser: go to **Contact**, fill the form with **Name:** edit, **Email:** edit@edit.com, **Message:** edit, and submit. You’ll be taken to `/edit`. Changes are stored in this browser (localStorage). To change the secret, edit `lib/admin-secret.ts`.
# EllaWrightArt
