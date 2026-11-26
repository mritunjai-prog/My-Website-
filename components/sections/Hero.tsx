"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowDownRight, Download, Github, Linkedin } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { HeroStatic } from "@/components/three/HeroStatic";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useIsLowPower, usePrefersReducedMotion, useTheme } from "@/lib/hooks";
import { site } from "@/content/site";
import { marqueeItems } from "@/content/experience";

// The 3D bundle (three + postprocessing) is loaded only in the browser and
// only when the hero is mounted, keeping it out of the initial JS payload.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroStatic />,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const reduced = usePrefersReducedMotion();
  const lowPower = useIsLowPower();
  const theme = useTheme();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  // The cinematic scene is a dark-theme experience; light mode gets the
  // lighter static artwork instead (also the mobile / low-power path).
  const show3D = webgl && !lowPower && !reduced && theme === "dark";

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-line"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_70%_20%,rgba(139,108,255,0.14),transparent_55%),radial-gradient(90%_70%_at_20%_85%,rgba(217,255,63,0.08),transparent_60%)]" />

      {/* 3D stage */}
      <div className="absolute inset-0 z-0">
        {show3D ? <HeroScene /> : <HeroStatic />}
      </div>

      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-bg/85 via-bg/20 to-bg" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-bg via-bg/40 to-transparent md:via-bg/10" />

      <div className="shell relative z-10 flex min-h-[calc(100svh-2.6rem)] flex-col justify-between pt-[calc(var(--nav-h)+1.75rem)]">
        {/* Top meta rail */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            <span className="eyebrow text-fg/70">{site.availability}</span>
          </div>
          <span className="eyebrow hidden text-fg/65 sm:block">
            {site.location} · 17.38°N 78.48°E
          </span>
        </div>

        {/* Statement */}
        <div className="grid gap-10 pb-10 pt-14 md:pb-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-acid" />
              <span className="eyebrow text-fg/60">
                {site.role} — {site.discipline}
              </span>
            </div>

            <h1 className="font-display leading-[0.82] tracking-tightest">
              <SplitText
                as="span"
                text="MRITUNJAI"
                mode="chars"
                waitForReady
                stagger={0.03}
                className="block text-[clamp(3.1rem,10.5vw,9.5rem)] font-medium"
              />
              <SplitText
                as="span"
                text="SINGH"
                mode="chars"
                waitForReady
                delay={0.18}
                stagger={0.03}
                className="outline-text block text-[clamp(3.1rem,10.5vw,9.5rem)] font-medium"
              />
            </h1>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                {site.intro}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  onClick={() => scrollTo("#work")}
                  className="group items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-sm font-medium text-acid-ink transition-transform"
                >
                  See the work
                  <ArrowDownRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </MagneticButton>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="grow"
                  className="group flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm text-fg/80 transition-colors hover:border-fg/40 hover:text-fg"
                >
                  <Download size={15} className="transition-transform group-hover:translate-y-0.5" />
                  Résumé
                </a>
              </div>
            </div>
          </div>

          {/* Social rail */}
          <div className="hidden flex-col items-end gap-5 lg:flex">
            <p className="max-w-[15rem] text-right font-serif text-xl italic leading-snug text-fg drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
              “{site.tagline}”
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: site.socials.github, label: "GitHub", icon: Github },
                { href: site.socials.linkedin, label: "LinkedIn", icon: Linkedin },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="grow"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg/70 transition-colors hover:border-acid hover:text-acid"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="flex items-end justify-between gap-6 border-t border-line py-5">
          <button
            type="button"
            onClick={() => scrollTo("#work")}
            className="group flex items-center gap-3 text-left"
            data-cursor="grow"
            aria-label="Scroll to selected work"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-acid">
              <ArrowDownRight
                size={15}
                className="rotate-45 transition-transform duration-500 group-hover:translate-y-0.5"
              />
            </span>
            <span className="eyebrow text-fg/60">Scroll to explore</span>
          </button>

          <div className="hidden items-center gap-8 sm:flex">
            <div className="text-right">
              <p className="eyebrow text-fg/60">Currently</p>
              <p className="text-xs text-fg/70">VP · XeTech Club</p>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="text-right">
              <p className="eyebrow text-fg/60">Recently</p>
              <p className="text-xs text-fg/70">Product Intern @ Xebia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 border-y border-line bg-bg/40 py-2.5 backdrop-blur-sm">
        <Marquee
          items={marqueeItems}
          duration={38}
          className="eyebrow text-fg/60"
        />
      </div>
    </section>
  );
}
