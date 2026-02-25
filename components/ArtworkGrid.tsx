"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/data";
import { Lightbox } from "./Lightbox";

const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com", "picsum.photos"];

function isOptimizedImageUrl(url: string): boolean {
  if (!url || url.startsWith("/")) return true;
  if (url.startsWith("data:")) return false; // data URLs use unoptimized
  return ALLOWED_IMAGE_HOSTS.some((h) => url.includes(h));
}

interface ArtworkGridProps {
  artworks: Artwork[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl columns-1 gap-8 px-6 py-20 sm:columns-2 sm:gap-10 sm:px-8 sm:py-28 md:columns-3 md:gap-12 md:px-12 lg:px-16"
      >
        {artworks.map((artwork) => (
          <motion.article
            key={artwork.id}
            variants={item}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group mb-8 cursor-pointer break-inside-avoid sm:mb-10"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-100 shadow-soft transition-shadow duration-400 group-hover:shadow-soft-lg">
              <Image
                src={artwork.imageUrl || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400"}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
                quality={90}
                unoptimized={!isOptimizedImageUrl(artwork.imageUrl)}
              />
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <p className="font-serif text-lg font-medium tracking-serif-tight text-stone-900">
                {artwork.title}
              </p>
              <p className="text-sm text-stone-500 tracking-wide">
                {artwork.year} · {artwork.medium}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <Lightbox
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  );
}
