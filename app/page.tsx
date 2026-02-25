"use client";

import { ArtworkGrid } from "@/components/ArtworkGrid";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function HomePage() {
  const { artworks } = useSiteData();
  return (
    <div className="min-h-screen">
      <ArtworkGrid artworks={artworks} />
    </div>
  );
}
