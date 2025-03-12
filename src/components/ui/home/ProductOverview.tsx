import React, { useMemo, memo } from "react";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Memoized product card component to prevent unnecessary re-renders
interface Product {
  title: string;
  image: string;
  description: string;
  link: string;
}

interface ProductCardProps {
  product: Product;
  language: string;
}

const ProductCard = memo(({ product, language }: ProductCardProps) => {
  return (
    <NavLink
      to={product.link}  
      className="group rounded-xl overflow-hidden bg-background border border-emerald-600/20 shadow-sm transition-all duration-300 hover:shadow-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:ring-offset-2"
      onClick={() => window.scrollTo(0, 0)}
      aria-label={`View details for ${product.title}`} // Added for accessibility
    >
      <div className="aspect-[4/3] overflow-hidden relative rounded-t-xl">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy" // Use native lazy loading
          className="w-full h-full object-cover"
          decoding="async" // Improve image loading performance
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
      </div>
      <div className="p-6 rounded-b-xl">
        <h3 
          className="text-xl font-display font-semibold mb-2 bg-clip-text text-transparent" 
          style={{ 
            backgroundImage: "linear-gradient(to right, #059669, #10b981)"
          }}
        >
          {product.title}
        </h3>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div 
          className="flex items-center font-medium transition-colors bg-clip-text text-transparent group-hover:text-emerald-600"
          style={{ 
            backgroundImage: "linear-gradient(to right, #059669, #10b981)"
          }}
        >
          <span>{language === "ar" ? "عرض التفاصيل" : "View Details"}</span>
          <ArrowRight className={cn("w-4 h-4 ml-1", language === "ar" ? "rotate-180" : "")} />
        </div>
      </div>
    </NavLink>
  );
});

// Add display name for debugging
ProductCard.displayName = "ProductCard";

function ProductOverviewComponent() {
  const { t, language } = useI18n();
  
  // Memoize products array to prevent recreation on each render
  const products = useMemo(() => [
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
  ], [t, language]); // Recreate when `t` or `language` changes

  // Memoize direction class
  const directionClass = useMemo(() => 
    language === "ar" ? "rtl" : "ltr", 
  [language]);

  return (
    <section className="section-padding bg-emerald-50/30">
      <div className={cn("page-container", directionClass)}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 
            className="text-3xl font-display font-bold mb-4 bg-clip-text text-transparent" 
            style={{ 
              backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
            }}
          >
            {t("products.title")}
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ background:  "linear-gradient(to right, #059669, #10b981)" }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <ProductCard product={product} language={language} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild 
            size="lg" 
            className="group h-14 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
          >
            <NavLink 
              to="/products" 
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-3 text-lg font-semibold text-white"
              aria-label="View all products" // Added for accessibility
            >
              {t("products.viewAll")}
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ProductOverview = memo(ProductOverviewComponent);