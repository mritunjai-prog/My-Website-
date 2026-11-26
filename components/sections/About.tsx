"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollText } from "@/components/ui/ScrollText";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, registerGsap } from "@/lib/gsap";
import { site, stats, principles } from "@/content/site";

export function About() {
  const portraitRef = useRef<HTMLDivElement>(null);

  // Gentle parallax on the portrait, scrubbed against the section.
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -4 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative border-b border-line py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          index="02"
          label="About"
          title={"Systems that reason.\nInterfaces that explain."}
          description="Building with models taught me the hard part is not the model — it is the pipeline, the evaluation and the human on the other side of the screen."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + stats */}
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div
                ref={portraitRef}
                className="group relative aspect-[4/5] overflow-hidden border border-line bg-panel"
              >
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Mritunjai Singh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={82}
                  className="object-cover object-[center_22%] grayscale-[35%] contrast-[1.05] transition-all duration-[900ms] ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent opacity-80" />
                <div className="pointer-events-none absolute inset-0 mix-blend-color bg-[radial-gradient(120%_100%_at_20%_0%,rgba(217,255,63,0.28),transparent_60%)]" />

                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow text-acid">{site.role}</p>
                    <p className="font-display text-lg tracking-tight">
                      {site.location}
                    </p>
                  </div>
                  <span className="pill border-white/25 bg-black/20 text-white/80 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                    Available
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-6 grid grid-cols-2 gap-px border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-bg p-5">
                  <p className="font-display text-2xl tracking-tight md:text-3xl">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <ScrollText
              text="A machine learning engineer working across retrieval, NLP and the full stack. I care about grounded answers, measured results and systems that someone can actually operate after the demo."
              highlight={["retrieval", "measured", "operate"]}
              className="max-w-2xl font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.35] tracking-tight text-fg"
            />

            <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted">
                I specialise in Generative AI, NLP and Retrieval-Augmented
                Generation — building end-to-end intelligent systems, deploying
                scalable ML pipelines and developing data-driven platforms with
                modern full-stack technologies.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Highly proficient in Java with solid experience in Python,
                machine learning algorithms and model optimisation. I also build
                frontends in React, TypeScript and Tailwind — the layer where a
                model becomes useful.
              </p>
            </div>

            <div className="mt-10">
              <Reveal className="space-y-0 border-t border-line" stagger={0.08}>
                {principles.map((principle) => (
                  <div
                    key={principle.index}
                    className="group grid gap-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"
                  >
                    <span className="eyebrow text-accent">{principle.index}</span>
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-lg tracking-tight">
                        {principle.title}
                        <ArrowUpRight
                          size={14}
                          className="text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                        />
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
