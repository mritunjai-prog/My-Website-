import { AnimatedSection } from "./AnimatedSection";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Sir Padampat Singhania University",
    location: "Udaipur, Rajasthan",
    duration: "2022 - 2026",
    cgpa: "8.5 CGPA",
    highlights: [
      "Specialization in Machine Learning & AI",
      "Active member of coding clubs and technical societies",
      "Leadership roles in student council",
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background and achievements
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <AnimatedSection
              key={index}
              animation="fade-in-left"
              delay={200}
            >
              <div className="relative p-8 rounded-2xl glass-card hover:shadow-elevated transition-all duration-500">
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-32 h-32 gradient-bg opacity-10 rounded-bl-full" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="text-primary-foreground" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                        <p className="text-lg text-primary font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Calendar size={16} className="text-primary" />
                        <span className="text-sm font-medium">{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Award size={16} className="text-primary" />
                        <span className="text-sm font-medium">{edu.cgpa}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    {edu.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full gradient-bg mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
