import { useState, useCallback, useMemo, memo, lazy, Suspense } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Filter, ShoppingBag, Package, Leaf, Droplet, Fuel, Search, X } from "lucide-react";
// Product category type
type ProductCategory = "all" | "food" | "oils" | "agri" | "petro";

// Memoized ProductCardWrapper component
const MemoizedProductCardWrapper = memo(({ 
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
  const getCategoryInfo = useCallback((cat: string) => {
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
  }, []);

  const categoryInfo = useMemo(() => getCategoryInfo(category), [category, getCategoryInfo]);
  const CategoryIcon = categoryInfo.icon;

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
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
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm">{description}</p>
        <div className="space-y-2 mt-auto">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all duration-300 group"
        >
          <span>Request Quote</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>
    </motion.div>
  );
});

MemoizedProductCardWrapper.displayName = 'MemoizedProductCardWrapper';

// Memoized category button component
const CategoryButton = memo(({ 
  category, 
  activeCategory, 
  onClick, 
  index 
}: { 
  category: { id: string; label: string; icon: any }; 
  activeCategory: string; 
  onClick: () => void;
  index: number;
}) => {
  const Icon = category.icon;
  
  return (
    <motion.div
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
        onClick={onClick}
        className={cn(
          "group transition-all duration-300 px-5 py-2 rounded-full h-12 flex items-center justify-center",
          activeCategory === category.id
            ? "shadow-md"
            : "hover:border-emerald-700 hover:bg-emerald-50/70"
        )}
        style={
          activeCategory === category.id
            ? { background: "linear-gradient(to right, #059669, #10b981)" }
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
});

CategoryButton.displayName = 'CategoryButton';

const Products = () => {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Product data - memoized to prevent recreation on each render
  const products = useMemo(() => [
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
  ], []);

  // Filter products based on active category and search query
  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.details.some((detail) => detail.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [activeCategory, products, searchQuery]);

  // Category filter buttons with improved icons - memoized
  const categories = useMemo(() => [
    { id: "all", label: t("products.categories.all"), icon: Grid },
    { id: "food", label: t("products.categories.food"), icon: ShoppingBag },
    { id: "oils", label: t("products.categories.oils"), icon: Droplet },
    { id: "agri", label: t("products.categories.agri"), icon: Leaf },
    { id: "petro", label: t("products.categories.petro"), icon: Fuel },
  ], [t]);

  // Memoize animation variants to prevent recreation on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }), []);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: ProductCategory) => {
    setActiveCategory(category);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full opacity-20 blur-3xl"></div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500">
                  {t("products.title")}
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full my-6 mx-auto"></div>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 text-gray-600">
                {t("products.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="py-8">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
                {/* Search Bar */}
                <div className="relative mb-8 max-w-2xl mx-auto">
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-300",
                      searchFocused ? "bg-emerald-50 shadow-lg shadow-emerald-100/50" : "bg-transparent"
                    )}
                    style={{ 
                      transform: searchFocused ? "scale(1.02)" : "scale(1)",
                      filter: searchFocused ? "blur(8px)" : "blur(0px)",
                      opacity: searchFocused ? "0.7" : "0"
                    }}
                  />
                  <div className={cn(
                    "relative flex items-center overflow-hidden rounded-full transition-all duration-300 border",
                    searchFocused 
                      ? "border-emerald-400 shadow-lg shadow-emerald-100/50 bg-white" 
                      : "border-gray-200 shadow-sm bg-gray-50 hover:border-emerald-200 hover:shadow-md"
                  )}>
                    <div className={cn(
                      "absolute left-4 transition-all duration-300",
                      searchFocused ? "text-emerald-500" : "text-gray-400"
                    )}>
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      className={cn(
                        "block w-full py-4 transition-all duration-300 bg-transparent focus:outline-none",
                        searchFocused ? "pl-12 pr-12" : "pl-12 pr-4"
                      )}
                      style={{ fontSize: "1.05rem" }}
                      placeholder={`Search ${activeCategory === "all" ? "all products" : activeCategory + " products"}...`}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 focus:outline-none"
                          onClick={clearSearch}
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  {searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-4 -bottom-6 text-xs text-emerald-600 font-medium"
                    >
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
                    </motion.div>
                  )}
                </div>
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                  {categories.map((category, index) => (
                    <CategoryButton
                      key={category.id}
                      category={category}
                      activeCategory={activeCategory}
                      onClick={() => handleCategoryChange(category.id as ProductCategory)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 pb-24">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + searchQuery} // Force re-animation when filters change
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <MemoizedProductCardWrapper
                      key={product.id}
                      title={product.title}
                      image={product.image}
                      description={product.description}
                      details={product.details}
                      category={product.category}
                    />
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
                      <div className="text-emerald-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                      <p className="text-gray-600">
                        {searchQuery 
                          ? `No products matching "${searchQuery}" in ${activeCategory === "all" ? "any" : activeCategory} category.` 
                          : `No products available in the ${activeCategory} category.`}
                      </p>
                      <Button 
                        className="mt-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;