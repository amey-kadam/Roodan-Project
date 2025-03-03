
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductOverview() {
  const { t, language } = useI18n();
  
  const products = [
    {
      title: t("products.sugar"),
      image: "/sugar.jpg",
      description: "ICUMSA 45, ICUMSA 100, ICUMSA 150",
      link: "/products",
    },
    {
      title: t("products.coffee"),
      image: "/coffee.jpg",
      description: "Robusta & Arabica",
      link: "/products",
    },
    {
      title: t("products.meat"),
      image: "/meat.jpg",
      description: "Beef, Chicken & Beef Ghee",
      link: "/products",
    },
    {
      title: t("products.oil"),
      image: "/oil.jpeg",
      description: "CP8, CP10 & Olive Oil",
      link: "/products",
    },
    {
      title: t("products.rice"),
      image: "/Rice.jpg",
      description: "Basmati, Jasmine & White Rice",
      link: "/products",
    },
    {
      title: t("products.petroleum"),
      image: "/petrol.jpg",
      description: "EN 590, D2, AGO, Jet A1",
      link: "/products",
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">{t("products.title")}</h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <NavLink
              key={index}
              to={product.link}
              className="group rounded-xl overflow-hidden bg-background border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center text-primary font-medium transition-colors group-hover:text-primary/90">
                  <span>{language === "ar" ? "عرض التفاصيل" : "View Details"}</span>
                  <ArrowRight className={cn("w-4 h-4 ml-1 transition-transform group-hover:translate-x-1", language === "ar" ? "rotate-180" : "")} />
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="hover-scale hover:bg-white hover:text-primary" >
            <NavLink to="/products">
              {t("products.viewAll")}
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
