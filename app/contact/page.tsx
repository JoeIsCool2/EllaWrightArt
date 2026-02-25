"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { checkAdminSecret, ADMIN_UNLOCK_KEY } from "@/lib/admin-secret";

export default function ContactPage() {
  const router = useRouter();
  const { site } = useSiteData();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminSecret(formState.name, formState.email, formState.message)) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ADMIN_UNLOCK_KEY, "true");
        router.push("/edit");
      }
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
    setFormState({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8 sm:py-36 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-20"
        >
          <div>
            <h1 className="font-serif text-3xl font-medium tracking-serif-tight text-stone-900 sm:text-4xl">
              Contact
            </h1>
            <p className="mt-5 text-stone-500 leading-relaxed">
              For inquiries, commissions, or collaboration.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white px-5 py-4 text-stone-700 shadow-soft transition-all duration-300 hover:border-stone-300 hover:shadow-soft-lg hover:text-stone-900"
            >
              <span className="rounded-full border border-stone-200 bg-stone-50 p-2.5 transition-colors group-hover:border-stone-300 group-hover:bg-stone-100">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-lg tracking-wide">{site.email}</span>
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white px-5 py-4 text-stone-700 shadow-soft transition-all duration-300 hover:border-stone-300 hover:shadow-soft-lg hover:text-stone-900"
            >
              <span className="rounded-full border border-stone-200 bg-stone-50 p-2.5 transition-colors group-hover:border-stone-300 group-hover:bg-stone-100">
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-lg tracking-wide">@{site.instagram.handle}</span>
            </a>
          </div>

          <div className="border-t border-stone-200 pt-20">
            <h2 className="font-serif text-xl font-medium tracking-serif-tight text-stone-900">
              Send a message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-stone-600"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border-b border-stone-200 bg-transparent px-0 py-3 text-stone-900 placeholder-stone-400 transition-colors focus:border-stone-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border-b border-stone-200 bg-transparent px-0 py-3 text-stone-900 placeholder-stone-400 transition-colors focus:border-stone-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 w-full resize-none border-b border-stone-200 bg-transparent px-0 py-3 text-stone-900 placeholder-stone-400 transition-colors focus:border-stone-500 focus:outline-none"
                  placeholder="Your message"
                />
              </div>
              <div className="flex items-center gap-5">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-sm border border-stone-900 bg-stone-900 px-10 py-3.5 text-sm font-medium tracking-wide text-white shadow-soft transition-all duration-300 hover:bg-stone-800 hover:shadow-soft-lg disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending…"
                    : status === "sent"
                      ? "Sent"
                      : "Send"}
                </button>
                {status === "sent" && (
                  <span className="text-sm text-stone-500">
                    Thank you. I&apos;ll be in touch.
                  </span>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
