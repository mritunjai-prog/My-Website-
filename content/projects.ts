/**
 * Project content — titles, summaries, metrics, stack and URLs are taken
 * verbatim (or lightly trimmed) from the CV and the existing live site.
 * Nothing here is invented.
 */

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  highlights: string[];
  tags: string[];
  role: string;
  githubUrl?: string;
  demoUrl?: string;
  /** Visual identity for this project — used by the CSS/WebGL-free artwork. */
  accent: string;
  secondary: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "documind",
    index: "01",
    title: "DocuMind",
    subtitle: "Intelligent Document Processing System",
    year: "2026",
    summary:
      "An AI pipeline for large-scale document understanding: structured extraction, contextual search and deployment-ready backend services.",
    highlights: [
      "Processed 1,000+ documents with 90% structured data extraction accuracy.",
      "Integrated OCR and NER for automated document understanding.",
      "Implemented RAG-based contextual question answering.",
      "Deployed scalable backend services using Docker.",
    ],
    tags: ["GenAI", "RAG", "OCR", "NLP", "Docker"],
    role: "AI pipeline · Backend · Retrieval",
    githubUrl: "https://github.com/mritunjai-prog/DocuMind",
    demoUrl: "https://documinnd.netlify.app",
    accent: "#d9ff3f",
    secondary: "#8b6cff",
    featured: true,
  },
  {
    slug: "stratosai",
    index: "02",
    title: "StratosAI",
    subtitle: "GenAI Decision Intelligence Platform",
    year: "2026",
    summary:
      "A decision-support platform that combines GenAI, analytics and visual reporting to surface trade-offs, SWOT insights and historical comparisons.",
    highlights: [
      "Used the OpenAI API via Supabase Edge Functions for decision analysis.",
      "Built a React 18, TypeScript and Tailwind CSS frontend with Chart.js visualisations.",
      "Designed Supabase and PostgreSQL storage for historical decision data.",
      "Automated exportable reports with jsPDF and html2canvas.",
    ],
    tags: ["GenAI", "OpenAI", "Supabase", "Charts", "TypeScript"],
    role: "Product engineering · GenAI integration",
    githubUrl: "https://github.com/mritunjai-prog/StratosAI",
    demoUrl: "https://stratos-ai-rho.vercel.app",
    accent: "#8b6cff",
    secondary: "#5ee7ff",
    featured: true,
  },
  {
    slug: "mentoraid",
    index: "03",
    title: "MentorAid",
    subtitle: "ML Student Risk Prediction",
    year: "2025",
    summary:
      "A student-risk prediction system for early intervention, built around model comparison and analytics-driven educational decisions.",
    highlights: [
      "Trained 6 ML models including Random Forest, SVM and neural networks.",
      "Reached 84% accuracy through feature engineering and tuning.",
      "Developed an end-to-end ML pipeline.",
      "Built a real-time analytics dashboard.",
    ],
    tags: ["Machine Learning", "Python", "Analytics", "Dashboard"],
    role: "Modelling · Data pipeline · Dashboard",
    demoUrl: "https://mentoraid.netlify.app",
    githubUrl: "https://github.com/mritunjai-prog",
    accent: "#5ee7ff",
    secondary: "#d9ff3f",
    featured: true,
  },
  {
    slug: "docentdesk",
    index: "04",
    title: "DocentDesk",
    subtitle: "NLP Museum Companion",
    year: "2025",
    summary:
      "A museum companion that pairs conversational NLP with full-stack services to improve discovery and visitor engagement.",
    highlights: [
      "Built a conversational chatbot using retrieval-based NLP.",
      "Integrated REST APIs for full-stack communication.",
      "Improved search and response relevance.",
      "Deployed on cloud infrastructure.",
    ],
    tags: ["NLP", "RAG", "React", "Supabase"],
    role: "NLP · Full-stack",
    githubUrl: "https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot",
    demoUrl: "https://docent-desk-ai-chatbot.vercel.app",
    accent: "#ff9a5e",
    secondary: "#8b6cff",
  },
  {
    slug: "kolamcraft",
    index: "05",
    title: "KolamCraft",
    subtitle: "AI Cultural Art Platform",
    year: "2025",
    summary:
      "A cultural-tech platform that preserves Kolam art through AI-generated geometric patterns and interactive customisation tools.",
    highlights: [
      "Built an AI-based geometric pattern generation system.",
      "Developed an interactive customisation editor.",
      "Integrated the frontend with backend services.",
      "Enabled scalable user-generated content features.",
    ],
    tags: ["AI", "Cultural Tech", "React", "Creative Tools"],
    role: "Generative visuals · Frontend",
    githubUrl: "https://github.com/mritunjai-prog",
    demoUrl: "https://kolamcraft.netlify.app",
    accent: "#ff6fa5",
    secondary: "#ffb35e",
  },
  {
    slug: "amphitheatre",
    index: "06",
    title: "Amphitheatre",
    subtitle: "Seat Allocation System",
    year: "2025",
    summary:
      "An interactive seating management tool for large venues — manual seat assignment, search and data export across 1,000+ seats.",
    highlights: [
      "Built an interactive seat allocation system for 1000+ seats.",
      "Implemented manual seat assignment functionality.",
      "Added search and filtering capabilities.",
      "Enabled data export and management features.",
    ],
    tags: ["React", "TypeScript", "Product", "UI/UX"],
    role: "Frontend · Interaction design",
    githubUrl: "https://github.com/mritunjai-prog",
    demoUrl:
      "https://amphitheatre-booking-git-main-mritunjai-singhs-projects.vercel.app",
    accent: "#9dff8a",
    secondary: "#5ee7ff",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const nextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};

export const projectStats = [
  { value: "06", label: "Projects shipped" },
  { value: "06", label: "Live deployments" },
  { value: "100%", label: "End-to-end builds" },
] as const;
