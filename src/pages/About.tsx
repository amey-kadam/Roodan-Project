
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";

const About = () => {
  const { t, language } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8659b8e77b1a?q=80&w=2532&auto=format")',
              backgroundPosition: '50% 30%'
            }}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t("about.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("about.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="section-padding bg-white">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">
                  {t("about.mission.title")}
                </h2>
                <div className="w-20 h-1 bg-primary/20"></div>
                <p className="text-muted-foreground">
                  {t("about.mission.desc")}
                </p>
                
                <h2 className="text-3xl font-display font-bold pt-6">
                  {t("about.values.title")}
                </h2>
                <div className="w-20 h-1 bg-primary/20"></div>
                <p className="text-muted-foreground">
                  {t("about.values.desc")}
                </p>
              </div>
              
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format"
                  alt="Professional team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <section className="section-padding bg-secondary/30">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 space-y-6">
                <h2 className="text-3xl font-display font-bold">
                  {t("about.experience.title")}
                </h2>
                <div className="w-20 h-1 bg-primary/20"></div>
                <p className="text-muted-foreground">
                  {t("about.experience.desc")}
                </p>
                <p className="text-muted-foreground">
                  Our global network of suppliers and commitment to excellence ensures that we can provide the highest quality products to meet your specific needs. We prioritize sustainable and ethical business practices in all our operations.
                </p>
                <p className="text-muted-foreground">
                  With a customer-focused approach and a dedication to building long-term relationships, we strive to be your trusted partner in international trade.
                </p>
              </div>
              
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1551184451-76b792a6e5f2?q=80&w=1974&auto=format"
                    alt="Handshake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=2070&auto=format"
                    alt="Global trade"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
