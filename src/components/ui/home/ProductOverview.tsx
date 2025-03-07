import React, { useMemo, memo } from "react";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
      className="group rounded-xl overflow-hidden bg-background border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="aspect-[4/3] overflow-hidden relative rounded-t-xl">
        <LazyLoadImage
          src={product.image}
          alt={product.title}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          wrapperClassName="w-full h-full"
          threshold={300}
          placeholderSrc="/placeholder-product.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
      </div>
      <div className="p-6 rounded-b-xl">
        <h3 className="text-xl font-display font-semibold mb-2">{product.title}</h3>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex items-center text-primary font-medium transition-colors group-hover:text-primary/90">
          <span>{language === "ar" ? "عرض التفاصيل" : "View Details"}</span>
          <ArrowRight className={cn("w-4 h-4 ml-1 transition-transform group-hover:translate-x-1", language === "ar" ? "rotate-180" : "")} />
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
  ], [t]); // Only recreate when translations change

  // Memoize animation variants to prevent recreation on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }), []);

  return (
    <section className="section-padding bg-secondary/30">
      <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-display font-bold mb-4">{t("products.title")}</h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Optimize viewport detection
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ willChange: 'transform, opacity' }} // Optimize for GPU acceleration
            >
              <ProductCard product={product} language={language} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="hover-scale hover:bg-white hover:text-primary">
            <NavLink to="/products" onClick={() => window.scrollTo(0, 0)}>
              {t("products.viewAll")}
            </NavLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ProductOverview = memo(ProductOverviewComponent);