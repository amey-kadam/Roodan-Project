import React, { useMemo, memo, useState, useEffect, useRef } from "react";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Add loading state interface
interface Product {
  title: string;
  image: string;
  description: string;
  link: string;
}

interface ProductCardProps {
  product: Product;
  language: string;
  t: (key: string) => string;
  onIntersect?: () => void;
}

// Image sizes for responsive images
const imageSizes = {
  sm: '400w',
  md: '600w',
  lg: '800w'
};

const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  callback: () => void,
  options = { threshold: 0.1, triggerOnce: true }
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          if (options.triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { threshold: options.threshold }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options.threshold, options.triggerOnce]);
};

const ProductCard = memo(({ product, language, t }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(cardRef, () => {
    setIsVisible(true);
  });

  return (
    <NavLink
      ref={cardRef}
      to={product.link}  
      className={cn(
        "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg",
        "transition-shadow duration-300 border border-gray-100 h-full flex flex-col",
        "transform-gpu hover:translate-y-[-2px]",
        !isVisible && "opacity-0",
        isVisible && "animate-fadeIn"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden bg-emerald-50/30">
          {isVisible && (
            <img
              src={product.image}
              alt={product.title}
              width="600"
              height="338"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover transform-gpu will-change-transform",
                "group-hover:scale-105 transition-all duration-500 ease-out",
                !imageLoaded && "blur-sm opacity-0",
                imageLoaded && "blur-0 opacity-100"
              )}
              loading="lazy"
              decoding="async"
            />
          )}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "pointer-events-none"
            )}
          />
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 
          className={cn(
            "text-xl font-bold text-gray-800 mb-2",
            "group-hover:text-emerald-700 transition-colors duration-300"
          )}
        >
          {product.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center mt-auto">
          <span className="text-emerald-700 font-medium group-hover:text-emerald-800 transition-colors duration-300">
            {t("products.viewDetails")}
          </span>
          <ArrowRight 
            className={cn(
              "w-4 h-4 ml-1 text-emerald-700 group-hover:text-emerald-800",
              "transform-gpu transition-transform duration-300",
              "group-hover:translate-x-1",
              language === "ar" ? "rotate-180" : ""
            )} 
          />
        </div>
      </div>
    </NavLink>
  );
});

// Add display name for debugging
ProductCard.displayName = "ProductCard";

function ProductOverviewComponent() {
  const { t, language } = useI18n();
  
  // CSS variables for better performance
  const styles = {
    "--gradient-title": "linear-gradient(to right, #059669, #10b981)",
    "--gradient-accent": "linear-gradient(to right, #059669, #10b981)",
  } as React.CSSProperties;
  
  // Memoize products array
  const products = useMemo(() => [
    {
      title: t("products.sugar"),
      image: "/sugar.jpg",
      description: t("products.sugarDesc"),
      link: "/products",
    },
    {
      title: t("products.coffee"),
      image: "/coffee.jpg",
      description: t("products.coffeeDesc"),
      link: "/products",
    },
    {
      title: t("products.meat"),
      image: "/meat.jpg",
      description: t("products.meatDesc"),
      link: "/products",
    },
    {
      title: t("products.oil"),
      image: "/oil.jpeg",
      description: t("products.oilDesc"),
      link: "/products",
    },
    {
      title: t("products.rice"),
      image: "/Rice.jpg",
      description: t("products.riceDesc"),
      link: "/products",
    },
    {
      title: t("products.petroleum"),
      image: "/petrol.jpg",
      description: t("products.petroleumDesc"),
      link: "/products",
    },
  ], [t]);

  // Memoize direction class
  const directionClass = useMemo(() => 
    language === "ar" ? "rtl" : "ltr", 
  [language]);

  return (
    <section 
      className="section-padding bg-emerald-50/30"
      style={styles}
    >
      <div className={cn("page-container", directionClass)}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent" 
            style={{ backgroundImage: "var(--gradient-title)" }}
          >
            {t("products.title")}
          </h2>
          <div 
            className="w-20 h-1 mx-auto" 
            style={{ background: "var(--gradient-accent)" }}
          />
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ 
            containIntrinsicSize: '0 500px',
            contain: 'content',
            contentVisibility: 'auto'
          }}
        >
          {products.map((product) => (
            <ProductCard 
              key={product.title} 
              product={product} 
              language={language} 
              t={t} 
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild 
            size="lg" 
            className={cn(
              "group h-14 px-8 rounded-xl",
              "transition-all duration-300",
              "shadow-md hover:shadow-lg hover:shadow-emerald-500/20",
              "bg-gradient-to-r from-emerald-600 to-emerald-500",
              "hover:from-emerald-700 hover:to-emerald-600",
              "transform-gpu hover:translate-y-[-2px]"
            )}
          >
            <NavLink 
              to="/products" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-lg font-semibold text-white"
              aria-label="View all products"
            >
              {t("products.viewAll")}
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 transform-gpu" />
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Export memoized component
export const ProductOverview = memo(ProductOverviewComponent);