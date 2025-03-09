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
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:john.smith@example.com"
        }
      },
      {
        name: "Sarah Johnson",
        role: "COO",
        description: "Operational excellence expert.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:sarah.johnson@example.com"
        }
      },
      {
        name: "Michael Chen",
        role: "CFO",
        description: "Financial strategy mastermind.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:michael.chen@example.com"
        }
      },
      {
        name: "Emma Rodriguez",
        role: "Global Trade Director",
        description: "International markets connector.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:emma.rodriguez@example.com"
        }
      },
      {
        name: "David Kim",
        role: "Innovation Lead",
        description: "Technology transformation driver.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:david.kim@example.com"
        }
      }
    ];
  
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative h-[420px] [perspective:1000px]"
            >
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Card */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-900/20 mix-blend-multiply z-10" />
                  <div className="absolute inset-0 backdrop-blur-[1px] z-0" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  
                  {/* Glass Nameplate */}
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/10 border-t border-white/20 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-emerald-300 font-medium">{member.role}</p>
                      <span className="text-white/80 text-sm flex items-center gap-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Flip
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 opacity-70 blur-[20px] z-10" />
                  <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-300/30 to-emerald-500/30 opacity-50 blur-[30px] z-10" />
                </div>
                
                {/* Back Card */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-700 p-8 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-emerald-600/30">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />
                  
                  <div className="mb-6 relative">
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-emerald-300 font-medium">{member.role}</p>
                  </div>
                  
                  <p className="text-white/90 mb-8 relative">
                    {member.description}
                  </p>
                  
                  {/* Social Links - IMPROVED VERSION WITH BETTER EVENT HANDLING */}
                  <div className="flex gap-4 mt-auto relative z-[100]">
                    {/* LinkedIn */}
                    <div 
                      className="w-10 h-10 relative" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={member.socialLinks.linkedin}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(member.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
                        }}
                        className="absolute inset-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    
                    {/* Twitter */}
                    <div 
                      className="w-10 h-10 relative" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={member.socialLinks.twitter}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(member.socialLinks.twitter, '_blank', 'noopener,noreferrer');
                        }}
                        className="absolute inset-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                    
                    {/* Email */}
                    <div 
                      className="w-10 h-10 relative" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={member.socialLinks.email}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = member.socialLinks.email;
                        }}
                        className="absolute inset-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-emerald-800 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        aria-label="Email"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
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