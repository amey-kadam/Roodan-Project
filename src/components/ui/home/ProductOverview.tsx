import React, { useMemo, memo, useState, useEffect, useRef } from "react";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Add loading state interface
interface Product {
  title: string;
  image: string;
  description: string;
  link: string;
  details: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
  language: string;
  t: (key: string) => string;
  onIntersect?: () => void;
  onClick: () => void;
}

// Add ProductModal interface
interface ProductModalProps {
  product: Product;
  onClose: () => void;
  t: (key: string) => string;
  language: string;
}

// Add back the useIntersectionObserver hook
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

// Add ProductModal component
const ProductModal = memo(({ product, onClose, t, language }: ProductModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Reset image loaded state when product or language changes
  useEffect(() => {
    setImageLoaded(false);
  }, [product.title, language]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden h-[90vh] md:h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
          aria-label="Close modal"
        >
          <XCircle className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Image section */}
          <div 
            className="relative h-[40vh] md:h-full bg-emerald-50/30"
          >
            <img
              src={product.image}
              alt={product.title}
              className={cn(
                "w-full h-full object-cover",
                !imageLoaded && "blur-sm opacity-0",
                imageLoaded && "blur-0 opacity-100 transition-all duration-500"
              )}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content section */}
          <div 
            className="p-4 md:p-8 flex flex-col overflow-y-auto"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 line-clamp-2"
            >
              {product.title}
            </h2>
            
            <p 
              className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 line-clamp-4"
            >
              {product.description}
            </p>
            
            <div 
              className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow"
            >
              {product.details.map((detail, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-700 line-clamp-2">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Button
                onClick={() => window.location.href = '/inquiry'}
                className={cn(
                  "w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white",
                  "hover:from-emerald-700 hover:to-emerald-600 rounded-lg",
                  "transition-all duration-300 group relative overflow-hidden",
                  "shadow-md hover:shadow-lg transform-gpu py-3 md:py-4 text-base md:text-lg"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('products.requestQuote')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 transform-gpu"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

const ProductCard = memo(({ product, language, t, onClick }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(cardRef, () => {
    setIsVisible(true);
  });

  useEffect(() => {
    setImageLoaded(false);
  }, [product.title, language]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group bg-white rounded-3xl overflow-hidden cursor-pointer",
        "transition-all duration-500 border-gray-100 h-full flex flex-col",
        "transform-gpu hover:translate-y-[-8px]",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        !isVisible && "opacity-0",
        isVisible && "animate-fadeIn"
      )}
      style={{
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          : '0 8px 30px rgba(0, 0, 0, 0.12)',
        transform: `perspective(1000px) 
          rotateX(${isHovered ? '1deg' : '0deg'}) 
          rotateY(${isHovered ? '1deg' : '0deg'}) 
          translateZ(${isHovered ? '20px' : '0px'})`,
        transformStyle: 'preserve-3d'
      }}
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
                "group-hover:scale-105 transition-all duration-700 ease-out",
                !imageLoaded && "blur-sm opacity-0",
                imageLoaded && "blur-0 opacity-100"
              )}
              loading="lazy"
              decoding="async"
            />
          )}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              "pointer-events-none"
            )}
          />
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 
          className={cn(
            "text-xl font-bold text-gray-800 mb-2",
            "group-hover:text-emerald-700 transition-colors duration-300",
            "transform-gpu group-hover:translate-y-[-2px]"
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
              "group-hover:translate-x-2",
              language === "ar" ? "rotate-180" : ""
            )} 
          />
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

function ProductOverviewComponent() {
  const { t, language } = useI18n();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
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
      details: [
        t("product.sugar.detail1"),
        t("product.sugar.detail2"),
        t("product.sugar.detail3"),
      ],
      category: "food"
    },
    {
      title: t("products.soy"),
      image: "/soya.jpg",
      description: t("products.soyDesc"),
      link: "/products",
      details: [
        t("product.soy.detail1"),
        t("product.soy.detail2"),
        t("product.soy.detail3"),
      ],
      category: "food"
    },
    {
      title: t("products.coffee"),
      image: "/coffee.jpg",
      description: t("products.coffeeDesc"),
      link: "/products",
      details: [
        t("product.coffee.detail1"),
        t("product.coffee.detail2"),
        t("product.coffee.detail3"),
      ],
      category: "food"
    },
    {
      title: t("products.meat"),
      image: "/meat.jpg",
      description: t("products.meatDesc"),
      link: "/products",
      details: [
        t("product.beef.detail1"),
        t("product.beef.detail2"),
        t("product.beef.detail3"),
      ],
      category: "food"
    },
    {
      title: t("products.oil"),
      image: "/oil.jpeg",
      description: t("products.oilDesc"),
      link: "/products",
      details: [
        t("product.vegetable.detail1"),
        t("product.vegetable.detail2"),
        t("product.vegetable.detail3"),
      ],
      category: "oils"
    },
    {
      title: t("products.rice"),
      image: "/Rice.jpg",
      description: t("products.riceDesc"),
      link: "/products",
      details: [
        t("product.rice.detail1"),
        t("product.rice.detail2"),
        t("product.rice.detail3"),
      ],
      category: "food"
    },
    {
      title: t("products.petroleum"),
      image: "/petrol.jpg",
      description: t("products.petroleumDesc"),
      link: "/products",
      details: [
        t("product.petroleum.detail1"),
        t("product.petroleum.detail2"),
        t("product.petroleum.detail3"),
      ],
      category: "petro"
    },
  ], [t, language]);

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

        {/* Modern container with clean scrolling */}
        <div className="relative">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 scrollbar-hide gradient-mask md:gradient-mask-none"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {products.map((product) => (
              <div 
                key={`${product.title}-${language}`}
                className="flex-none w-[85vw] md:w-auto snap-center"
              >
                <ProductCard 
                  product={product} 
                  language={language} 
                  t={t}
                  onClick={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
          
          {/* Swipe indicator - only visible on mobile */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 md:hidden">
            <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <ArrowRight className="w-4 h-4 text-emerald-500 animate-swipe-right" />
          </div>
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

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            t={t}
            language={language}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Export memoized component
export const ProductOverview = memo(ProductOverviewComponent, (prevProps, nextProps) => {
  // Always re-render the component when it receives new props
  return false;
});