/**
 * Leadership and experience — sourced from the CV's
 * "Leadership and Experience" section and the previous site.
 */

export type TimelineEntry = {
  role: string;
  org: string;
  period: string;
  type: "Leadership" | "Community" | "Chapter";
  summary: string;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    role: "General Secretary",
    org: "Students' Council, SPSU",
    period: "2025 — 2026",
    type: "Leadership",
    summary:
      "Maintain all official records, minutes and council documentation while keeping decisions moving through the student body.",
    points: [
      "Led 10+ student council initiatives and streamlined coordination processes.",
      "Improved execution efficiency through structured planning.",
    ],
  },
  {
    role: "Vice President",
    org: "Xe-Tech Student Chapter, SPSU",
    period: "Apr 2026 — Present",
    type: "Chapter",
    summary:
      "Plan and run technical events with the student body, and push a stronger tech culture through competitive programming.",
    points: [
      "Managing and planning technical events in collaboration with the student body.",
      "Promoting technical competitions and fostering a strong tech culture across campus.",
    ],
  },
  {
    role: "Sports Secretary",
    org: "Students' Council, SPSU",
    period: "2024 — 2025",
    type: "Leadership",
    summary:
      "Led the sports board, coordinated every sports club and ran inter- and intra-college tournaments.",
    points: [
      "Managed sports equipment and coordinated club schedules.",
      "Promoted a campus-wide fitness culture through recurring tournaments.",
    ],
  },
  {
    role: "Core Coordinator",
    org: "LeetLegion Coding Club",
    period: "2024 — 2025",
    type: "Community",
    summary:
      "Ran coding challenges and technical sessions, and mentored students through problem solving.",
    points: [
      "Organized coding contests and workshops for 100+ students.",
      "Increased engagement through structured learning sessions.",
    ],
  },
];

export const marqueeItems = [
  "AI/ML Engineer",
  "RAG Systems",
  "NLP",
  "Generative AI",
  "Python",
  "React",
  "FastAPI",
  "Hyderabad, IN",
];
