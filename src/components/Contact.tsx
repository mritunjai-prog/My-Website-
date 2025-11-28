import { AnimatedSection } from "./AnimatedSection";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mritunjay045k@gmail.com",
    href: "mailto:mritunjay045k@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9347147615",
    href: "tel:+919347147615",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection animation="fade-in-left" delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas, or 
                  opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center group-hover:animate-bounce-soft">
                      <info.icon className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/mritunjai-prog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:gradient-bg group"
                >
                  <Github className="group-hover:text-primary-foreground transition-colors" size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/mritunjai-singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:gradient-bg group"
                >
                  <Linkedin className="group-hover:text-primary-foreground transition-colors" size={24} />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="fade-in-right" delay={400}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-8 rounded-2xl glass-card">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6 gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-[1.02] glow-primary"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
