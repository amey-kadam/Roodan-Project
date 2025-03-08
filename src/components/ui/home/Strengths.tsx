import React, { useMemo } from "react";
import { useI18n } from "@/utils/i18n";
import { CheckCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Using a custom icon for Flexible since it's not in the standard Lucide set
const FlexibleIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M14.5 9a2.5 2.5 0 0 0-5 0v6a2.5 2.5 0 0 0 5 0" />
  </svg>
));

// Handshake icon (renamed and simplified)
const Handshake = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36 8.87 8.5a2.13 2.13 0 0 0 0 3h0a2.13 2.13 0 0 0 3 0l2.26-2.21a2.13 2.13 0 0 1 3 0l2.24 2.2a2.13 2.13 0 0 0 3 0h0a2.13 2.13 0 0 0 0-3L18.37 5.36a4.25 4.25 0 0 0-6 0h-.02a4.25 4.25 0 0 0-6 0z" />
  </svg>
));

FlexibleIcon.displayName = 'FlexibleIcon';
Handshake.displayName = 'Handshake';

// Pre-defined animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5 
    }
  }
};

export function Strengths() {
  const { t, language } = useI18n();
  
  // Memoize the strengths array to prevent recreation on every render
  const strengths = useMemo(() => [
    {
      title: t("strengths.quality.title"),
      description: t("strengths.quality.desc"),
      icon: CheckCircle,
      color: "bg-emerald-50/80 text-emerald-700",
    },
    {
      title: t("strengths.reliability.title"),
      description: t("strengths.reliability.desc"),
      icon: Shield,
      color: "bg-emerald-50/80 text-emerald-700",
    },
    {
      title: t("strengths.partnership.title"),
      description: t("strengths.partnership.desc"),
      icon: Handshake,
      color: "bg-emerald-50/80 text-emerald-700",
    },
    {
      title: t("strengths.flexibility.title"),
      description: t("strengths.flexibility.desc"),
      icon: FlexibleIcon,
      color: "bg-emerald-50/80 text-emerald-700",
    },
  ], [t]);

  // Memoize direction class
  const directionClass = useMemo(() => 
    language === "ar" ? "rtl" : "ltr", 
  [language]);

  return (
    <section className="section-padding bg-primary/5">
      <div className={cn("page-container", directionClass)}>
        <motion.div 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <h2 
            className="text-3xl font-display font-bold mb-4 bg-clip-text text-transparent" 
            style={{ 
              backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
            }}
          >
            {t("strengths.title")}
          </h2>
          <div 
            className="w-20 h-1 mx-auto" 
            style={{ 
              background: "linear-gradient(to right, #004d00, #00b300)" 
            }}
          ></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {strengths.map((strength, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-background rounded-xl p-6 border border-emerald-600/20 shadow-sm hover:shadow-emerald-600/30 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", strength.color)}>
                <strength.icon className="w-6 h-6" />
              </div>
              <h3 
                className="text-xl font-display font-semibold mb-2 bg-clip-text text-transparent" 
                style={{ 
                  backgroundImage: "linear-gradient(to right, #004d00, #00b300)" 
                }}
              >
                {strength.title}
              </h3>
              <p className="text-muted-foreground">{strength.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}