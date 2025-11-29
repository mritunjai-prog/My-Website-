import { AnimatedSection } from "./AnimatedSection";
import { Users, Briefcase, Award } from "lucide-react";

export const experiences = [
  {
    icon: Users,
    title: "General Secretary",
    organization: "SPSU 2025-26",
    description:
      "I maintain all official records, minutes of meetings, and council documentation, ensuring effective communication and the smooth execution of council decisions.",
  },
  {
    icon: Briefcase,
    title: "Sports Secretary",
    organization: "SPSU 2024-25",
    description:
      "I lead the sports board and coordinate with all sports clubs. I organize inter- and intra-college tournaments, manage sports equipment, and promote a fitness culture.",
  },
  {
    icon: Award,
    title: "Core Coordinator",
    organization: "LeetLegion Coding Club",
    description:
      "I lead coding challenges and technical sessions, organize competitive programming events, and mentor students to improve their problem-solving skills.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leadership roles and contributions
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <AnimatedSection
                key={index}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="h-full p-6 rounded-2xl glass-card hover:shadow-elevated transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-primary font-medium mb-3">{exp.organization}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
