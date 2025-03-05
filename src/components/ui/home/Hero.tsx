import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate } from "framer-motion";
import { Globe, ArrowRight, Layers } from "lucide-react";

export function Hero() {
  const { t, language } = useI18n();
  const [scope, animate] = useAnimate();

  const floatingVariants = {
    initial: { y: -20 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* World Map Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60" 
        style={{ 
          backgroundImage: "url('/world-map.jpg')" 
        }}
      />

      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Full Height Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 opacity-100" />
        
        {/* Layered Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
        
        {/* Animated Floating Shapes */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-64 -left-64"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute w-[700px] h-[700px] bg-secondary/5 rounded-full blur-3xl -bottom-64 -right-64"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
        
        {/* Extended Geometric Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 900" 
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full text-primary"
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
          "page-container relative z-10 py-32 flex flex-col items-center text-center",
          language === "ar" ? "rtl" : "ltr"
        )}
        ref={scope}
      >
        {/* Rest of the component remains the same as in the previous version */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial="initial"
          animate="animate"
          onViewportEnter={() => {
            animate(
              ".hero-element",
              { opacity: 1, y: 0 },
              { delay: stagger(0.2), duration: 0.8 }
            );
          }}
        >
          {/* Badge */}
          <motion.div
            className="hero-element opacity-0 translate-y-12 inline-block px-5 py-3 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-lg mb-6 shadow-lg hover:shadow-primary/10 transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-base font-semibold text-primary flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <Layers className="w-5 h-5 opacity-50" />
              {language === "ar" 
                ? "حلول تجارية عالمية" 
                : "Global Trading Solutions"}
            </span>
          </motion.div>


          <motion.h1
  className="hero-element opacity-0 translate-y-12 text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent h-20 " 
>
  {t("hero.title")}
</motion.h1>

<motion.p
  className="hero-element opacity-0 translate-y-12 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed -mt-2" // Added -mt-2 to pull subtitle up
>
  {t("hero.subtitle")}
</motion.p>
          {/* Buttons */}
          <motion.div
            className="hero-element opacity-0 translate-y-12 flex flex-wrap justify-center gap-5 pt-8"
          >
            <Button
              size="lg"
              asChild
              className="group h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-primary/30"
            >
              <NavLink
                to="/products"
                className="flex items-center gap-3 text-lg font-semibold"
              >
                {t("hero.cta")}
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group h-14 px-8 rounded-2xl border-2 bg-background/50 hover:bg-background/80 hover:border-primary transition-all"
            >
              <NavLink
                to="/contact"
                className="flex items-center gap-3 text-lg font-semibold"
              >
                {t("nav.contact")}
                <ArrowRight className="w-6 h-6 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </NavLink>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-8 h-12 rounded-3xl border-2 border-border flex justify-center p-1">
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}