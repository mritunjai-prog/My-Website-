/**
 * Work experience, leadership and recognition.
 * Sourced from the latest résumé (Mritunjai_Singh_Python_DS_AIML.pdf).
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
    period: "Jun 2026 to Jul 2026",
    location: "India",
    summary:
      "A summer inside a product team, shipping features across a React Native app and an enterprise LMS.",
    points: [
      "Shipped 3+ products during the internship, including a React Native mobile app and an enterprise LMS, working on product design, architecture and implementation.",
      "Worked directly with UX/UI designers, QA engineers and stakeholders on requirements, code reviews and delivery practices.",
      "Led a 6-member team through the development lifecycle: task allocation, progress tracking and hitting milestones on time.",
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
    period: "2025 to 2026",
    type: "Leadership",
    summary:
      "Kept the council running: records, minutes, coordination and delivery across the institution.",
    points: [
      "Led 25+ student council initiatives and coordinated teams of 20+ members.",
      "Got institutional events delivered on time without losing the documentation.",
    ],
  },
  {
    role: "Vice President",
    org: "XeTech Club, SPSU",
    period: "Apr 2026 to Present",
    type: "Chapter",
    summary:
      "Run the club's technical calendar with the Xebia team: competitions, hackathons and hands-on workshops.",
    points: [
      "Organised design competitions, hackathons, workshops and treasure hunts under the Xebia team.",
      "Engaged 1,000+ students across events.",
    ],
  },
  {
    role: "Winner, Xebia Promptathon",
    org: "Xebia",
    period: "Mar 2026",
    type: "Award",
    summary:
      "Won the Xebia Promptathon by designing and shipping an AI-integrated product inside a 12-hour sprint.",
    points: [
      "Built an AI-integrated software solution in 12 hours with one teammate.",
      "Owned both the prompt architecture and the working prototype.",
    ],
  },
];

export const marqueeItems = [
  "AI Engineer",
  "Python Developer",
  "RAG Systems",
  "Computer Vision",
  "Data Science",
  "FastAPI",
  "React Native",
  "Hyderabad, IN",
];
