"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { site } = useSiteData();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 border-b border-stone-200/60 bg-background/90 backdrop-blur-md"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 md:px-12 lg:px-16"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-serif-tight text-stone-900 transition-opacity duration-300 hover:opacity-70 sm:text-2xl"
        >
          {site.name}
        </Link>
        <ul className="flex items-center gap-8 sm:gap-12">
          {navLinks.map(({ href, label }) => {
            const isActive =
              (href === "/" && pathname === "/") ||
              (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm tracking-wide transition-colors duration-300 sm:text-base ${
                    isActive
                      ? "font-medium text-stone-900"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
