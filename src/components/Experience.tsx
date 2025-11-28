import { AnimatedSection } from "./AnimatedSection";
import { Briefcase, Award, Users } from "lucide-react";

const experiences = [
  {
    icon: Users,
    title: "Secretary",
    organization: "SPSU 2025-26",
    description:
      "Maintaining all official records, minutes of meetings, and council documentation, while ensuring effective communication and smooth execution of council decisions.",
  },
  {
    icon: Briefcase,
    title: "Sports Secretary",
    organization: "SPSU 2024-25",
    description:
      "Leads the sports board and coordinates with all sports clubs. Organizes inter and intra-college tournaments, manages sports equipment, and promotes fitness culture.",
  },
  {
    icon: Award,
    title: "Core Coordinator",
    organization: "LeetLegion Coding Club",
    description:
      "Directed coding challenges and technical sessions. Organized competitive programming events and mentored students in problem-solving skills.",
  },
];

const certifications = [
  "NPTEL: Elite certification in JAVA Programming",
  "CISCO: Hardware Basic, Python Essentials 1 & 2",
  "HubSpot Academy: Digital Marketing",
  "Microsoft: Azure Fundamentals, Responsible Generative AI",
  "HackerRank: Java & Python Certifications",
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leadership roles and professional achievements
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <AnimatedSection animation="fade-in-left">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                  <Briefcase className="text-primary-foreground" size={20} />
                </div>
                Experience
              </h3>
            </AnimatedSection>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <AnimatedSection
                  key={exp.title}
                  animation="fade-in-left"
                  delay={200 + index * 150}
                >
                  <div className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full gradient-bg" />
                    <div className="p-5 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-2">
                        <exp.icon className="text-primary" size={20} />
                        <h4 className="font-semibold">{exp.title}</h4>
                      </div>
                      <p className="text-sm text-primary mb-2">{exp.organization}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <AnimatedSection animation="fade-in-right">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                  <Award className="text-primary-foreground" size={20} />
                </div>
                Certifications
              </h3>
            </AnimatedSection>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <AnimatedSection
                  key={cert}
                  animation="fade-in-right"
                  delay={200 + index * 100}
                >
                  <div className="p-4 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full gradient-bg group-hover:animate-pulse-glow" />
                      <p className="text-sm">{cert}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
