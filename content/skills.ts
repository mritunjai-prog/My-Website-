/**
 * Skill taxonomy, matching the CV's "Technical Skills" block plus the
 * additional tools listed on the previous portfolio.
 */

export type SkillGroup = {
  id: string;
  label: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    caption: "Daily drivers",
    skills: ["Python", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    caption: "Supervised · deep · tuning",
    skills: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    id: "genai",
    label: "GenAI & NLP",
    caption: "Retrieval-grounded systems",
    skills: [
      "Prompt engineering",
      "RAG",
      "NER",
      "Vector databases",
      "LLM integration",
      "OCR",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    caption: "Interfaces for models",
    skills: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
  },
  {
    id: "backend",
    label: "Backend & Data",
    caption: "Pipelines that hold up",
    skills: [
      "FastAPI",
      "REST APIs",
      "Supabase",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    caption: "Ship and iterate",
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "Postman",
      "Jupyter",
      "Tableau",
      "Apache NiFi",
    ],
  },
];

/** Nodes rendered inside the 3D orbit. Short labels read better in space. */
export const orbitSkills = [
  "Python",
  "RAG",
  "TensorFlow",
  "React",
  "FastAPI",
  "NLP",
  "Docker",
  "PostgreSQL",
  "TypeScript",
  "Scikit-learn",
  "OpenAI",
  "Supabase",
  "C++",
  "Java",
  "Pandas",
  "LLMs",
  "NumPy",
  "Tailwind",
  "Git",
  "MongoDB",
  "Redis",
  "Keras",
] as const;

export const skillCount = skillGroups.reduce(
  (total, group) => total + group.skills.length,
  0,
);
