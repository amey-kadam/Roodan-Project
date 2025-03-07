import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Target, Award, Users } from "lucide-react";

const About = () => {
  const { t, language } = useI18n();

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };

  const TeamScrollComponent = () => {
    const cardData = [
      {
        title: "John Smith",
        role: "CEO & Founder",
        description: "Visionary leader with strategic insights.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format"
      },
      {
        title: "Sarah Johnson",
        role: "COO",
        description: "Operational excellence expert.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format"
      },
      {
        title: "Michael Chen",
        role: "CFO",
        description: "Financial strategy mastermind.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format"
      },
      {
        title: "Emma Rodriguez",
        role: "Global Trade Director",
        description: "International markets connector.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format"
      },
      {
        title: "David Kim",
        role: "Innovation Lead",
        description: "Technology transformation driver.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format"
      }
    ];

    return (
      <div className="flex h-[100vh] overflow-hidden">
        {/* Left Side - Stable Text */}
        <div className="w-1/2 bg-secondary/10 flex items-center justify-center p-8 sticky top-0">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Our Leadership Team
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Meet the visionary leaders behind our global success.
            </p>
          </div>
        </div>

        {/* Right Side - Stacking Cards */}
        <div className="w-1/2 overflow-hidden relative">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="relative min-h-[calc(100vh*1.5)] py-24 perspective-1000">
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  className="sticky top-24 h-[70vh] mb-4 transform preserve-3d"
                  style={{ zIndex: index + 1 }}
                  initial={{ 
                    opacity: 0,
                    y: 50,
                    rotate: index % 2 === 0 ? -5 : 5
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: index % 2 === 0 ? -3 : 3,
                    transition: {
                      type: "spring",
                      stiffness: 60,
                      damping: 15,
                      mass: 0.8,
                      delay: index * 0.05
                    }
                  }}
                  viewport={{ 
                    margin: "0px 0px -20% 0px",
                    once: true,
                    amount: 0.5
                  }}
                >
                  <div className="h-full w-full px-4">
                    <div className="bg-white border border-border/20 rounded-none overflow-hidden shadow-xl w-full mx-auto h-full transform origin-top transition-transform duration-300 hover:scale-[1.02]">
                      <div className="relative aspect-[3/2]">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-bold">{card.title}</h3>
                          <p className="text-xs text-white/80">{card.role}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 opacity-100" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
            <motion.div
              className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-64 -left-64"
              animate={{
                y: [0, -20, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            />
          </div>

          <motion.div 
            className={cn(
              "page-container relative z-10 text-center",
              language === "ar" ? "rtl" : "ltr"
            )}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={sectionVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {t("about.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-6">
                {t("about.subtitle")}
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Mission & Values Section */}
        <motion.section 
          className="page-container py-24 grid md:grid-cols-2 gap-16 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Mission & Values content */}
        </motion.section>

        {/* Team Section */}
        <div className="h-screen overflow-hidden snap-center">
          <motion.section 
            className="py-24 h-full"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="page-container h-full">
              <motion.div variants={sectionVariants} className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div variants={iconVariants}>
                    <Users className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h2 className="text-4xl font-display font-bold">
                    {t("about.team.title")}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("about.team.desc")}
                </p>
              </motion.div>
              <TeamScrollComponent />
            </div>
          </motion.section>
        </div>

        {/* Why Choose Us Section */}
       
        <motion.section 
          className="page-container py-24 bg-secondary/5"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={sectionVariants} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <motion.div variants={iconVariants}>
                <Globe className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-4xl font-display font-bold text-center">
               {t("about.whyChooseUs.title")}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[  
                  "about.whyChooseUs.reason1",
                  "about.whyChooseUs.reason2",
                  "about.whyChooseUs.reason3",
                  "about.whyChooseUs.reason4",
                  "about.whyChooseUs.reason5",
                ].map((reason, index) => (
                <motion.div 
                  key={index} 
                  variants={sectionVariants}
                  className="bg-white border border-border/20 rounded-2xl p-6 shadow-sm hover:shadow-primary/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{t(reason)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default About;