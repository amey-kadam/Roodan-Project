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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Enhanced Background */}
        <motion.section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Gradient and Effects */}
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

          {/* Content */}
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
          <motion.div variants={sectionVariants} className="space-y-8">
            <div className="flex items-center gap-4">
              <motion.div variants={iconVariants}>
                <Target className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold">
                {t("about.mission.title")}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.mission.desc")}
            </p>
            
            <div className="flex items-center gap-4">
              <motion.div variants={iconVariants}>
                <Award className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold">
                {t("about.values.title")}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.values.desc")}
            </p>
          </motion.div>
          
          <motion.div 
            variants={sectionVariants} 
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format"
              alt="Professional team"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="page-container py-24 bg-secondary/10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={sectionVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div variants={iconVariants}>
                <Users className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-4xl font-display font-bold">
                {t("about.team.title") || "Our Team"}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.team.desc") || "Meet our dedicated team of experts committed to exceptional service."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Smith", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format" },
              { name: "Sarah Johnson", role: "Chief Operations Officer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format" },
              { name: "Michael Chen", role: "Chief Financial Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format" },
              { name: "Emma Rodriguez", role: "Global Trade Director", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format" }
            ].map((member, index) => (
              <motion.div 
                key={member.name} 
                variants={sectionVariants}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

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
                Why Choose Us?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Premium quality products sourced from trusted suppliers worldwide",
                "Flexible delivery terms to meet your specific requirements",
                "Competitive pricing and transparent business practices",
                "Responsive customer service and dedicated support",
                "Years of experience in international trade with a global network"
              ].map((reason, index) => (
                <motion.div 
                  key={index} 
                  variants={sectionVariants}
                  className="bg-white border border-border/20 rounded-2xl p-6 shadow-sm hover:shadow-primary/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{reason}</p>
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