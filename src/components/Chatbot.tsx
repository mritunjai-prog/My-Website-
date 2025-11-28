import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses = {
  greeting: [
    "Hi! I'm Mritunjai's AI assistant. How can I help you today?",
    "Hello! Welcome to Mritunjai's portfolio. What would you like to know?",
    "Hey there! I can help you learn more about Mritunjai's work and skills.",
  ],
  skills: [
    "Mritunjai specializes in AI/ML, with expertise in Python, Java, TensorFlow, and more. He's also skilled in web development with React and TypeScript.",
    "His technical skills include Machine Learning, Data Science, Full-stack Development, and System Design. Would you like to know more about any specific area?",
  ],
  projects: [
    "Mritunjai has worked on several impressive projects including KolamCraft (AI-powered art platform), MentorAid (student dropout prediction), and a Hospital Management System. Which one interests you?",
    "Check out the Projects section to see his work on AI/ML applications, web development, and system design. Each project showcases different technical skills!",
  ],
  contact: [
    "You can reach Mritunjai at mritunjay045k@gmail.com or connect on LinkedIn and GitHub. Feel free to reach out!",
    "Want to get in touch? Head to the Contact section or email mritunjay045k@gmail.com directly!",
  ],
  experience: [
    "Mritunjai is currently serving as Secretary at SPSU 2025-26 and was Sports Secretary in 2024-25. He's also a Core Coordinator at LeetLegion Coding Club.",
    "He has leadership experience in student organizations and has earned multiple certifications including NPTEL Java, CISCO Python, and Microsoft Azure.",
  ],
  default: [
    "That's a great question! You can explore the portfolio to learn more, or ask me about Mritunjai's skills, projects, or experience.",
    "I'm here to help! Try asking about skills, projects, experience, or how to contact Mritunjai.",
    "Feel free to ask me about Mritunjai's technical expertise, projects, or achievements!",
  ],
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  }
  if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
    return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
  }
  if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("built")) {
    return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
  }
  if (lowerMessage.includes("experience") || lowerMessage.includes("certification") || lowerMessage.includes("leadership")) {
    return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
  }
  
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you learn more about Mritunjai. Feel free to ask me anything!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50",
          "gradient-bg text-primary-foreground",
          "hover:scale-110 transition-all duration-300",
          "glow-primary",
          isOpen && "scale-0"
        )}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[600px] z-50",
          "glass-card border-2 border-primary/20 rounded-2xl shadow-elevated",
          "flex flex-col overflow-hidden",
          "transition-all duration-500",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        {/* Header */}
        <div className="gradient-bg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Always here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                  <Bot className="text-primary-foreground" size={16} />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[75%] p-3 rounded-2xl",
                  message.isBot
                    ? "bg-primary/10 text-foreground border border-primary/20"
                    : "gradient-bg text-primary-foreground"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="text-primary" size={16} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                <Bot className="text-primary-foreground" size={16} />
              </div>
              <div className="bg-primary/10 text-foreground border border-primary/20 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-primary/20 bg-background/80">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-background/50 border-primary/20 focus:border-primary"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="gradient-bg text-primary-foreground hover:opacity-90 transition-all hover:scale-105"
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by AI • Ask me anything!
          </p>
        </div>
      </div>
    </>
  );
}
