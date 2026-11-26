import { NextResponse } from "next/server";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  trap?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Escape visitor input before it lands in an HTML email. */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/** Very small in-memory throttle (per serverless instance). */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function throttled(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const subject = (body.subject ?? "").trim().slice(0, 160);
  const message = (body.message ?? "").trim().slice(0, 5000);

  // Honeypot: bots fill hidden fields. Pretend everything is fine.
  if (body.trap) {
    return NextResponse.json({ ok: true, mode: "email" });
  }

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, a valid email and a short message." },
      { status: 422 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Try again later or email me directly." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured yet: the client falls back to a pre-filled mailto link
  // so the form is never a dead end.
  if (!apiKey) {
    return NextResponse.json({ ok: true, mode: "mailto" });
  }

  try {
    // Direct REST call keeps the bundle free of the Resend SDK + React Email.
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: email,
        subject: `Portfolio: ${subject || `Message from ${name}`}`,
        html: `
        <div style="font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#0a0b0d">
          <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280">
            New portfolio enquiry
          </p>
          <h2 style="margin:8px 0 16px;font-family:system-ui">${escapeHtml(subject || "No subject")}</h2>
          <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend responded ${response.status}`);
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (error) {
    console.error("[contact] Resend failed", error);
    return NextResponse.json(
      { ok: false, error: "Email delivery failed. Please email me directly." },
      { status: 502 },
    );
  }
}
