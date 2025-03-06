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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 precise-transition",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="transition-all duration-300 group-hover:scale-105">
              <img
                src="/Roodan-LOGO-without-background.png"
                alt="Roodan"
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "w-20 h-20" : "w-24 h-24"
                )}
              />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    "relative font-medium text-base hover:text-primary transition-colors precise-transition py-2",
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

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button
              asChild
              size="lg"
              className="hover-scale hover:shadow-md hover:bg-white hover:text-primary font-medium px-6"
            >
              <NavLink to="/inquiry" onClick={() => window.scrollTo(0, 0)}>
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
              className="h-10 w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/30 shadow-md animate-slide-down">
            <nav className="flex flex-col py-6 px-4">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "py-4 px-4 font-medium text-lg transition-colors",
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
              <div className="pt-4 pb-2 px-4">
                <Button className="w-full py-6 text-base" asChild>
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