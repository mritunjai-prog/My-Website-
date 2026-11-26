/**
 * Project content — titles, summaries, metrics, stack and URLs are taken from
 * the latest résumé (Mritunjai_Singh_Python_DS_AIML.pdf) and the live repos.
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
    slug: "knowflow",
    index: "01",
    title: "KnowFlow",
    subtitle: "AI Knowledge Assistant · RAG + Vision",
    year: "2026 — Present",
    summary:
      "A knowledge assistant that reads documents with computer vision, tags them by topic and answers questions over the retrieval layer — with a dashboard and a knowledge-graph view.",
    highlights: [
      "Developing a RAG document pipeline using OpenCV, OCR, ML topic tagging and action-item detection.",
      "Implementing FAISS/Chroma retrieval with LLM-driven Q&A on a FastAPI + PostgreSQL backend.",
      "Creating a React/TypeScript frontend with Zustand and TanStack Query, featuring a dashboard and knowledge-graph view.",
    ],
    tags: ["RAG", "Computer Vision", "FastAPI", "React", "ChromaDB"],
    role: "Individual project · Full-stack AI",
    githubUrl: "https://github.com/mritunjai-prog/KnowFlow",
    accent: "#d9ff3f",
    secondary: "#5ee7ff",
    featured: true,
  },
  {
    slug: "documind",
    index: "02",
    title: "DocuMind",
    subtitle: "Intelligent Document Processing",
    year: "2026",
    summary:
      "An AI document-processing pipeline: Hugging Face transformers for extraction and classification, LangChain RAG for contextual Q&A, and Dockerised Python services behind it.",
    highlights: [
      "Processed 1,000+ documents with 92% structured data extraction accuracy.",
      "Integrated Hugging Face transformer models for entity recognition, document classification and automated extraction.",
      "Implemented LangChain-based RAG pipelines for contextual question answering using semantic search and vector retrieval.",
      "Designed and deployed scalable Python backend services with Docker for ingestion, processing, retrieval and response generation.",
    ],
    tags: ["RAG", "LangChain", "Hugging Face", "FastAPI", "Docker"],
    role: "AI pipeline · Python backend",
    githubUrl: "https://github.com/mritunjai-prog/DocuMind",
    demoUrl: "https://documinnd.netlify.app",
    accent: "#8b6cff",
    secondary: "#d9ff3f",
    featured: true,
  },
  {
    slug: "mentoraid",
    index: "03",
    title: "MentorAid",
    subtitle: "ML Student Risk Prediction",
    year: "2025",
    summary:
      "A dropout-risk prediction system trained and compared across 19 models on 9,424 student records, wrapped in a Flask prediction API and a React analytics dashboard.",
    highlights: [
      "Trained and compared 19 ML models — Random Forest, SVM and Logistic Regression — on 9,424 student records.",
      "Built an end-to-end pipeline with feature engineering and SMOTE class balancing, reaching 84% accuracy with an optimised Random Forest.",
      "Shipped a Flask REST API for CSV batch predictions using Joblib-serialised models, returning risk classes and confidence scores.",
      "Created a React/TypeScript analytics dashboard with interactive charts, student-level insights and intervention tracking.",
    ],
    tags: ["Machine Learning", "Scikit-learn", "Flask", "React", "Analytics"],
    role: "ML Engineer & Data Scientist",
    demoUrl: "https://mentoraid.netlify.app",
    githubUrl:
      "https://github.com/mritunjai-prog/MentorAid-AI-based-Student-drop-out-prediction-system",
    accent: "#5ee7ff",
    secondary: "#d9ff3f",
    featured: true,
  },
  {
    slug: "stratosai",
    index: "04",
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
    accent: "#ff9a5e",
    secondary: "#8b6cff",
  },
  {
    slug: "docentdesk",
    index: "05",
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
    accent: "#9d8cff",
    secondary: "#5ee7ff",
  },
  {
    slug: "kolamcraft",
    index: "06",
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
    index: "07",
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
  { value: "07", label: "Projects shipped" },
  { value: "06", label: "Live deployments" },
  { value: "03+", label: "Products at Xebia" },
] as const;
