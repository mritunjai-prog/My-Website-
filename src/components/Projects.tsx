import { AnimatedSection } from "./AnimatedSection";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    title: "DocuMind",
    subtitle: "Intelligent Document Processing System",
    year: "2026",
    summary:
      "Built an AI pipeline for large-scale document understanding with structured extraction, contextual search, and deployment-ready backend services.",
    highlights: [
      "Processed 1,000+ documents with 90% structured data extraction accuracy.",
      "Integrated OCR and NER for automated document understanding.",
      "Implemented RAG-based contextual question answering.",
      "Deployed scalable backend services using Docker.",
    ],
    tags: ["GenAI", "RAG", "OCR", "Docker", "NLP"],
    githubUrl: "https://github.com/mritunjai-prog/DocuMind",
    demoUrl: "https://documinnd.netlify.app",
  },
  {
    title: "StratosAI",
    subtitle: "GenAI Powered Decision Intelligence Platform",
    year: "2026",
    summary:
      "A decision support platform that combines GenAI, analytics, and visual reporting to surface trade-offs, SWOT insights, and historical comparisons.",
    highlights: [
      "Used OpenAI API via Supabase Edge Functions for decision analysis.",
      "Built a React 18, TypeScript, and Tailwind CSS frontend with Chart.js visualizations.",
      "Designed Supabase and PostgreSQL storage for historical decision data.",
      "Automated exportable reports with jsPDF and html2canvas.",
    ],
    tags: ["GenAI", "OpenAI", "Supabase", "Charts", "Dashboard"],
    githubUrl: "https://github.com/mritunjai-prog/StratosAI",
    demoUrl: "https://stratos-ai-rho.vercel.app",
  },
  {
    title: "MentorAid",
    subtitle: "ML Student Risk Prediction System",
    year: "2025",
    summary:
      "A student risk prediction system focused on early intervention, model comparison, and analytics-driven educational decision-making.",
    highlights: [
      "Trained 6 ML models including Random Forest, SVM, and neural networks.",
      "Achieved 84% accuracy through feature engineering and tuning.",
      "Developed an end-to-end ML pipeline.",
      "Built a real-time analytics dashboard.",
    ],
    tags: ["Machine Learning", "Analytics", "Dashboard", "Python"],
    demoUrl: "https://mentoraid.netlify.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
  {
    title: "DocentDesk",
    subtitle: "NLP-Based Museum Chatbot",
    year: "2025",
    summary:
      "A museum companion platform that blends conversational NLP with full-stack services to improve discovery and engagement.",
    highlights: [
      "Developed a conversational chatbot using retrieval-based NLP.",
      "Integrated REST APIs for full-stack communication.",
      "Improved search and response relevance.",
      "Deployed on cloud infrastructure.",
    ],
    tags: ["NLP", "React", "TypeScript", "Supabase", "Museums"],
    demoUrl: "https://docent-desk-ai-chatbot.vercel.app",
    githubUrl: "https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot",
  },
  {
    title: "KolamCraft",
    subtitle: "AI Cultural Art Generation Platform",
    year: "2025",
    summary:
      "An interactive cultural-tech platform that preserves Kolam art through AI-generated patterns and customization tools.",
    highlights: [
      "Built an AI-based geometric pattern generation system.",
      "Developed an interactive customization editor.",
      "Integrated frontend with backend services.",
      "Enabled scalable user-generated content features.",
    ],
    tags: ["AI", "Cultural Tech", "React", "Creative Tools"],
    demoUrl: "https://kolamcraft.netlify.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
  {
    title: "Amphitheatre Booking System",
    subtitle: "Seat Allocation & Management App",
    year: "2025",
    summary:
      "Interactive seating management tool using React and TypeScript. Supports manual seat assignment, search functionality, and data export for 1000+ seats.",
    highlights: [
      "Built interactive seat allocation system for 1000+ seats.",
      "Implemented manual seat assignment functionality.",
      "Added search and filtering capabilities.",
      "Enabled data export and management features.",
    ],
    tags: ["React", "TypeScript", "Management", "UI/UX"],
    demoUrl:
      "https://amphitheatre-booking-git-main-mritunjai-singhs-projects.vercel.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
];

const stats = [
  { label: "Resume projects", value: "6" },
  { label: "Focus areas", value: "GenAI + ML" },
  { label: "Stack depth", value: "Full-stack" },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            <Sparkles size={14} className="mr-2" />
            Updated from latest resume
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            The portfolio now reflects the latest CV, with stronger emphasis on
            GenAI, NLP, ML systems, and polished full-stack delivery.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-12">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-lg backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              animation="slide-up"
              delay={index * 80}
            >
              <Card className="group relative h-full overflow-hidden border border-primary/10 bg-card/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

                <CardHeader className="relative space-y-5 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary"
                    >
                      <Calendar size={12} className="mr-2" />
                      {project.year}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      <Sparkles size={14} className="text-primary" />
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div>
                    <CardTitle className="text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </CardTitle>
                    <p className="mt-2 text-sm font-semibold text-primary md:text-base">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    {project.summary}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                        <p className="text-sm leading-6 text-foreground/90">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border border-primary/10 bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-3 border-t border-border/60 bg-background/30 pt-5">
                  {project.githubUrl ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 border-primary/30 font-semibold transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  ) : null}

                  {project.demoUrl ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 border-primary/30 font-semibold transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Live
                      </a>
                    </Button>
                  ) : null}

                  {!project.githubUrl && !project.demoUrl ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowUpRight size={16} />
                      Resume detail only for now
                    </div>
                  ) : null}
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
