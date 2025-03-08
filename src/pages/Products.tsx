import { useState } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Grid, Filter, ShoppingBag, Package, Leaf, Droplet, Fuel } from "lucide-react";
// Product category type
type ProductCategory = "all" | "food" | "oils" | "agri" | "petro";

const Products = () => {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

  // Product data remains the same
  const products = [
    {
      id: 1,
      title: "Sugar ICUMSA",
      image: "/sugar.jpg",
      description: "Premium sugar with various ICUMSA grades from Brazil",
      details: [
        "ICUMSA 45 (white sugar), ICUMSA 100 (raw sugar), ICUMSA 150",
        "Packaging: 50 kg bags or big bags",
        "Delivery: CIF, FOB, etc.",
      ],
      category: "food",
    },
    {
      id: 2,
      title: "Soy Products",
      image: "/soya.jpg",
      description: "High-quality soy products for various applications",
      details: [
        "Soybeans (GMO-free on request), soy flour, soy oil",
        "Packaging: According to customer requirements",
        "Delivery: Worldwide, flexible",
      ],
      category: "agri",
    },
    {
      id: 3,
      title: "Coffee Beans",
      image: "/coffee.jpg",
      description: "Premium Robusta and Arabica coffee beans",
      details: [
        "Robusta (strong) and Arabica (mild)",
        "Origin: South America, Asia, Africa",
        "Packaging: 50 kg bags or big bags",
      ],
      category: "food",
    },
    {
      id: 4,
      title: "Beef Products",
      image: "/Beef.jpg",
      description: "Premium quality beef from India",
      details: [
        "Frozen beef, various cuts",
        "Packaging: Frozen goods",
        "Delivery: Worldwide",
      ],
      category: "food",
    },
    {
      id: 5,
      title: "Chicken Meat",
      image: "/chicken.jpg",
      description: "Various chicken products of the highest quality",
      details: [
        "Whole chickens, chicken breasts, chicken legs, chicken wings",
        "Packaging: Frozen goods",
        "Delivery: Worldwide",
      ],
      category: "food",
    },
    {
      id: 6,
      title: "Beef Ghee",
      image: "/Ghee.jpg",
      description: "Pure beef ghee from India",
      details: [
        "100% pure beef ghee",
        "Packaging: 1 kg cans, 15 kg buckets",
        "Delivery: Worldwide",
      ],
      category: "oils",
    },
    {
      id: 7,
      title: "Vegetable Oils",
      image: "/oil.jpeg",
      description: "High-quality vegetable oils CP8 and CP10 from Asia",
      details: [
        "Palm oil, various packaging sizes",
        "Delivery: CIF, FOB or by arrangement",
        "Premium quality for food and industrial applications",
      ],
      category: "oils",
    },
    {
      id: 8,
      title: "Rice Varieties",
      image: "/Rice.jpg",
      description: "Premium rice varieties from around the world",
      details: [
        "Basmati, jasmine, parboiled, white rice",
        "Packaging: 5 kg, 25 kg bags or big bags",
        "Delivery: CIF, FOB",
      ],
      category: "food",
    },
    {
      id: 9,
      title: "Olive Oil",
      image: "/olive-oil.jpg",
      description: "Premium olive oil from Greece",
      details: [
        "Extra virgin olive oil, virgin olive oil, refined olive oil",
        "Packaging: 1 l bottles, 5 l canisters, 200L drums",
        "Delivery: CIF, FOB",
      ],
      category: "oils",
    },
    {
      id: 10,
      title: "Urea & Fertilizers",
      image: "/Urea.png",
      description: "High-quality urea and fertilizers for agricultural use",
      details: [
        "Urea 46% Granular and Prilled",
        "Packaging: 50kg bags or big bags",
        "Delivery: Worldwide",
      ],
      category: "agri",
    },
    {
      id: 11,
      title: "Petroleum Products",
      image: "/petrol.jpg",
      description: "Premium petroleum products for various applications",
      details: [
        "EN 590, D2, AGO, Jet A1",
        "Diesel, Aviation Fuel, Automotive Fuel",
        "Delivery: CIF, FOB",
      ],
      category: "petro",
    },
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Category filter buttons with improved icons
  const categories = [
    { id: "all", label: t("products.categories.all"), icon: Grid },
    { id: "food", label: t("products.categories.food"), icon: ShoppingBag },
    { id: "oils", label: t("products.categories.oils"), icon: Droplet },
    { id: "agri", label: t("products.categories.agri"), icon: Leaf },
    { id: "petro", label: t("products.categories.petro"), icon: Fuel },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50/50">
      <Header />
      <main className="flex-grow">
        {/* Main Products Section */}
        <section className="pt-32 pb-8">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
                }}
              >
                {t("products.title")}
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full my-6 mx-auto"></div>
              <p 
                className="text-lg md:text-xl max-w-2xl mx-auto mt-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #006400, rgb(32, 110, 32))"
                }}
              >
                {t("products.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Categories Filter */}
        <section className="py-8">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-4xl mx-auto mb-4"
            >
              <div className="absolute inset-0 bg-emerald-100/50 rounded-2xl -m-3 blur-xl"></div>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center relative mb-8">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.1 + index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <Button
                        variant={activeCategory === category.id ? "default" : "outline"}
                        onClick={() => setActiveCategory(category.id as ProductCategory)}
                        className={cn(
                          "group transition-all duration-300 px-5 py-2 rounded-xl h-12 flex items-center justify-center",
                          activeCategory === category.id
                            ? "shadow-md"
                            : "hover:border-emerald-700 hover:bg-emerald-50/70"
                        )}
                        style={
                          activeCategory === category.id
                            ? { background: "linear-gradient(to right, #004d00, #00b300)" }
                            : {}
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Icon
                            className={cn(
                              "w-5 h-5 transition-colors",
                              activeCategory === category.id
                                ? "text-white"
                                : "text-emerald-700 group-hover:text-emerald-800"
                            )}
                          />
                          <span 
                            className={cn(
                              "font-medium",
                              activeCategory === category.id ? "text-white" : ""
                            )}
                          >
                            {category.label}
                          </span>
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 pb-24">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeCategory} // Force re-animation when category changes
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    variants={itemVariants} 
                    className="h-full"
                    transition={{
                      delay: index * 0.05
                    }}
                  >
                    <ProductCardWrapper
                      title={product.title}
                      image={product.image}
                      description={product.description}
                      details={product.details}
                      category={product.category}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-emerald-800 text-xl">
                    No products found in this category.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Enhanced wrapper for ProductCard with additional styling and animation
const ProductCardWrapper = ({ 
  title, 
  image, 
  description, 
  details,
  category 
}: { 
  title: string;
  image: string;
  description: string;
  details: string[];
  category: string;
}) => {
  // Get category label and icon
  const getCategoryInfo = (cat: string) => {
    switch(cat) {
      case 'food':
        return { label: 'Food', icon: ShoppingBag, color: 'bg-amber-100 text-amber-700' };
      case 'oils':
        return { label: 'Oils', icon: Droplet, color: 'bg-yellow-100 text-yellow-700' };
      case 'agri':
        return { label: 'Agriculture', icon: Leaf, color: 'bg-emerald-100 text-emerald-700' };
      case 'petro':
        return { label: 'Petroleum', icon: Fuel, color: 'bg-blue-100 text-blue-700' };
      default:
        return { label: 'Product', icon: Package, color: 'bg-gray-100 text-gray-700' };
    }
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100 h-full flex flex-col group">
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${categoryInfo.color}`}>
            <CategoryIcon className="w-3 h-3" />
            <span>{categoryInfo.label}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">{title}</h3>
        <p className="text-emerald-700/80 mb-4 flex-grow">{description}</p>
        <div className="space-y-2 mt-auto">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <p className="text-sm text-emerald-700">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
        >
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default Products;