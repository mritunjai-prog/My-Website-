import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";
import { Code2, Brain, Wrench, Monitor, Database, GitBranch } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "C++", icon: Code2, color: "#00599C" },
      { name: "Java", icon: Code2, color: "#007396" },
      { name: "Python", icon: Code2, color: "#3776AB" },
      { name: "MySQL", icon: Database, color: "#4479A1" },
      { name: "JavaScript", icon: Code2, color: "#F7DF1E" },
    ],
  },
  {
    title: "ML & Data Science",
    icon: Brain,
    skills: [
      { name: "TensorFlow", icon: Brain, color: "#FF6F00" },
      { name: "Keras", icon: Brain, color: "#D00000" },
      { name: "Scikit-Learn", icon: Brain, color: "#F7931E" },
      { name: "Pandas", icon: Database, color: "#150458" },
      { name: "NumPy", icon: Brain, color: "#013243" },
      { name: "Matplotlib", icon: Brain, color: "#11557c" },
      { name: "Seaborn", icon: Brain, color: "#4C72B0" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Docker", icon: Wrench, color: "#2496ED" },
      { name: "Git", icon: GitBranch, color: "#F05032" },
      { name: "GitHub", icon: GitBranch, color: "#181717" },
      { name: "Tableau", icon: Wrench, color: "#E97627" },
      { name: "Apache NiFi", icon: Wrench, color: "#728E9B" },
      { name: "Jupyter", icon: Code2, color: "#F37626" },
      { name: "Google Colab", icon: Brain, color: "#F9AB00" },
    ],
  },
  {
    title: "IDEs & Software",
    icon: Monitor,
    skills: [
      { name: "VS Code", icon: Monitor, color: "#007ACC" },
      { name: "IntelliJ IDEA", icon: Monitor, color: "#000000" },
      { name: "PyCharm", icon: Monitor, color: "#21D789" },
      { name: "Anaconda", icon: Code2, color: "#44A833" },
      { name: "Postman", icon: Wrench, color: "#FF6C37" },
      { name: "MongoDB", icon: Database, color: "#47A248" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedSection
              key={category.title}
              animation="scale-in"
              delay={categoryIndex * 150}
            >
              <div className="p-6 rounded-xl glass-card h-full hover:shadow-elevated transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <category.icon className="text-primary-foreground" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold gradient-text">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className={cn(
                          "px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2",
                          "bg-primary/10 text-primary border border-primary/20",
                          "hover:bg-primary hover:text-primary-foreground",
                          "transition-all duration-300 hover:scale-110 cursor-default group"
                        )}
                        style={{
                          animationDelay: `${(categoryIndex * 150) + (skillIndex * 50)}ms`,
                        }}
                      >
                        <SkillIcon 
                          className="w-4 h-4 transition-transform group-hover:scale-125" 
                          style={{ color: skill.color }}
                        />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
