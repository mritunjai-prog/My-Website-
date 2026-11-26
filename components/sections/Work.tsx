"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects, projectStats } from "@/content/projects";
import { cn } from "@/lib/utils";

export function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pointer-following preview (desktop only — hidden via CSS on touch).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMove = (event: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const active = hovered !== null ? projects[hovered] : null;

  return (
    <section id="work" className="relative border-b border-line py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="01"
            label="Selected work"
            title={"Seven systems.\nOne obsession."}
            className="flex-1"
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            From a RAG knowledge assistant and document intelligence to
            dropout-risk modelling, decision tooling and cultural art
            generation. Each case study is pulled directly from what was built.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-14"
          onPointerMove={handleMove}
          onPointerLeave={() => setHovered(null)}
        >
          {/* Floating preview */}
          <AnimatePresence>
            {active && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute z-30 hidden w-[22rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-line shadow-2xl md:block"
                style={{ left: springX, top: springY }}
              >
                <TiltCard max={5}>
                  <ProjectVisual project={active} variant="thumb" />
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-t border-line">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-cursor="view"
                data-cursor-label="Case study"
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "group relative block border-b border-line py-6 transition-opacity duration-300 md:py-8",
                  hovered !== null && hovered !== index
                    ? "md:opacity-40"
                    : "md:opacity-100",
                )}
              >
                <div className="grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 md:grid-cols-[3.5rem_1fr_16rem_7rem_2.5rem] md:gap-6">
                  <span className="eyebrow text-muted transition-colors group-hover:text-accent">
                    {project.index}
                  </span>

                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.55rem,3.6vw,2.9rem)] leading-[1.05] tracking-tighter transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                      {project.featured && (
                        <span className="hidden translate-y-[-0.2em] rounded-full border border-acid/40 px-2 py-0.5 text-[0.55rem] font-sans uppercase tracking-[0.16em] text-acid sm:inline-block">
                          Featured
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 truncate text-xs text-muted md:hidden">
                      {project.subtitle} · {project.year}
                    </p>
                  </div>

                  <p className="hidden text-sm text-muted transition-colors group-hover:text-fg/80 md:block">
                    {project.subtitle}
                  </p>

                  <div className="hidden flex-wrap gap-1.5 md:flex">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-line text-muted transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-acid-ink">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                {/* Mobile artwork */}
                <div className="mt-4 overflow-hidden border border-line md:hidden">
                  <ProjectVisual
                    project={project}
                    variant="thumb"
                    className="aspect-[16/9]"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 grid grid-cols-3 gap-px border border-line bg-line">
          {projectStats.map((stat) => (
            <div key={stat.label} className="bg-bg p-5 md:p-6">
              <p className="font-display text-xl tracking-tight md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted md:text-[0.7rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
