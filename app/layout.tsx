import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400-italic.css";

import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Preloader } from "@/components/chrome/Preloader";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mritunjai Singh · AI/ML Engineer · Python · Data Science",
    template: "%s · Mritunjai Singh",
  },
  description:
    "Portfolio of Mritunjai Singh, an AI/ML engineer and Python developer working across Generative AI, RAG, NLP and computer vision. End-to-end ML systems, FastAPI/Flask backends and the interfaces that make them usable.",
  keywords: [
    "Mritunjai Singh",
    "AI/ML Engineer",
    "Python Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Generative AI",
    "RAG",
    "NLP",
    "Computer Vision",
    "LangChain",
    "Hugging Face",
    "FastAPI",
    "Flask",
    "OpenCV",
    "TensorFlow",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Mritunjai Singh", url: siteUrl }],
  creator: "Mritunjai Singh",
  publisher: "Mritunjai Singh",
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Mritunjai Singh",
    title: "Mritunjai Singh · AI/ML Engineer · Python · Data Science",
    description:
      "GenAI, RAG, computer vision and data-science systems, built end to end from model evaluation to production interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mritunjai Singh · AI/ML Engineer · Python · Data Science",
    description:
      "GenAI, RAG, computer vision and data-science systems, built end to end from model evaluation to production interfaces.",
    creator: "@mritunjai-prog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#efece4" },
  ],
  colorScheme: "dark light",
};

/** Applied before first paint to avoid a theme flash. */
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('ms:theme');
    document.documentElement.dataset.theme = stored === 'light' ? 'light' : 'dark';
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.intro,
  url: siteUrl,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sir Padampat Singhania University",
  },
  knowsAbout: [
    "Generative AI",
    "Retrieval-Augmented Generation",
    "Natural Language Processing",
    "Computer Vision",
    "Machine Learning",
    "Data Science",
    "Python",
    "FastAPI",
    "React",
    "TensorFlow",
    "LangChain",
    "Hugging Face",
  ],
  sameAs: [site.socials.github, site.socials.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <div className="grain" aria-hidden="true" />
          <Nav />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
