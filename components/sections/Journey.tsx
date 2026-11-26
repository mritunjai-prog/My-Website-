"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, registerGsap } from "@/lib/gsap";
import { timeline } from "@/content/experience";
import { certifications, education, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  // Draw the timeline spine as the section is scrolled.
  useEffect(() => {
    const wrap = timelineRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative border-b border-line py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Journey"
          title={"Rooms led.\nSystems shipped."}
          description="Student council, technical chapters and coding communities — the work that happens between lectures."
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16 md:pl-8">
          <span className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block">
            <span
              ref={lineRef}
              className="block h-full w-px origin-top bg-acid"
              style={{ transform: "scaleY(0)" }}
            />
          </span>

          <div className="space-y-0">
            {timeline.map((entry, index) => (
              <Reveal key={`${entry.role}-${entry.org}`} delay={index * 0.04}>
                <article className="group relative grid gap-4 border-b border-line py-8 md:grid-cols-[9rem_1fr] md:gap-10 md:py-10">
                  <span className="absolute -left-8 top-12 hidden h-2 w-2 -translate-x-1/2 rounded-full border border-acid bg-bg transition-colors duration-300 group-hover:bg-acid md:block" />

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                    <span className="eyebrow text-muted">{entry.period}</span>
                    <span className="hidden text-[0.6rem] uppercase tracking-[0.16em] text-accent/80 md:inline">
                      {entry.type}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                        {entry.role}
                      </h3>
                      <span className="text-sm text-muted">{entry.org}</span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {entry.summary}
                    </p>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {entry.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[0.8rem] leading-relaxed text-fg/70"
                        >
                          <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education + certifications */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3 pb-6">
              <GraduationCap size={16} className="text-accent" />
              <h3 className="eyebrow text-fg/70">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.institution}
                  className="border border-line bg-panel/40 p-6 transition-colors hover:border-fg/25"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg tracking-tight md:text-xl">
                        {item.degree}
                      </h4>
                      <p className="mt-1 text-sm text-fg/70">{item.institution}</p>
                      <p className="text-xs text-muted">
                        {item.location} · {item.period}
                      </p>
                    </div>
                    <span className="rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-accent">
                      {item.score}
                    </span>
                  </div>

                  {item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-xs leading-relaxed text-muted"
                        >
                          — {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-3 pb-6">
              <Award size={16} className="text-accent" />
              <h3 className="eyebrow text-fg/70">Certifications</h3>
            </div>

            <div className="border-t border-line">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className={cn(
                    "group flex items-center justify-between gap-4 border-b border-line py-3.5",
                  )}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[0.6rem] tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm text-fg/85 transition-colors group-hover:text-accent">
                        {cert.title}
                      </p>
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <Award
                    size={13}
                    className="shrink-0 text-muted/50 transition-colors group-hover:text-accent"
                  />
                </div>
              ))}
            </div>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="grow"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-fg/80 transition-colors hover:text-accent"
            >
              <span className="link-line">Read the full résumé</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
