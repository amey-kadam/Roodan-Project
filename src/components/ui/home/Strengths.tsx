
import { useI18n } from "@/utils/i18n";
import { CheckCircle, Shield, HandshakeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Using a custom icon for Flexible since it's not in the standard Lucide set
const FlexibleIcon = () => (
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
);

export function Strengths() {
  const { t, language } = useI18n();
  
  const strengths = [
    {
      title: t("strengths.quality.title"),
      description: t("strengths.quality.desc"),
      icon: CheckCircle,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: t("strengths.reliability.title"),
      description: t("strengths.reliability.desc"),
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: t("strengths.partnership.title"),
      description: t("strengths.partnership.desc"),
      icon: HandshakeIcon,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: t("strengths.flexibility.title"),
      description: t("strengths.flexibility.desc"),
      icon: FlexibleIcon,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">{t("strengths.title")}</h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", strength.color)}>
                <strength.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{strength.title}</h3>
              <p className="text-muted-foreground">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
