/**
 * Skill taxonomy, matching the latest résumé's "Technical Skills" block.
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
    skills: ["Python", "SQL", "C++", "Java", "JavaScript", "C"],
  },
  {
    id: "backend",
    label: "Python Backend",
    caption: "APIs that hold up",
    skills: ["FastAPI", "Flask", "Pydantic", "Starlette", "REST APIs", "JWT"],
  },
  {
    id: "data",
    label: "Databases & Retrieval",
    caption: "Relational + vector",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "ChromaDB",
      "FAISS",
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    caption: "Train, evaluate, ship",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Deep Learning",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    id: "ds",
    label: "Data Science",
    caption: "From raw rows to signal",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Predictive Modeling",
      "Classification",
      "Data Visualization",
    ],
  },
  {
    id: "genai",
    label: "GenAI & NLP",
    caption: "Retrieval-grounded systems",
    skills: [
      "RAG",
      "LLM Integration",
      "Prompt Engineering",
      "NER",
      "LangChain",
      "LangGraph",
      "Transformers",
      "Hugging Face",
    ],
  },
  {
    id: "tooling",
    label: "Tools & Platforms",
    caption: "Ship and iterate",
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "Postman",
      "Ollama",
      "GitHub Copilot",
      "Claude",
      "Linux",
      "AWS",
    ],
  },
];

/** Nodes rendered inside the 3D orbit. Short labels read better in space. */
export const orbitSkills = [
  "Python",
  "RAG",
  "FastAPI",
  "LangChain",
  "TensorFlow",
  "OpenCV",
  "Hugging Face",
  "FAISS",
  "ChromaDB",
  "PostgreSQL",
  "React",
  "TypeScript",
  "Flask",
  "Scikit-learn",
  "NLP",
  "LLMs",
  "Docker",
  "AWS",
  "NumPy",
  "Pandas",
  "SQL",
  "Java",
] as const;

export const skillCount = skillGroups.reduce(
  (total, group) => total + group.skills.length,
  0,
);
