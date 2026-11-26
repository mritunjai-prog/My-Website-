import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Mritunjai Singh — AI/ML Engineer. GenAI, RAG and NLP systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card rendered at build time with the same type system as the site.
 * Fonts are static instances generated from the variable font files so
 * Satori can rasterise them.
 */
export default async function OpengraphImage() {
  const [medium, bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/SpaceGrotesk-Medium.ttf")),
    readFile(join(process.cwd(), "public/fonts/SpaceGrotesk-Bold.ttf")),
    readFile(join(process.cwd(), "public/fonts/Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          color: "#f2f2ec",
          padding: "56px 64px",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        {/* Atmospheric fields */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 720,
            height: 720,
            borderRadius: 720,
            background:
              "linear-gradient(140deg, rgba(139,108,255,0.42), rgba(94,231,255,0.10) 55%, rgba(5,6,10,0) 80%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            left: -140,
            width: 660,
            height: 660,
            borderRadius: 660,
            background:
              "linear-gradient(20deg, rgba(217,255,63,0.22), rgba(5,6,10,0) 70%)",
            display: "flex",
          }}
        />

        {/* Rings */}
        {[420, 540, 660].map((diameter, index) => (
          <div
            key={diameter}
            style={{
              position: "absolute",
              top: 70 - index * 40,
              right: 40 - index * 40,
              width: diameter,
              height: diameter,
              borderRadius: diameter,
              border: "1px solid rgba(217,255,63,0.16)",
              display: "flex",
            }}
          />
        ))}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                background: "#d9ff3f",
                color: "#080a00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              MS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 13,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(242,242,236,0.55)",
              }}
            >
              Portfolio · 2026
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(242,242,236,0.65)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#d9ff3f",
                display: "flex",
              }}
            />
            Open to work
          </div>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 118,
              lineHeight: 0.9,
              letterSpacing: -5,
              display: "flex",
            }}
          >
            MRITUNJAI
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 500,
              fontSize: 118,
              lineHeight: 0.95,
              letterSpacing: -5,
              color: "#d9ff3f",
              display: "flex",
            }}
          >
            SINGH
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 24,
              color: "rgba(242,242,236,0.72)",
              display: "flex",
            }}
          >
            AI/ML Engineer — GenAI · RAG · NLP systems, built end to end.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 20,
            fontSize: 14,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "rgba(242,242,236,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>my-website-pearl-gamma.vercel.app</div>
          <div style={{ display: "flex" }}>Hyderabad, India</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
