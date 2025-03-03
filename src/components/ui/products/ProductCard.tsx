
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useI18n } from "@/utils/i18n";

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  details: string[];
  className?: string;
}

export function ProductCard({ title, image, description, details, className }: ProductCardProps) {
  const { language } = useI18n();

  return (
    <div className={cn(
      "bg-background rounded-xl overflow-hidden border border-border/40 shadow-lg hover:shadow-md transition-all duration-300",
      className
    )}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        
        <Button  className="w-full hover:scale-105 ">
          <NavLink to="/inquiry">
            {language === "ar" ? "طلب عرض سعر" : language === "fr" ? "Demander un devis" : "Request Quote"}
          </NavLink>
        </Button>
      </div>
    </div>
  );
}
