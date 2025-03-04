
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, language } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ 
          backgroundImage: 'url("/world-map.jpg")',
          backgroundPosition: '50% 40%'
        }}>
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className={cn(
        "page-container relative z-10 py-20 flex flex-col items-center text-center",
        language === "ar" ? "rtl" : "ltr"
      )}>
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
            <span className="text-sm font-medium text-primary">{language === "ar" ? "حلول تجارية عالمية" : "Global Trading Solutions"}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance">
            {t("hero.title")}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" asChild className="animate-slide-up hover-scale">
              <NavLink to="/products">
                {t("hero.cta")}
              </NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild className="animate-slide-up hover-scale delay-75">
              <NavLink to="/contact">
                {t("nav.contact")}
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom fading gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
