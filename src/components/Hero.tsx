import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg?v=2";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-hero"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="opacity-0 animate-fade-in-left"
              style={{ animationDelay: "200ms" }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                AI/ML Developer & Competitive Programmer
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Hi, I'm <span className="gradient-text">Mritunjai Singh</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              A dedicated Machine Learning Engineer with strong expertise in
              building intelligent systems and data-driven solutions. Passionate
              about leveraging AI to create impactful and scalable solutions.
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start opacity-0 animate-fade-in"
              style={{ animationDelay: "800ms" }}
            >
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105 glow-primary"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div
              className="flex gap-4 mt-8 justify-center lg:justify-start opacity-0 animate-fade-in"
              style={{ animationDelay: "1000ms" }}
            >
              <a
                href="https://github.com/mritunjai-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:glow-primary"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mritunjai-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:glow-primary"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:mritunjay045k@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:glow-primary"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="flex-shrink-0 opacity-0 animate-scale-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-full blur-2xl opacity-50 animate-pulse-glow" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 animate-float aspect-square">
                <img
                  src={profileImage}
                  alt="Mritunjai Singh"
                  className="w-full h-full object-cover scale-105"
                  style={{ objectPosition: "center 30%", aspectRatio: "1/1" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1200ms" }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce-soft" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
