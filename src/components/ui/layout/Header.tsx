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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const routes = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/products", label: t("nav.products") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 precise-transition",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30 py-1 sm:py-2"
          : "bg-transparent py-2 sm:py-4"
      )}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="transition-all duration-300 group-hover:scale-105 flex items-center">
              <img
                src="/tree_logo.png"
                alt="Roodan"
                className={cn(
                  "transition-all duration-300",
                  isScrolled 
                    ? "w-16 h-14 sm:w-18 sm:h-16 md:w-20 md:h-18" 
                    : "w-20 h-18 sm:w-22 sm:h-20 md:w-24 md:h-22"
                )}
              />
              <span 
                className={cn(
                  "font-bold ml-2 tracking-wide transition-all duration-300 bg-clip-text text-transparent",
                  isScrolled
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-xl sm:text-2xl md:text-3xl"
                )}
                style={{ 
                  backgroundImage: "linear-gradient(to right,rgb(2, 75, 4),rgb(3, 152, 21))"
                }}
              >
                ROODAN
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    "relative font-medium text-sm lg:text-base hover:text-primary transition-colors precise-transition py-2",
                    isActive ? "text-primary font-semibold" : "text-foreground/80",
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transform after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                    {
                      "after:origin-bottom-left after:scale-x-100":
                        location.pathname === route.path,
                    }
                  )
                }
                onClick={() => window.scrollTo(0, 0)}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <LanguageSelector />
            <Button
              asChild
              size="sm"
              className="hover-scale hover:shadow-md hover:bg-white hover:text-primary font-medium px-3 lg:px-6 lg:text-base lg:size-lg"
            >
              <NavLink to="/inquiry" onClick={() => window.scrollTo(0, 0)}>
                {t("nav.inquiry")}
              </NavLink>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center space-x-2 sm:space-x-3">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[calc(100%-1px)] inset-x-0 bottom-0 bg-background border-t border-border/30 shadow-md animate-slide-down overflow-y-auto max-h-[80vh]">
            <nav className="flex flex-col py-4 sm:py-6 px-3 sm:px-4">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "py-3 sm:py-4 px-3 sm:px-4 font-medium text-base sm:text-lg transition-colors",
                      isActive
                        ? "text-primary bg-primary/5 rounded-md"
                        : "text-foreground/80"
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
              <div className="pt-3 sm:pt-4 pb-2 px-2 sm:px-4">
                <Button 
                  className="w-full py-4 sm:py-6 text-sm sm:text-base" 
                  asChild
                >
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