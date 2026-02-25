"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Artwork } from "@/lib/data";

const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com", "picsum.photos"];

function isOptimizedImageUrl(url: string): boolean {
  if (!url || url.startsWith("/")) return true;
  if (url.startsWith("data:")) return false;
  return ALLOWED_IMAGE_HOSTS.some((h) => url.includes(h));
}

interface LightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function Lightbox({ artwork, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (artwork) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col bg-stone-950"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-10 rounded-full p-2.5 text-stone-400 transition-all duration-300 hover:bg-stone-800/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-950"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="flex flex-1 items-center justify-center p-8 pt-20 pb-36 sm:p-14 sm:pt-24 sm:pb-40">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-full w-full max-h-[72vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={90}
                priority
                unoptimized={!isOptimizedImageUrl(artwork.imageUrl)}
              />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-stone-800/80 bg-stone-950/98 px-6 py-6 backdrop-blur-md sm:px-12">
            <div className="mx-auto flex max-w-5xl flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-serif text-lg font-medium tracking-serif-tight text-white sm:text-xl">
                {artwork.title}
              </p>
              <p className="text-sm tracking-wide text-stone-400 sm:text-base">
                {artwork.medium} · {artwork.dimensions}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
