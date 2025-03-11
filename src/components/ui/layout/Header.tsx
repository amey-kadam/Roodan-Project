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

  // Using emerald colors from Hero.tsx
  const logoGradient = "linear-gradient(to right, #0a5d36, #4ade80)";
  const navHoverGradient = "linear-gradient(to right, #047857, #10b981)";
  const textGradient = "linear-gradient(to right, #059669, #10b981)";
  const hoverTextGradient = "linear-gradient(to right, #047857, #10b981)";
  const underlineGradient = "linear-gradient(to right, #059669, #10b981)";

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
                  "transition-all duration-300 transform -translate-y-3 translate-x-2",
                  isScrolled 
                    ? "w-16 h-14 sm:w-18 sm:h-16 md:w-20 md:h-18" 
                    : "w-20 h-18 sm:w-22 sm:h-20 md:w-24 md:h-22"
                )}
              />
              <span 
                className={cn(
                  "font-bold ml-2 tracking-wider transition-all duration-300 bg-clip-text text-transparent",
                  isScrolled
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-xl sm:text-2xl md:text-3xl"
                )}
                style={{ 
                  backgroundImage: logoGradient,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
               {t("logo.title")}
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
                    "relative font-medium text-sm lg:text-base transition-all duration-300 py-2 group",
                    isActive 
                      ? "font-semibold" 
                      : "hover:font-medium"
                  )
                }
                style={({ isActive }) => ({
                  backgroundImage: isActive ? textGradient : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  WebkitTextFillColor: isActive ? "transparent" : "inherit"
                })}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes(route.path)) {
                    e.currentTarget.style.backgroundImage = hoverTextGradient;
                    e.currentTarget.style.webkitBackgroundClip = "text";
                    e.currentTarget.style.webkitTextFillColor = "transparent";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes(route.path)) {
                    e.currentTarget.style.backgroundImage = "none";
                    e.currentTarget.style.webkitBackgroundClip = "none";
                    e.currentTarget.style.webkitTextFillColor = "inherit";
                  }
                }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {route.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-500",
                    location.pathname === route.path 
                      ? "scale-x-100 opacity-100" 
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  )}
                  style={{ 
                    background: underlineGradient,
                    transformOrigin: "left",
                    boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                  }}
                />
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <LanguageSelector />
            <Button
              asChild
              size="sm"
              className="hover-scale hover:shadow-md font-medium px-3 lg:px-6 lg:text-base lg:size-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
              style={{ 
                transition: "all 0.3s ease",
                boxShadow: "0 4px 14px rgba(5, 150, 105, 0.25)"
              }}
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
          <div className="md:hidden fixed top-[60px] sm:top-[70px] inset-x-0 bg-background border-t border-border/30 shadow-md transition-all duration-300 overflow-y-auto max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-70px)]">
            <nav className="flex flex-col py-4 sm:py-6 px-3 sm:px-4">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "py-3 sm:py-4 px-3 sm:px-4 font-medium text-base sm:text-lg transition-all duration-300 relative group",
                      isActive
                        ? "font-semibold"
                        : "hover:font-medium"
                    )
                  }
                  style={({ isActive }) => ({
                    backgroundImage: isActive ? textGradient : "none",
                    WebkitBackgroundClip: isActive ? "text" : "none",
                    WebkitTextFillColor: isActive ? "transparent" : "inherit"
                  })}
                  onMouseEnter={(e) => {
                    if (!location.pathname.includes(route.path)) {
                      e.currentTarget.style.backgroundImage = hoverTextGradient;
                      e.currentTarget.style.webkitBackgroundClip = "text";
                      e.currentTarget.style.webkitTextFillColor = "transparent";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!location.pathname.includes(route.path)) {
                      e.currentTarget.style.backgroundImage = "none";
                      e.currentTarget.style.webkitBackgroundClip = "none";
                      e.currentTarget.style.webkitTextFillColor = "inherit";
                    }
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {route.label}
                  <span 
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-500",
                      location.pathname === route.path 
                        ? "scale-x-100 opacity-100" 
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    )}
                    style={{ 
                      background: underlineGradient,
                      transformOrigin: "left",
                      boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                    }}
                  />
                </NavLink>
              ))}
              <div className="pt-3 sm:pt-4 pb-2 px-2 sm:px-4">
                <Button 
                  className="w-full py-4 sm:py-6 text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-lg" 
                  style={{ 
                    boxShadow: "0 4px 14px rgba(5, 150, 105, 0.25)",
                    transition: "all 0.3s ease"
                  }}
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