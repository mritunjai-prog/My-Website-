/**
 * Work experience, leadership and recognition — sourced from the latest résumé
 * (Mritunjai_Singh_Python_DS_AIML.pdf).
 */

export type WorkEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const workExperience: WorkEntry[] = [
  {
    role: "Product Intern",
    company: "Xebia",
    period: "Jun 2026 — Jul 2026",
    location: "India",
    summary:
      "Shipped production-facing products with a cross-functional team — product design, architecture and feature delivery, plus ownership of a six-person squad.",
    points: [
      "Developed and delivered 3+ software products, including a React Native mobile application and an enterprise Learning Management System (LMS), contributing to product design, architecture and implementation.",
      "Collaborated with UX/UI designers, QA engineers and stakeholders to gather requirements, conduct code reviews and apply best practices.",
      "Led and coordinated a 6-member project team through the full software development lifecycle — task allocation, progress tracking and on-time milestone delivery.",
    ],
    stack: [
      "React",
      "React Native",
      "JavaScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
    ],
  },
];

export type TimelineEntry = {
  role: string;
  org: string;
  period: string;
  type: "Leadership" | "Chapter" | "Award";
  summary: string;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    role: "General Secretary",
    org: "Student Council, SPSU",
    period: "2025 — 2026",
    type: "Leadership",
    summary:
      "Led the student council's operating rhythm — records, minutes, coordination and delivery across the institution.",
    points: [
      "Led 25+ student council initiatives and coordinated teams of 20+ members.",
      "Delivered institutional events on time while keeping documentation and communication tight.",
    ],
  },
  {
    role: "Vice President",
    org: "XeTech Club, SPSU",
    period: "Apr 2026 — Present",
    type: "Chapter",
    summary:
      "Run the club's technical calendar with the Xebia team — competitions, hackathons and hands-on workshops.",
    points: [
      "Organised design competitions, hackathons, workshops and treasure hunts under the Xebia team.",
      "Engaged 1,000+ students across events.",
    ],
  },
  {
    role: "Winner — Xebia Promptathon",
    org: "Xebia",
    period: "Mar 2026",
    type: "Award",
    summary:
      "Won the Xebia Promptathon by designing and shipping an AI-integrated software solution inside a 12-hour sprint.",
    points: [
      "Built an AI-integrated software solution in 12 hours with one teammate.",
      "Owned both the prompt architecture and the working prototype.",
    ],
  },
];

export const marqueeItems = [
  "AI/ML Engineer",
  "Python Developer",
  "RAG Systems",
  "Computer Vision",
  "Data Science",
  "FastAPI",
  "React Native",
  "Hyderabad, IN",
];
