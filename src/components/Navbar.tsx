import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "glass shadow-soft py-3" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-bold gradient-text transition-transform duration-300 hover:scale-105"
        >
          MS
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-sm">
                <User size={14} />
                <span className="font-medium">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 text-foreground hover:border-primary transition-all duration-300 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105 font-medium"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass overflow-hidden transition-all duration-500",
          isMobileMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
            >
              {link.name}
            </a>
          ))}
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm">
                <User size={14} />
                <span className="font-medium">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 text-foreground hover:border-primary transition-all duration-300 font-medium justify-center"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 font-medium justify-center mt-2"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
