/**
 * Single source of truth for personal content.
 * Verified against Mritunjai_Singh_Python_DS_AIML.pdf (latest résumé).
 * Do not add claims that are not backed by that document or the live projects.
 */

export const site = {
  name: "Mritunjai Singh",
  shortName: "MS",
  role: "AI Engineer",
  discipline: "GenAI · RAG · Python",
  tagline: "I turn messy documents into answers people can use.",
  intro:
    "AI engineer and Python developer. I build retrieval systems and computer vision pipelines, then the APIs and interfaces that put them in front of real people.",
  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  email: "mritunjaisinghwork@gmail.com",
  phone: "+91 9347147615",
  phoneHref: "tel:+919347147615",
  resume: "/Mritunjai_Singh_CV.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-website-pearl-gamma.vercel.app",
  availability: "Open to AI engineer and GenAI roles",
  socials: {
    github: "https://github.com/mritunjai-prog",
    linkedin: "https://www.linkedin.com/in/mritunjai-prog",
    email: "mailto:mritunjaisinghwork@gmail.com",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "#work", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Stack", href: "#stack", index: "03" },
  { label: "Journey", href: "#journey", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
] as const;

export const stats = [
  { value: "8.5", suffix: "/10", label: "CGPA · B.Tech CSE (AI/ML)" },
  { value: "07", suffix: "", label: "Shipped projects" },
  { value: "19", suffix: "", label: "ML models benchmarked" },
  { value: "1K", suffix: "+", label: "Students engaged" },
] as const;

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Sir Padampat Singhania University",
    location: "Udaipur, Rajasthan",
    period: "Jul 2023 to Apr 2027",
    score: "CGPA 8.5 / 10.0",
    focus: "Minor in AI/ML",
    highlights: [
      "Minor specialisation in Artificial Intelligence & Machine Learning",
      "Core focus: Data Structures, Data Visualisation, AI/ML and Operating Systems",
    ],
  },
] as const;

export const certifications = [
  { title: "Introduction to Microsoft 365 & AI Administration", issuer: "Microsoft" },
  { title: "Microsoft Azure Administrator", issuer: "Microsoft" },
  { title: "Implement Scalable Database Solutions Using Azure SQL", issuer: "Microsoft" },
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft" },
  { title: "Microsoft Responsible Generative AI", issuer: "Microsoft" },
  { title: "NPTEL Elite Certification in Java Programming", issuer: "NPTEL" },
] as const;

export const principles = [
  {
    index: "01",
    title: "Grounded answers, not guesses",
    body: "RAG is only as good as its retrieval. I spend time on chunking, embeddings and evaluation before I touch the prompt.",
  },
  {
    index: "02",
    title: "Ship the whole thing",
    body: "A model in a notebook helps nobody. I build the API, the dashboard and the deploy path around it.",
  },
  {
    index: "03",
    title: "Make the output readable",
    body: "If a person can't see what the model did, the system fails. So I design the front end that shows it.",
  },
] as const;
