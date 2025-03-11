import React, { useCallback, useMemo } from "react";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate } from "framer-motion"; // Combined imports
import { ArrowRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function HeroComponent() {
  const { t, language } = useI18n();
  const [scope, animate] = useAnimate();

  // Memoize animation variants
  const floatingVariants = useMemo(
    () => ({
      initial: { y: -20 },
      animate: {
        y: [0, -20, 0],
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  // Memoize callback function for animation
  const handleViewportEnter = useCallback(() => {
    animate(
      ".hero-element",
      { opacity: 1, y: 0 },
      { delay: stagger(0.2), duration: 0.8 }
    );
  }, [animate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Improved world map background with better responsiveness */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="w-full h-full relative">
          <LazyLoadImage
            src="/world-map.jpg"
            effect="blur"
            className="object-cover object-center w-full h-full"
            wrapperClassName="absolute inset-0"
            alt="World Map Background"
            placeholderSrc="/world-map-placeholder.jpg" /* Optional lower resolution placeholder */
          />
          {/* Mobile-specific overlay to ensure visibility */}
          <div className="absolute inset-0 bg-background/20 md:bg-transparent"></div>
        </div>
      </div>

      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Full Height Gradient Background - Using emerald colors from Products.tsx */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 opacity-100 md:opacity-90" />

        {/* Layered Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />

        {/* Animated Floating Shapes - Using emerald colors */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-500/5 rounded-full blur-3xl -top-32 -left-32 md:-top-64 md:-left-64"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{
            willChange: "transform",
            translateZ: 0, // Force GPU acceleration
          }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-emerald-600/5 rounded-full blur-3xl -bottom-32 -right-32 md:-bottom-64 md:-right-64"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          style={{
            willChange: "transform",
            translateZ: 0, // Force GPU acceleration
          }}
        />

        {/* Extended Geometric Overlay - Using emerald colors */}
        <div className="absolute inset-0 opacity-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            className="absolute bottom-0 w-full h-full text-emerald-500"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              fillOpacity="0.1"
              d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,181.3C672,149,768,107,864,106.7C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900L192,900L96,900L0,900Z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Content */}
      <div
        className={cn(
          "page-container relative z-10 py-16 md:py-32 flex flex-col items-center text-center",
          language === "ar" ? "rtl" : "ltr"
        )}
        ref={scope}
      >
        <motion.div
          className="max-w-4xl mx-auto space-y-4 md:space-y-8 px-4 md:px-0"
          initial="initial"
          animate="animate"
          onViewportEnter={handleViewportEnter}
        >
          {/* Badge */}
          <motion.div></motion.div>

          <div className="mb-12 md:mb-24">
            {" "}
            {/* Adjusted margin for mobile */}
            <motion.h1
              className="hero-element opacity-0 translate-y-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-clip-text text-transparent pb-4 md:pb-6 leading-tight md:leading-normal"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #059669, #10b981)", // Using emerald gradient from Products.tsx
              }}
            >
              {t("hero.title")}
            </motion.h1>
          </div>

          <motion.p
            className="hero-element opacity-0 translate-y-12 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mt-2 md:mt-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, #047857, #10b981)", // Using emerald gradient from Products.tsx
            }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Buttons - Using emerald colors from Products.tsx */}
          <motion.div className="hero-element opacity-0 translate-y-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-5 pt-6 md:pt-8">
            <Button
              size="lg"
              asChild
              className="group h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
            >
              <NavLink
                to="/products"
                className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold text-white"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl border-2 border-emerald-600 hover:border-emerald-700 bg-background/50 hover:bg-emerald-50/20 transition-all shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto"
            >
              <NavLink
                to="/contact"
                className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold text-emerald-700 hover:text-emerald-800"
              >
                {t("nav.contact")}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 text-emerald-600" />
              </NavLink>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-6 h-10 md:w-8 md:h-12 rounded-3xl border-2 border-emerald-200 flex justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-b from-emerald-600 to-emerald-500"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              willChange: "transform",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const Hero = React.memo(HeroComponent);