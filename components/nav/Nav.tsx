"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const { scrollTo, stop, start } = useSmoothScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const firstPass = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section observer drives the active nav state.
  useEffect(() => {
    const ids = ["#top", ...navLinks.map((link) => link.href)];
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Don't undo the preloader's scroll lock on the very first render.
    if (firstPass.current) {
      firstPass.current = false;
      if (!open) return;
    }

    if (open) {
      stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, start, stop]);

  const go = (href: string) => {
    setOpen(false);
    // Wait a tick so the overlay has released the scroll lock.
    window.setTimeout(() => scrollTo(href), 80);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-acid focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-acid-ink"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[64px]" : "h-[var(--nav-h)]",
          )}
        >
          <Link
            href="/"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                scrollTo(0);
              }
            }}
            className="group flex items-center gap-3"
            aria-label="Mritunjai Singh — back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-acid font-display text-[0.8rem] font-bold text-acid-ink transition-transform duration-500 group-hover:rotate-6">
              MS
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm tracking-tight">
                {site.name}
              </span>
              <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                {site.role}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className={cn(
                  "group relative px-3 py-2 text-xs transition-colors",
                  active === link.href
                    ? "text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                <span className="mr-1.5 text-[0.55rem] tabular-nums text-accent/70">
                  {link.index}
                </span>
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-acid transition-transform duration-300",
                    active === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="grow"
              className="hidden items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs text-fg/80 transition-colors hover:border-acid hover:text-acid sm:inline-flex"
            >
              Résumé
              <ArrowUpRight size={13} />
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-bg md:hidden"
          >
            <div className="h-[var(--nav-h)]" />
            <nav
              aria-label="Mobile"
              className="shell flex flex-1 flex-col justify-center gap-1"
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.06, duration: 0.5 }}
                  className="group flex items-baseline justify-between border-b border-line py-4 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow text-accent">{link.index}</span>
                    <span className="font-display text-4xl tracking-tighter">
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-col gap-4"
              >
                <a
                  href={site.socials.email}
                  className="text-sm text-fg/70"
                >
                  {site.email}
                </a>
                <div className="flex gap-5 text-xs uppercase tracking-[0.14em] text-muted">
                  <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href={site.resume} target="_blank" rel="noopener noreferrer">
                    Résumé
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
