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

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="fade-in-left"
                  delay={index * 150}
                >
                  <div className="relative pl-20">
                    {/* Timeline dot and icon */}
                    <div className="absolute left-0 top-0 w-16 h-16 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="text-primary-foreground" size={28} />
                    </div>
                    
                    {/* Content card */}
                    <div className="p-8 rounded-2xl glass-card hover:shadow-elevated transition-all duration-500 group">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                        <p className="text-primary text-lg font-medium mb-3">
                          {exp.organization}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
