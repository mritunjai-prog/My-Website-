import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { getProject, nextProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { alpha } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  const description = `${project.subtitle}. ${project.summary}`;

  return {
    title: `${project.title} · ${project.subtitle}`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${project.subtitle}`,
      description,
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · ${project.subtitle}`,
      description,
    },
  };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg px-5 py-4">
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-1.5 text-sm leading-snug text-fg/85">{value}</dd>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = nextProject(project.slug);
  const status = project.demoUrl ? "Live build" : "In development";

  return (
    <article className="pb-20">
      <header className="shell overflow-x-clip pt-[calc(var(--nav-h)+2.5rem)]">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          All projects
        </Link>

        <div className="relative mt-8">
          {/* Project identity: a soft accent field and a ghosted index, not a
              giant placeholder panel. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-24 hidden h-72 w-72 rounded-full blur-[90px] md:block"
            style={{ background: alpha(project.accent, 0.16) }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 hidden select-none font-display text-[9rem] leading-none tracking-tightest md:block lg:text-[12rem]"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${alpha(project.accent, 0.3)}`,
            }}
          >
            {project.index}
          </span>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-accent">
                {project.index} / {String(projects.length).padStart(2, "0")} ·{" "}
                {project.year}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.85] tracking-tightest">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted md:text-xl">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-acid px-5 py-3 text-sm font-medium text-acid-ink"
                >
                  Live site
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-fg/80 transition-colors hover:border-fg/40 hover:text-fg"
                >
                  <Github size={15} />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* At a glance, replacing the former oversized artwork panel */}
        <p className="eyebrow mt-12 text-muted">At a glance</p>
        <div className="mt-3 overflow-hidden border border-line">
          <div
            className="h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, ${project.accent}, ${project.secondary})`,
            }}
          />
          <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            <Fact label="Year" value={project.year} />
            <Fact label="Role" value={project.role} />
            <Fact label="Core stack" value={project.tags.slice(0, 2).join(", ")} />
            <Fact label="Status" value={status} />
          </dl>
        </div>

        {/* Real screenshot when one exists; nothing fake otherwise. */}
        {project.cover && (
          <figure className="mt-8 overflow-hidden border border-line bg-panel">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={project.cover}
                alt={project.coverAlt ?? `${project.title} interface`}
                fill
                priority
                sizes="(max-width: 1560px) 100vw, 1560px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="border-t border-line px-4 py-3 text-[0.7rem] text-muted">
              {project.coverAlt ?? `${project.title} interface`}
            </figcaption>
          </figure>
        )}
      </header>

      <div className="shell mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <aside className="h-fit lg:sticky lg:top-28">
          <div>
            <p className="eyebrow mb-3 text-muted">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[0.68rem] uppercase tracking-[0.1em] text-fg/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">
            Overview
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {project.summary}
          </p>

          <h2 className="mt-14 font-display text-2xl tracking-tight md:text-3xl">
            What I built
          </h2>
          <ol className="mt-6 border-t border-line">
            {project.highlights.map((highlight, index) => (
              <li
                key={highlight}
                className="group flex gap-5 border-b border-line py-5 md:gap-8"
              >
                <span className="mt-1 font-display text-sm tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-fg/80 md:text-base">
                  {highlight}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-xs text-muted">
            Built by Mritunjai Singh. Source and live deployment are linked
            above where available.
          </p>
        </div>
      </div>

      {/* Next project */}
      <div className="shell mt-24">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group relative block border-y border-line py-10"
        >
          <p className="eyebrow text-muted">Next project</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-none tracking-tightest transition-colors group-hover:text-accent">
              {next.title}
            </h2>
            <span className="flex items-center gap-3 text-sm text-muted">
              {next.subtitle}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-acid-ink">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
