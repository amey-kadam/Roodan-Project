import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useI18n } from "@/utils/i18n";
import { LanguageSelector } from "@/components/ui/home/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Menu, X, CircleUserRound } from "lucide-react";

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scrolling for page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/products", label: t("nav.products") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 precise-transition",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/" 
            className="flex items-center space-x-4 group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="rounded-full p-2.5 transition-all duration-300 group-hover:scale-110">
              <img src="/logo.png" alt="Roodan" className="w-11 h-11 rounded-full bg-white" />
            </div>
            <span className="text-xl font-display font-semibold">ROODAN</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    "relative font-medium text-sm hover:text-primary transition-colors precise-transition",
                    isActive ? "text-primary" : "text-foreground/80",
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transform after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                    { "after:origin-bottom-left after:scale-x-100": location.pathname === route.path }
                  )
                }
                onClick={() => window.scrollTo(0, 0)}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              asChild 
              size="sm" 
              className="hover-scale hover:shadow-md hover:bg-white hover:text-primary"
            >
              <NavLink 
                to="/inquiry"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t("nav.inquiry")}
              </NavLink>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/30 shadow-md animate-slide-down">
            <nav className="flex flex-col py-4 px-4">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "py-3 px-4 font-medium transition-colors",
                      isActive ? "text-primary bg-primary/5 rounded-md" : "text-foreground/80"
                    )
                  }
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {route.label}
                </NavLink>
              ))}
              <div className="pt-2 pb-3 px-4">
                <Button className="w-full" asChild>
                  <NavLink 
                    to="/inquiry" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {t("nav.inquiry")}
                  </NavLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}