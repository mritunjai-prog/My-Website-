import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(139,108,255,0.18),transparent_70%)]" />
      <div className="shell py-32">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-tightest">
          LOST
          <br />
          <span className="outline-text">SIGNAL</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          This route does not exist, or it was retired with the old build. The
          work, the stack and the contact form are all on the home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-sm font-medium text-acid-ink"
        >
          Back to the site
        </Link>
      </div>
    </section>
  );
}
