"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { defaultAbout } from "@/lib/about";

export default function AboutPage() {
  const { site, about } = useSiteData();
  const portraitUrl = about.portraitUrl || defaultAbout.portraitUrl;
  const isAllowedImageHost =
    portraitUrl.includes("images.unsplash.com") ||
    portraitUrl.includes("picsum.photos") ||
    portraitUrl.startsWith("/");
  const useUnoptimized = !isAllowedImageHost || portraitUrl.startsWith("data:");

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 md:px-12 lg:px-16 lg:py-36">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[3/4] min-h-[400px] overflow-hidden rounded-sm bg-stone-200 shadow-soft-lg"
          >
            <Image
              src={portraitUrl}
              alt={`${site.name}, artist portrait`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              priority
              unoptimized={useUnoptimized}
            />
          </motion.div>

          <div className="flex flex-col gap-16 sm:gap-20">
            {about.bioParagraphs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="font-serif text-2xl font-medium tracking-serif-tight text-stone-900 sm:text-3xl">
                  Biography
                </h2>
                <div className="mt-6 space-y-5 text-stone-600 leading-[1.7]">
                  {about.bioParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.section>
            )}

            {about.statementParagraphs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="font-serif text-2xl font-medium tracking-serif-tight text-stone-900 sm:text-3xl">
                  Artist Statement
                </h2>
                <div className="mt-6 space-y-5 text-stone-600 leading-[1.7]">
                  {about.statementParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.section>
            )}

            {about.cvSections.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-12"
              >
                {about.cvSections.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3 className="font-serif text-xl font-medium tracking-serif-tight text-stone-900">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-stone-600 leading-[1.65]">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
