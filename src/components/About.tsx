import { AnimatedSection } from "./AnimatedSection";
import { MapPin, Code2, Trophy } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    title: "Location",
    description: "Hyderabad, India",
  },
  {
    icon: Code2,
    title: "Specialization",
    description: "Machine Learning & AI Development",
  },
  {
    icon: Trophy,
    title: "Leadership",
    description: "Secretary SPSU 2025-26, Sports Secretary 2024-25",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives me
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-in-left" delay={200}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A dedicated and innovation-driven Machine Learning Engineer with strong 
                expertise in building intelligent systems and data-driven solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Highly proficient in Java, with solid experience in Python, machine learning 
                algorithms, model development, and performance optimization. Possess good 
                knowledge of frontend development using HTML, CSS, JavaScript, and React.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Known for strong problem-solving abilities, clear communication, and a 
                collaborative mindset. Committed to leveraging technical excellence to 
                design impactful and scalable AI/ML solutions.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-right" delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:animate-bounce-soft">
                    <item.icon className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
