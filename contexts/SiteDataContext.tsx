"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { site as defaultSite } from "@/lib/site";
import { artworks as defaultArtworks } from "@/lib/data";
import { defaultAbout, type AboutData } from "@/lib/about";
import type { Artwork } from "@/lib/data";
import { STORAGE_KEYS } from "@/lib/admin-secret";

export type SiteData = {
  name: string;
  email: string;
  instagram: { handle: string; url: string };
  metadata: { title: string; description: string };
};

type SiteDataContextValue = {
  site: SiteData;
  artworks: Artwork[];
  about: AboutData;
  setSite: (s: SiteData | ((prev: SiteData) => SiteData)) => void;
  setArtworks: (a: Artwork[] | ((prev: Artwork[]) => Artwork[])) => void;
  setAbout: (a: AboutData | ((prev: AboutData) => AboutData)) => void;
  saveSite: (s: SiteData) => void;
  saveArtworks: (a: Artwork[]) => void;
  saveAbout: (a: AboutData) => void;
};

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

const defaultContextValue: SiteDataContextValue = {
  site: defaultSite as SiteData,
  artworks: defaultArtworks,
  about: defaultAbout,
  setSite: () => {},
  setArtworks: () => {},
  setAbout: () => {},
  saveSite: () => {},
  saveArtworks: () => {},
  saveAbout: () => {},
};

const SiteDataContext = createContext<SiteDataContextValue>(defaultContextValue);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [site, setSiteState] = useState<SiteData>(defaultSite as SiteData);
  const [artworks, setArtworksState] = useState<Artwork[]>(defaultArtworks);
  const [about, setAboutState] = useState<AboutData>(defaultAbout);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSiteState(loadStored(STORAGE_KEYS.site, defaultSite as SiteData));
    setArtworksState(loadStored(STORAGE_KEYS.artworks, defaultArtworks));
    setAboutState(loadStored(STORAGE_KEYS.about, defaultAbout));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (site.metadata?.title) document.title = site.metadata.title;
  }, [hydrated, site.metadata?.title]);

  const saveSite = useCallback((s: SiteData) => {
    setSiteState(s);
    saveStored(STORAGE_KEYS.site, s);
  }, []);

  const saveArtworks = useCallback((a: Artwork[]) => {
    setArtworksState(a);
    saveStored(STORAGE_KEYS.artworks, a);
  }, []);

  const saveAbout = useCallback((a: AboutData) => {
    setAboutState(a);
    saveStored(STORAGE_KEYS.about, a);
  }, []);

  const value: SiteDataContextValue = {
    site,
    artworks,
    about,
    setSite: setSiteState,
    setArtworks: setArtworksState,
    setAbout: setAboutState,
    saveSite,
    saveArtworks,
    saveAbout,
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
