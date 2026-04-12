import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MouseFollower } from "@/components/MouseFollower";
import { AnimatedSection } from "@/components/AnimatedSection";

const About = lazy(() =>
  import("@/components/About").then((module) => ({ default: module.About })),
);
const Skills = lazy(() =>
  import("@/components/Skills").then((module) => ({ default: module.Skills })),
);
const Education = lazy(() =>
  import("@/components/Education").then((module) => ({
    default: module.Education,
  })),
);
const Projects = lazy(() =>
  import("@/components/Projects").then((module) => ({
    default: module.Projects,
  })),
);
const Experience = lazy(() =>
  import("@/components/Experience").then((module) => ({
    default: module.Experience,
  })),
);
const Contact = lazy(() =>
  import("@/components/Contact").then((module) => ({
    default: module.Contact,
  })),
);
const Footer = lazy(() =>
  import("@/components/Footer").then((module) => ({ default: module.Footer })),
);
const Chatbot = lazy(() =>
  import("@/components/Chatbot").then((module) => ({
    default: module.Chatbot,
  })),
);

function SectionFallback() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="h-32 w-full rounded-2xl bg-secondary/60 animate-pulse" />
    </div>
  );
}

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <MouseFollower />
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection animation="fade-in" delay={40}>
          <About />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={110}>
          <Skills />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={180}>
          <Education />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={250}>
          <Projects />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={320}>
          <Experience />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={390}>
          <Contact />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={460}>
          <Footer />
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={530}>
          <Chatbot />
        </AnimatedSection>
      </Suspense>
    </main>
  );
};

export default Index;
