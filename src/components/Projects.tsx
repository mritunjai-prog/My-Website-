import { AnimatedSection } from "./AnimatedSection";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "DocentDesk",
    subtitle: "AI Museum Companion Platform",
    description:
      "Comprehensive museum platform with AI chatbot, multilingual support (8 languages), 3D virtual tours, event booking system with QR tickets, and voice interaction. Features Egyptian artifacts gallery, Google OAuth authentication, and PWA capabilities.",
    date: "Nov 2025 – Dec 2025",
    tags: ["AI", "React", "TypeScript", "3D", "PWA", "Supabase"],
    demoUrl: "https://docent-desk-ai-chatbot.vercel.app",
    githubUrl: "https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot",
  },
  {
    title: "KolamCraft",
    subtitle: "A Digital Renaissance for India's Sacred Art",
    description:
      "Interactive platform preserving traditional Kolam art through AI-generated designs, step-by-step learning modules, and a geometric pattern editor. Integrates cultural heritage with technology.",
    date: "Sep 2025 – Oct 2025",
    tags: ["AI", "Cultural Tech", "React"],
    demoUrl: "https://kolamcraft.netlify.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
  {
    title: "MentorAid",
    subtitle: "AI-based Student Dropout Prediction System",
    description:
      "Web-based system using machine learning to identify at-risk students, deliver real-time analytics, and support data-driven decision-making for educators.",
    date: "Jul 2025 – Nov 2025",
    tags: ["Machine Learning", "Analytics", "Web App"],
    demoUrl: "https://mentoraid.netlify.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
  {
    title: "Hospital Management System",
    subtitle: "End-to-End Hospital Operation Management",
    description:
      "Modular system in Java with JDBC for MySQL connectivity. Implemented patient/doctor CRUD operations, appointment scheduling, and SQL injection prevention.",
    date: "Jun 2025 – Jul 2025",
    tags: ["Java", "JDBC", "MySQL"],
    demoUrl: "",
    githubUrl: "https://github.com/mritunjai-prog/Hospital-Management-System",
  },
  {
    title: "CO₂ Emission Prediction",
    subtitle: "Data Mining & Machine Learning Analysis",
    description:
      "Data-driven study analyzing global CO₂ emission trends using international datasets. Applied machine learning algorithms for prediction and pattern discovery.",
    date: "Nov 2025 – Present",
    tags: ["Data Mining", "ML", "Environmental"],
    demoUrl: "",
    githubUrl: "https://github.com/mritunjai-prog",
  },
  {
    title: "Amphitheatre Booking System",
    subtitle: "Seat Allocation & Management App",
    description:
      "Interactive seating management tool using React and TypeScript. Supports manual seat assignment, search functionality, and data export for 1000+ seats.",
    date: "Jun 2025 – Sep 2025",
    tags: ["React", "TypeScript", "Management"],
    demoUrl:
      "https://amphitheatre-booking-git-main-mritunjai-singhs-projects.vercel.app",
    githubUrl: "https://github.com/mritunjai-prog",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Some of my recent work and contributions showcasing my skills in
            AI/ML, web development, and system design
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group h-full p-8 rounded-2xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 flex flex-col border-2 border-primary/10 hover:border-primary/30 relative overflow-hidden">
                {/* Decorative gradient corner */}
                <div className="absolute top-0 right-0 w-32 h-32 gradient-bg opacity-10 rounded-bl-full transition-all duration-500 group-hover:opacity-20" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

                <div className="relative z-10">
                  {/* Project header with icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                      <ExternalLink
                        className="text-primary-foreground"
                        size={24}
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                      <Calendar size={12} className="text-primary" />
                      <span className="text-xs font-medium text-primary">
                        {project.date}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-base text-primary mb-4 font-semibold">
                    {project.subtitle}
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />

                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed min-h-[80px]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto relative z-10">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 hover:gradient-bg hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary font-semibold group/btn"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github
                          size={18}
                          className="mr-2 group-hover/btn:scale-110 transition-transform"
                        />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 hover:gradient-bg hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary font-semibold group/btn"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink
                          size={18}
                          className="mr-2 group-hover/btn:scale-110 transition-transform"
                        />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
