/**
 * Site-wide content: change artist name, contact, and metadata here.
 * Used by: Header (name), layout (page title/description), Contact (email, Instagram), About (portrait alt).
 *
 * Other content to edit:
 * - Artworks (titles, years, images): lib/data.ts
 * - About page: biography, statement, CV, portrait image — app/about/page.tsx
 */

export const site = {
  name: "Ella Wright",
  email: "hello@ellawright.art",
  instagram: {
    handle: "ellawrightart",
    url: "https://instagram.com/ellawrightart",
  },
  metadata: {
    title: "Ella Wright | Fine Art",
    description: "Contemporary fine art by Ella Wright.",
  },
} as const;
