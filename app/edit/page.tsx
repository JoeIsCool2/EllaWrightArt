"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Plus, Trash2, Save, Upload } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ADMIN_UNLOCK_KEY } from "@/lib/admin-secret";
import type { Artwork } from "@/lib/data";
import type { AboutData } from "@/lib/about";

export default function EditPage() {
  const router = useRouter();
  const { site, artworks, about, saveSite, saveArtworks, saveAbout } =
    useSiteData();
  const [unlocked, setUnlocked] = useState(false);

  const [siteForm, setSiteForm] = useState(site);
  const [artworksForm, setArtworksForm] = useState<Artwork[]>(artworks);
  const [aboutForm, setAboutForm] = useState<AboutData>(about);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      localStorage.getItem(ADMIN_UNLOCK_KEY) === "true";
    setUnlocked(ok);
    if (!ok && typeof window !== "undefined") router.replace("/");
  }, [router]);

  useEffect(() => {
    setSiteForm(site);
    setArtworksForm(artworks);
    setAboutForm(about);
  }, [site, artworks, about]);

  const handleLock = () => {
    localStorage.removeItem(ADMIN_UNLOCK_KEY);
    router.replace("/");
  };

  const handleSaveAll = () => {
    saveSite(siteForm);
    saveArtworks(artworksForm);
    saveAbout(aboutForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addArtwork = () => {
    setArtworksForm((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: "New work",
        year: new Date().getFullYear().toString(),
        medium: "",
        dimensions: "",
        imageUrl: "",
      },
    ]);
  };

  const removeArtwork = (id: string) => {
    setArtworksForm((prev) => prev.filter((a) => a.id !== id));
  };

  const updateArtwork = (id: string, field: keyof Artwork, value: string) => {
    setArtworksForm((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const addCvItem = (sectionTitle: string) => {
    setAboutForm((prev) => ({
      ...prev,
      cvSections: prev.cvSections.map((s) =>
        s.title === sectionTitle
          ? { ...s, items: [...s.items, "New item"] }
          : s
      ),
    }));
  };

  const updateCvItem = (
    sectionTitle: string,
    index: number,
    value: string
  ) => {
    setAboutForm((prev) => ({
      ...prev,
      cvSections: prev.cvSections.map((s) =>
        s.title === sectionTitle
          ? {
              ...s,
              items: s.items.map((item, i) => (i === index ? value : item)),
            }
          : s
      ),
    }));
  };

  const removeCvItem = (sectionTitle: string, index: number) => {
    setAboutForm((prev) => ({
      ...prev,
      cvSections: prev.cvSections.map((s) =>
        s.title === sectionTitle
          ? { ...s, items: s.items.filter((_, i) => i !== index) }
          : s
      ),
    }));
  };

  const portraitInputRef = useRef<HTMLInputElement>(null);

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setAboutForm((a) => ({ ...a, portraitUrl: dataUrl }));
    } catch {
      // ignore
    }
    e.target.value = "";
  };

  const handleArtworkImageUpload = async (
    artworkId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      updateArtwork(artworkId, "imageUrl", dataUrl);
    } catch {
      // ignore
    }
    e.target.value = "";
  };

  if (!unlocked) return null;

  return (
    <div className="min-h-screen bg-stone-50/80 py-14">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-2xl font-medium tracking-serif-tight text-stone-900">
            Edit site content
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-stone-500 underline underline-offset-2 transition-colors hover:text-stone-900"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={handleLock}
              className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-soft transition-all duration-300 hover:border-stone-300 hover:shadow-soft-lg"
            >
              <Lock className="h-4 w-4" strokeWidth={1.5} />
              Lock editor
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-300 hover:bg-stone-800 hover:shadow-soft-lg"
            >
              <Save className="h-4 w-4" strokeWidth={1.5} />
              {saved ? "Saved" : "Save all"}
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Site info */}
          <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="mb-5 font-serif text-lg font-medium tracking-serif-tight text-stone-900">
              Site & contact
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Your name (header)
                </label>
                <input
                  type="text"
                  value={siteForm.name}
                  onChange={(e) =>
                    setSiteForm((s) => ({ ...s, name: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Email
                </label>
                <input
                  type="email"
                  value={siteForm.email}
                  onChange={(e) =>
                    setSiteForm((s) => ({ ...s, email: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Instagram handle (no @)
                </label>
                <input
                  type="text"
                  value={siteForm.instagram.handle}
                  onChange={(e) => {
                    const handle = e.target.value.replace(/^@/, "").trim();
                    setSiteForm((s) => ({
                      ...s,
                      instagram: {
                        ...s.instagram,
                        handle,
                        url: handle
                          ? `https://instagram.com/${handle}`
                          : s.instagram.url,
                      },
                    }));
                  }}
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Page title (browser tab)
                </label>
                <input
                  type="text"
                  value={siteForm.metadata.title}
                  onChange={(e) =>
                    setSiteForm((s) => ({
                      ...s,
                      metadata: { ...s.metadata, title: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Short description (SEO)
                </label>
                <input
                  type="text"
                  value={siteForm.metadata.description}
                  onChange={(e) =>
                    setSiteForm((s) => ({
                      ...s,
                      metadata: { ...s.metadata, description: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Artworks */}
          <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-lg font-medium tracking-serif-tight text-stone-900">
                Artworks
              </h2>
              <button
                type="button"
                onClick={addArtwork}
                className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm text-stone-600 shadow-soft transition-all hover:border-stone-300 hover:text-stone-900"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} /> Add work
              </button>
            </div>
            <div className="space-y-6">
              {artworksForm.map((artwork) => (
                <div
                  key={artwork.id}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 p-5"
                >
                  <div className="mb-3 flex justify-between">
                    <span className="text-sm font-medium text-stone-700">
                      {artwork.title || "Untitled"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeArtwork(artwork.id)}
                      className="text-stone-400 hover:text-red-600"
                      aria-label="Remove artwork"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      placeholder="Title"
                      value={artwork.title}
                      onChange={(e) =>
                        updateArtwork(artwork.id, "title", e.target.value)
                      }
                      className="rounded-lg border border-stone-200 px-3 py-2 text-sm transition-colors focus:border-stone-400 focus:outline-none"
                    />
                    <input
                      placeholder="Year"
                      value={artwork.year}
                      onChange={(e) =>
                        updateArtwork(artwork.id, "year", e.target.value)
                      }
                      className="rounded-lg border border-stone-200 px-3 py-2 text-sm transition-colors focus:border-stone-400 focus:outline-none"
                    />
                    <input
                      placeholder="Medium"
                      value={artwork.medium}
                      onChange={(e) =>
                        updateArtwork(artwork.id, "medium", e.target.value)
                      }
                      className="rounded-lg border border-stone-200 px-3 py-2 text-sm transition-colors focus:border-stone-400 focus:outline-none"
                    />
                    <input
                      placeholder="Dimensions (e.g. 48 × 60 in)"
                      value={artwork.dimensions}
                      onChange={(e) =>
                        updateArtwork(artwork.id, "dimensions", e.target.value)
                      }
                      className="rounded-lg border border-stone-200 px-3 py-2 text-sm transition-colors focus:border-stone-400 focus:outline-none"
                    />
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs text-stone-500">
                        Image (URL or upload)
                      </label>
                      <div className="flex gap-2">
                        <input
                          placeholder="Image URL"
                          value={
                            artwork.imageUrl.startsWith("data:")
                              ? "(uploaded image)"
                              : artwork.imageUrl
                          }
                          onChange={(e) =>
                            updateArtwork(artwork.id, "imageUrl", e.target.value)
                          }
                          className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm transition-colors focus:border-stone-400 focus:outline-none"
                        />
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                          onChange={(e) =>
                            handleArtworkImageUpload(artwork.id, e)
                          }
                          className="hidden"
                          id={`artwork-file-${artwork.id}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById(`artwork-file-${artwork.id}`)?.click()
                          }
                          className="flex shrink-0 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm text-stone-600 shadow-soft transition-all hover:border-stone-300 hover:text-stone-900"
                        >
                          <Upload className="h-4 w-4" />
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About */}
          <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="mb-5 font-serif text-lg font-medium tracking-serif-tight text-stone-900">
              About page
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Portrait image (URL or upload)
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={
                      aboutForm.portraitUrl.startsWith("data:")
                        ? "(uploaded image)"
                        : aboutForm.portraitUrl
                    }
                    onChange={(e) =>
                      setAboutForm((a) => ({ ...a, portraitUrl: e.target.value }))
                    }
                    placeholder="Paste image URL or upload below"
                    className="flex-1 rounded-lg border border-stone-200 px-3.5 py-2 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                  />
                  <input
                    ref={portraitInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                    onChange={handlePortraitUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => portraitInputRef.current?.click()}
                    className="flex shrink-0 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm text-stone-600 shadow-soft transition-all hover:border-stone-300 hover:text-stone-900"
                  >
                    <Upload className="h-4 w-4" />
                    Upload PNG/JPG
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Biography (one paragraph per line)
                </label>
                <textarea
                  value={aboutForm.bioParagraphs.join("\n\n")}
                  onChange={(e) =>
                    setAboutForm((a) => ({
                      ...a,
                      bioParagraphs: e.target.value
                        .split("\n\n")
                        .map((p) => p.trim())
                        .filter(Boolean),
                    }))
                  }
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500">
                  Artist statement (one paragraph per line)
                </label>
                <textarea
                  value={aboutForm.statementParagraphs.join("\n\n")}
                  onChange={(e) =>
                    setAboutForm((a) => ({
                      ...a,
                      statementParagraphs: e.target.value
                        .split("\n\n")
                        .map((p) => p.trim())
                        .filter(Boolean),
                    }))
                  }
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-stone-200 px-3.5 py-2.5 text-stone-900 transition-colors focus:border-stone-400 focus:outline-none"
                />
              </div>
              <div>
                <span className="block text-xs font-medium text-stone-500">
                  CV sections
                </span>
                {aboutForm.cvSections.map((section, sectionIdx) => (
                  <div
                    key={sectionIdx}
                    className="mt-3 rounded-xl border border-stone-200 bg-stone-50/50 p-4"
                  >
                    <input
                      value={section.title}
                      onChange={(e) =>
                        setAboutForm((prev) => ({
                          ...prev,
                          cvSections: prev.cvSections.map((s) =>
                            s.title === section.title
                              ? { ...s, title: e.target.value }
                              : s
                          ),
                        }))
                      }
                      className="mb-2 font-medium text-stone-800"
                    />
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <input
                            value={item}
                            onChange={(e) =>
                              updateCvItem(section.title, idx, e.target.value)
                            }
                            className="flex-1 rounded border border-stone-200 px-2.5 py-1.5 text-sm focus:border-stone-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeCvItem(section.title, idx)
                            }
                            className="text-stone-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => addCvItem(section.title)}
                      className="mt-2 flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700"
                    >
                      <Plus className="h-3 w-3" /> Add line
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
