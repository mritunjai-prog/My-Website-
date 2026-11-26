"use client";

import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useLocalTime } from "@/lib/hooks";
import { site, navLinks } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const time = useLocalTime(site.timezone);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="border-b border-line py-4">
        <Marquee
          items={["Available for work", "GenAI", "RAG", "NLP", "Let's talk"]}
          duration={42}
          className="font-display text-2xl uppercase tracking-tight text-fg/25 md:text-4xl"
        />
      </div>

      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-acid font-display text-[0.8rem] font-bold text-acid-ink">
              MS
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 text-xs text-muted">
              {time ?? "00:00:00"} {site.timezoneLabel} · {site.location}
            </p>
          </div>

          <nav aria-label="Footer sections">
            <p className="eyebrow mb-4 text-muted">Index</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-fg/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4 text-muted">Elsewhere</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg/70 transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg/70 transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.socials.email}
                  className="text-fg/70 transition-colors hover:text-accent"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg/70 transition-colors hover:text-accent"
                >
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-muted">Colophon</p>
            <p className="text-sm leading-relaxed text-fg/70">
              Next.js 16 · React Three Fiber · GSAP · Lenis.
              <br />
              Type: Space Grotesk, Inter, Instrument Serif.
              <br />
              Built and maintained by {site.name}.
            </p>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              data-cursor="grow"
              className="group mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-fg/70 transition-colors hover:text-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors group-hover:border-acid">
                <ArrowUp size={13} />
              </span>
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[0.7rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-acid" />
            Content sourced from my CV. Updated 2026
          </p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden px-4">
        <p className="translate-y-[0.16em] whitespace-nowrap text-center font-display text-[clamp(4rem,15vw,15rem)] leading-none tracking-tightest text-transparent [-webkit-text-stroke:1px_var(--line)]">
          MRITUNJAI SINGH
        </p>
      </div>
    </footer>
  );
}
