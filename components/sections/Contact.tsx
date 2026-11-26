"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, MapPin, Phone, Send } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import { useLocalTime } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const initialForm = { name: "", email: "", subject: "", message: "", trap: "" };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const time = useLocalTime(site.timezone);

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        mode?: "email" | "mailto";
        error?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      if (data.mode === "mailto") {
        // Email provider not configured: hand off to the visitor's mail client.
        const mailto = `${site.socials.email}?subject=${encodeURIComponent(
          form.subject || `Portfolio enquiry from ${form.name}`,
        )}&body=${encodeURIComponent(`${form.message}\n\nFrom ${form.name} (${form.email})`)}`;
        window.location.href = mailto;
        setStatus("success");
        setFeedback("Opening your email client. The message is already filled in.");
      } else {
        setStatus("success");
        setFeedback("Message received. I usually reply within 48 hours.");
        setForm(initialForm);
      }
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Could not send. Email me directly instead.",
      );
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[32rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(139,108,255,0.16),transparent_70%)]" />

      <div className="shell">
        <div className="flex items-center gap-4 pb-8">
          <span className="eyebrow text-accent">05</span>
          <span className="h-px w-10 bg-line" />
          <span className="eyebrow">Contact</span>
        </div>

        <SplitText
          as="h2"
          text={"LET'S BUILD\nSOMETHING"}
          mode="chars"
          trigger="scroll"
          stagger={0.022}
          className="font-display text-[clamp(2.8rem,9.4vw,8.5rem)] font-medium leading-[0.85] tracking-tightest"
        />
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <SplitText
            as="span"
            text="that thinks."
            mode="words"
            trigger="scroll"
            delay={0.15}
            className="font-serif text-[clamp(2.6rem,8.4vw,7.5rem)] italic leading-[0.9] text-accent"
          />
          <span className="eyebrow max-w-xs pb-2 text-muted">
            Available for full-time roles, research collaborations and freelance
            builds.
          </span>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Direct lines */}
          <div>
            <p className="eyebrow text-muted">Direct line</p>
            <a
              href={site.socials.email}
              data-cursor="grow"
              className="group mt-4 flex items-start gap-3 font-display text-[clamp(1.15rem,2.6vw,2rem)] tracking-tight transition-colors hover:text-accent"
            >
              <span className="break-all">{site.email}</span>
              <ArrowUpRight
                size={20}
                className="mt-2 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
              <a
                href={site.phoneHref}
                data-cursor="grow"
                className="group flex items-center gap-3 bg-bg p-4 transition-colors hover:bg-panel"
              >
                <Phone size={14} className="text-accent" />
                <span className="text-sm text-fg/80">{site.phone}</span>
              </a>
              <div className="flex items-center gap-3 bg-bg p-4">
                <MapPin size={14} className="text-accent" />
                <span className="text-sm text-fg/80">{site.location}</span>
              </div>
              <div className="flex items-center gap-3 bg-bg p-4 sm:col-span-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-acid opacity-70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                </span>
                <span className="text-sm text-fg/80">
                  {time ?? "00:00:00"} {site.timezoneLabel}
                </span>
                <span className="ml-auto text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  Local time
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-fg/70 hover:text-fg"
                data-cursor="grow"
              >
                <span className="link-line">GitHub</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-fg/70 hover:text-fg"
                data-cursor="grow"
              >
                <span className="link-line">LinkedIn</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-fg/70 hover:text-fg"
                data-cursor="grow"
              >
                <span className="link-line">Résumé</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="border border-line bg-panel/50 p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="eyebrow text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  className="field"
                  placeholder="Ada Lovelace"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="eyebrow text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  className="field"
                  placeholder="you@company.com"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="subject" className="eyebrow text-muted">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  className="field"
                  placeholder="GenAI role · RAG collaboration · hello"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="message" className="eyebrow text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  className="field resize-none"
                  placeholder="What are you building?"
                />
              </div>
            </div>

            {/* Honeypot — hidden from humans and assistive tech */}
            <input
              type="text"
              name="trap"
              value={form.trap}
              onChange={update("trap")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "items-center gap-2 rounded-full bg-acid px-7 py-3.5 text-sm font-medium text-acid-ink transition-opacity",
                  status === "sending" && "opacity-70",
                )}
              >
                {status === "sending" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                {status === "sending" ? "Sending" : "Send message"}
              </MagneticButton>

              <p className="text-[0.7rem] text-muted">
                Or email{" "}
                <a
                  href={site.socials.email}
                  className="link-line text-fg/80 hover:text-fg"
                >
                  directly
                </a>
                .
              </p>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "mt-4 min-h-[1.25rem] text-xs",
                status === "error" ? "text-red-400" : "text-accent",
              )}
            >
              {feedback}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
