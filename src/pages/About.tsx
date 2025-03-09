import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Target, Award, Users } from "lucide-react";

const About = () => {
  const { t, language } = useI18n();

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const TeamSection = () => {
    const teamMembers = [
      {
        name: "John Smith",
        role: "CEO & Founder",
        description: "Visionary leader with strategic insights.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format"
      },
      {
        name: "Sarah Johnson",
        role: "COO",
        description: "Operational excellence expert.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format"
      },
      {
        name: "Michael Chen",
        role: "CFO",
        description: "Financial strategy mastermind.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format"
      },
      {
        name: "Emma Rodriguez",
        role: "Global Trade Director",
        description: "International markets connector.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format"
      },
      {
        name: "David Kim",
        role: "Innovation Lead",
        description: "Technology transformation driver.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format"
      }
    ];

    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full border border-emerald-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 left-6 w-12 h-12 rounded-full border-4 border-white bg-emerald-600 flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mt-2">{member.name}</h3>
                  <p className="text-sm font-medium text-emerald-600 mb-3">{member.role}</p>
                  <p className="text-emerald-700/80">{member.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50">
      <Header />
      <main className="flex-grow">
        {/* Mission & Values Section */}
        <motion.section 
  className="page-container py-20 md:py-28"
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
>
  <motion.div variants={sectionVariants} className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col items-center justify-center gap-4 mb-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 300,
            delay: 0.2 
          }
        }}
      >
        <Target className="w-16 h-16 text-emerald-600" />
      </motion.div>
      <h2 
        className="text-4xl md:text-5xl font-display font-bold text-center bg-clip-text text-transparent mt-4"
        style={{ 
          backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
        }}
      >
        {t("about.mission.title")}
      </h2>
      <p 
        className="text-xl text-center max-w-3xl mx-auto mt-4 bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(to right, #006400, rgb(32, 110, 32))"
        }}
      >
        {t("about.mission.desc")}
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {[1, 2, 3, 4].map((value, index) => (
        <motion.div 
          key={`value-${index}`}
          variants={itemVariants}
          className="bg-white border border-emerald-600/20 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          whileHover={{ y: -5 }}
        >
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-emerald-700" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-3">
            {t(`about.values.value${value}.title`)}
          </h3>
          <p className="text-emerald-700/80 flex-grow">
            {t(`about.values.value${value}.desc`)}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</motion.section>

        {/* Team Section */}
        <motion.section 
          className="page-container py-20 bg-emerald-50/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={sectionVariants} className="text-center mb-16">
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                whileInView={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 200,
                    delay: 0.1 
                  }
                }}
                viewport={{ once: true }}
              >
                <Users className="w-14 h-14 text-emerald-600" />
              </motion.div>
              <h2 
                className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent mt-4"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
                }}
              >
                {t("about.team.title")}
              </h2>
            </div>
            <p 
              className="max-w-2xl mx-auto text-lg bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #006400, rgb(32, 110, 32))"
              }}
            >
              {t("about.team.desc")}
            </p>
          </motion.div>
          
          <TeamSection />
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section 
          className="page-container py-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={sectionVariants} className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 mb-16">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                whileInView={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotateY: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 200,
                    delay: 0.1 
                  }
                }}
                viewport={{ once: true }}
              >
                <Globe className="w-16 h-16 text-emerald-600" />
              </motion.div>
              <h2 
                className="text-4xl md:text-5xl font-display font-bold text-center bg-clip-text text-transparent mt-4"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
                }}
              >
               {t("about.whyChooseUs.title")}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full my-2"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[  
                "about.whyChooseUs.reason1",
                "about.whyChooseUs.reason2",
                "about.whyChooseUs.reason3",
                "about.whyChooseUs.reason4",
                "about.whyChooseUs.reason5",
              ].map((reason, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={cn(
                    "bg-white border border-emerald-600/20 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300",
                    index === 4 && "md:col-span-2 md:max-w-lg md:mx-auto"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800 mb-2">
                        {t(`about.whyChooseUs.title${index + 1}`)}
                      </h3>
                      <p className="text-emerald-700/80">{t(reason)}</p>
                    </div>
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