import { useState } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid, Filter, ShoppingBag, Package } from "lucide-react";

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

  // Category filter buttons
  const categories = [
    { id: "all", label: t("products.categories.all"), icon: Grid },
    { id: "food", label: t("products.categories.food"), icon: ShoppingBag },
    { id: "oils", label: t("products.categories.oils"), icon: Package },
    { id: "agri", label: t("products.categories.agri"), icon: Filter },
    { id: "petro", label: t("products.categories.petro"), icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background with green gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-emerald-700/10 opacity-100" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className={cn("page-container relative z-10 text-center", language === "ar" ? "rtl" : "ltr")}>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-clip-text text-transparent pb-6"
              style={{ 
                backgroundImage: "linear-gradient(to right, #004d00, #00b300, rgb(3, 111, 3))" 
              }}
            >
              {t("products.title")}
            </h1>
            <p 
              className="text-xl md:text-2xl max-w-3xl mx-auto mt-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #006400, rgb(32, 110, 32))"
              }}
            >
              {t("products.description")}
            </p>
          </div>
        </section>

        {/* Product Categories Filter */}
        <section className="py-16">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.id as ProductCategory)}
                    className={cn(
                      "group transition-all duration-300 px-6 py-3 rounded-2xl h-14 flex items-center justify-center",
                      activeCategory === category.id
                        ? ""
                        : "hover:border-emerald-700 hover:bg-emerald-50/20"
                    )}
                    style={
                      activeCategory === category.id
                        ? { background: "linear-gradient(to right, #004d00, #00b300)" }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          activeCategory === category.id
                            ? "text-white"
                            : "text-emerald-700 group-hover:text-emerald-800"
                        )}
                      />
                      <span className={activeCategory === category.id ? "text-white" : ""}>
                        {category.label}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-emerald-50/20">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  details={product.details}
                  className="hover:shadow-emerald-700/10 transition-shadow duration-300 flex-grow flex flex-col h-full"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;