/**
 * Single source of truth for personal content.
 * Everything here is verified against Mritunjai_Singh_s_CV.pdf and the
 * previous portfolio. Do not add claims that are not backed by those sources.
 */

export const site = {
  name: "Mritunjai Singh",
  shortName: "MS",
  role: "AI/ML Engineer",
  discipline: "GenAI · RAG · NLP Systems",
  tagline:
    "I build intelligent systems that turn unstructured data into decisions.",
  intro:
    "AI/ML Engineer specialising in Generative AI, NLP and Retrieval-Augmented Generation. I build end-to-end intelligent systems, deploy scalable ML pipelines, and ship the interfaces that make them usable.",
  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  email: "mritunjaisinghwork@gmail.com",
  phone: "+91 9347147615",
  phoneHref: "tel:+919347147615",
  resume: "/Mritunjai_Singh_CV.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-website-pearl-gamma.vercel.app",
  availability: "Open to GenAI / ML engineering roles",
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
  { value: "8.5", suffix: "/10", label: "CGPA · B.Tech CSE" },
  { value: "6", suffix: "", label: "Shipped projects" },
  { value: "100", suffix: "+", label: "Students reached" },
  { value: "4", suffix: "", label: "Leadership roles" },
] as const;

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Sir Padampat Singhania University",
    location: "Udaipur, Rajasthan",
    period: "Jul 2023 — Jul 2027",
    score: "CGPA 8.5 / 10.0",
    focus: "Machine Learning & AI specialisation",
    highlights: [
      "Specialisation in Machine Learning and Artificial Intelligence",
      "Active member of coding clubs and technical societies",
      "Elected to student council leadership roles in consecutive years",
    ],
  },
  {
    degree: "Senior Secondary · Class XII",
    institution: "Kendriya Vidyalaya Bowenpally",
    location: "Hyderabad, Telangana",
    period: "2023",
    score: "CBSE",
    focus: "Science stream",
    highlights: [],
  },
] as const;

export const certifications = [
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft" },
  { title: "Microsoft Responsible Generative AI", issuer: "Microsoft" },
  { title: "NPTEL Elite — Java Programming", issuer: "NPTEL" },
  { title: "Cisco Python Essentials 1 & 2", issuer: "Cisco" },
  { title: "Java Certification", issuer: "HackerRank" },
  { title: "Python Certification", issuer: "HackerRank" },
] as const;

export const principles = [
  {
    index: "01",
    title: "Retrieval over guesswork",
    body: "Grounded answers beat confident hallucinations. I design RAG pipelines with clean chunking, vector search and evaluation loops.",
  },
  {
    index: "02",
    title: "Systems, not demos",
    body: "A notebook is a hypothesis. I ship the pipeline, the API, the dashboard and the deploy path that lets people actually use it.",
  },
  {
    index: "03",
    title: "Interfaces that explain",
    body: "Model output is only useful when a human can read it. I build the front ends that make probabilistic systems legible.",
  },
] as const;
