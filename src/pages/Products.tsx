
import { useState } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Product category type
type ProductCategory = 'all' | 'food' | 'oils' | 'agri' | 'petro';

const Products = () => {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');

  // Product data
  const products = [
    {
      id: 1,
      title: "Sugar ICUMSA",
      image: "/sugar.jpg",
      description: "Premium sugar with various ICUMSA grades from Brazil",
      details: [
        "ICUMSA 45 (white sugar), ICUMSA 100 (raw sugar), ICUMSA 150",
        "Packaging: 50 kg bags or big bags",
        "Delivery: CIF, FOB, etc."
      ],
      category: "food"
    },
    {
      id: 2,
      title: "Soy Products",
      image: "/soya.jpg",
      description: "High-quality soy products for various applications",
      details: [
        "Soybeans (GMO-free on request), soy flour, soy oil",
        "Packaging: According to customer requirements",
        "Delivery: Worldwide, flexible"
      ],
      category: "agri"
    },
    {
      id: 3,
      title: "Coffee Beans",
      image: "/coffee.jpg",
      description: "Premium Robusta and Arabica coffee beans",
      details: [
        "Robusta (strong) and Arabica (mild)",
        "Origin: South America, Asia, Africa",
        "Packaging: 50 kg bags or big bags"
      ],
      category: "food"
    },
    {
      id: 4,
      title: "Beef Products",
      image: "/Beef.jpg",
      description: "Premium quality beef from India",
      details: [
        "Frozen beef, various cuts",
        "Packaging: Frozen goods",
        "Delivery: Worldwide"
      ],
      category: "food"
    },
    {
      id: 5,
      title: "Chicken Meat",
      image: "/chicken.jpg",
      description: "Various chicken products of the highest quality",
      details: [
        "Whole chickens, chicken breasts, chicken legs, chicken wings",
        "Packaging: Frozen goods",
        "Delivery: Worldwide"
      ],
      category: "food"
    },
    {
      id: 6,
      title: "Beef Ghee",
      image: "/Ghee.jpg",
      description: "Pure beef ghee from India",
      details: [
        "100% pure beef ghee",
        "Packaging: 1 kg cans, 15 kg buckets",
        "Delivery: Worldwide"
      ],
      category: "oils"
    },
    {
      id: 7,
      title: "Vegetable Oils",
      image: "/oil.jpeg",
      description: "High-quality vegetable oils CP8 and CP10 from Asia",
      details: [
        "Palm oil, various packaging sizes",
        "Delivery: CIF, FOB or by arrangement",
        "Premium quality for food and industrial applications"
      ],
      category: "oils"
    },
    {
      id: 8,
      title: "Rice Varieties",
      image: "/Rice.jpg",
      description: "Premium rice varieties from around the world",
      details: [
        "Basmati, jasmine, parboiled, white rice",
        "Packaging: 5 kg, 25 kg bags or big bags",
        "Delivery: CIF, FOB"
      ],
      category: "food"
    },
    {
      id: 9,
      title: "Olive Oil",
      image: "/olive-oil.jpg",
      description: "Premium olive oil from Greece",
      details: [
        "Extra virgin olive oil, virgin olive oil, refined olive oil",
        "Packaging: 1 l bottles, 5 l canisters, 200L drums",
        "Delivery: CIF, FOB"
      ],
      category: "oils"
    },
    {
      id: 10,
      title: "Urea & Fertilizers",
      image: "/Urea.png",
      description: "High-quality urea and fertilizers for agricultural use",
      details: [
        "Urea 46% Granular and Prilled",
        "Packaging: 50kg bags or big bags",
        "Delivery: Worldwide"
      ],
      category: "agri"
    },
    {
      id: 11,
      title: "Petroleum Products",
      image: "/petrol.jpg",
      description: "Premium petroleum products for various applications",
      details: [
        "EN 590, D2, AGO, Jet A1",
        "Diesel, Aviation Fuel, Automotive Fuel",
        "Delivery: CIF, FOB"
      ],
      category: "petro"
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Category buttons data with translations
  const categories = [
    { id: 'all', label: t('products.categories.all') },
    { id: 'food', label: t('products.categories.food') },
    { id: 'oils', label: t('products.categories.oils') },
    { id: 'agri', label: t('products.categories.agri') },
    { id: 'petro', label: t('products.categories.petro') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1542361345-89e58247401a?q=80&w=2070&auto=format")',
              backgroundPosition: '50% 40%'
            }}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t("products.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("products.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-8 border-b border-border/30">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id as ProductCategory)}
                  className="transition-all duration-300"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-secondary/30">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  details={product.details}
                  className="animate-scale-in"
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
