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
      className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
      onClick={() => window.scrollTo(0, 0)}
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm">{product.description}</p>
        <div className="flex items-center mt-auto">
          <span className="text-emerald-700 font-medium group-hover:text-emerald-800 transition-colors">
            {language === "ar" ? "عرض التفاصيل" : "View Details"}
          </span>
          <ArrowRight className={cn("w-4 h-4 ml-1 text-emerald-700 group-hover:text-emerald-800 transition-transform group-hover:translate-x-1", language === "ar" ? "rotate-180" : "")} />
        </div>
      </div>
    </NavLink>
  );
});

// Add display name for debugging
ProductCard.displayName = "ProductCard";

function ProductOverviewComponent() {
  const { t, language } = useI18n();
  
  // Define gradients to match Strengths.tsx
  const titleGradient = "linear-gradient(to right, #059669, #10b981)";
  const accentGradient = "linear-gradient(to right, #059669, #10b981)";
  
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
  ], [t, language]);

  // Memoize direction class
  const directionClass = useMemo(() => 
    language === "ar" ? "rtl" : "ltr", 
  [language]);

  return (
    <section className="section-padding bg-primary/5">
      <div className={cn("page-container", directionClass)}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent" 
            style={{ 
              backgroundImage: titleGradient
            }}
          >
            {t("products.title")}
          </h2>
          <div 
            className="w-20 h-1 mx-auto" 
            style={{ 
              background: accentGradient
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} language={language} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild 
            size="lg" 
            className="group h-14 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
          >
            <NavLink 
              to="/products" 
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-3 text-lg font-semibold text-white"
              aria-label="View all products"
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