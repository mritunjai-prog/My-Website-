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

  // Gentle inner parallax: the photo drifts inside the circular crop while the
  // circle itself stays anchored (no square edges, no layout shift).
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    const ctx = gsap.context(() => {
      const image = el.querySelector("img");
      if (!image) return;

      // Scale is owned by GSAP (not a utility class) so its transform writes
      // never strip the zoom and expose the crop's edges.
      gsap.set(image, { scale: 1.16 });

      gsap.fromTo(
        image,
        { yPercent: -5 },
        {
          yPercent: 5,
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
          description="Building with models taught me that the hard part is never the model. It’s the pipeline, the evaluation, and the person waiting on the other side of the screen."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + stats */}
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-[430px]">
                {/* Orbit rings — fully round, never clipped */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-5 rounded-full border border-line/50"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-full border border-dashed border-line/80 [animation:spin_70s_linear_infinite]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(217,255,63,0.30),rgba(139,108,255,0.22)_45%,transparent_70%)] opacity-70 blur-3xl"
                />

                {/* The crop: circular, overflow hidden, ring on the outside */}
                <div className="group absolute inset-0 overflow-hidden rounded-full bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-line">
                  <div ref={portraitRef} className="absolute inset-0 overflow-hidden rounded-full">
                    <Image
                      src="/profile.jpg"
                      alt="Portrait of Mritunjai Singh"
                      fill
                      sizes="(max-width: 1024px) 80vw, 430px"
                      quality={82}
                      className="object-cover object-[center_25%] grayscale-[35%] contrast-[1.05] transition-[filter] duration-700 ease-out-expo group-hover:grayscale-0"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-bg/85 via-bg/5 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full mix-blend-color bg-[radial-gradient(120%_100%_at_20%_0%,rgba(217,255,63,0.30),transparent_62%)]"
                  />

                  {/* Inner caption, kept clear of the curved edge */}
                  <div className="absolute inset-x-14 bottom-8 flex flex-col items-center text-center">
                    <p className="eyebrow text-acid">{site.role}</p>
                    <p className="mt-1 font-display text-base tracking-tight text-white/90">
                      {site.location}
                    </p>
                  </div>
                </div>

                {/* Availability badge */}
                <span className="pill absolute -bottom-2 left-1/2 -translate-x-1/2 border-line bg-bg/90 text-fg/80 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                  Available
                </span>

                {/* Accent arc */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="var(--acid)"
                    strokeOpacity="0.55"
                    strokeWidth="0.4"
                    strokeDasharray="14 86"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </Reveal>

            <Reveal className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
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

            <Reveal className="mt-6 border-t border-line pt-5">
              <p className="eyebrow text-muted">Now</p>
              <div className="mt-3 space-y-2.5 text-sm">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="text-fg/85">Vice President</span>
                  <span className="text-right text-xs text-muted">
                    XeTech Club · since Apr 2026
                  </span>
                </p>
                <p className="flex items-baseline justify-between gap-4">
                  <span className="text-fg/85">Product Intern</span>
                  <span className="text-right text-xs text-muted">
                    Xebia · Jun to Jul 2026
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <ScrollText
              text="I'm a machine learning engineer who likes the unglamorous parts: cleaning messy documents, comparing nineteen models when three might do, and making sure the thing still works once the demo is over."
              highlight={["unglamorous", "nineteen"]}
              className="max-w-2xl font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.35] tracking-tight text-fg"
            />

            <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted">
                My work sits between data science and engineering. Feature
                engineering, model comparison and evaluation come first. Then
                deployment: FastAPI or Flask services, vector stores for
                retrieval, and Docker when it has to run somewhere other than my
                laptop.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Most of my projects start with unstructured documents. I use
                OpenCV and Hugging Face models to read them, LangChain and FAISS
                to search them, and React when someone needs to see what the
                model found.
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
