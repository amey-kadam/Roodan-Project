import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Grid, 
  Filter, 
  ShoppingBag, 
  Package 
} from "lucide-react";

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
   { id: 'all', label: t('products.categories.all'), icon: Grid },
   { id: 'food', label: t('products.categories.food'), icon: ShoppingBag },
   { id: 'oils', label: t('products.categories.oils'), icon: Package },
   { id: 'agri', label: t('products.categories.agri'), icon: Filter },
   { id: 'petro', label: t('products.categories.petro'), icon: ShoppingBag },
 ];

 const pageVariants = {
   initial: { opacity: 0, y: 50 },
   animate: { 
     opacity: 1, 
     y: 0,
     transition: { 
       duration: 0.8,
       ease: "easeOut"
     }
   }
 };

 return (
   <div className="min-h-screen flex flex-col bg-background">
     <Header />
     <main className="flex-grow">
       {/* Hero Section with Enhanced Background */}
       <motion.section 
         className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
       >
         {/* Background Gradient and Effects */}
         <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 opacity-100" />
           <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
           <motion.div
             className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-64 -left-64"
             animate={{
               y: [0, -20, 0],
               transition: {
                 duration: 6,
                 repeat: Infinity,
                 ease: "easeInOut",
               }
             }}
           />
         </div>

         {/* Content */}
         <motion.div 
           className={cn(
             "page-container relative z-10 text-center",
             language === "ar" ? "rtl" : "ltr"
           )}
           initial="initial"
           animate="animate"
         >
           <motion.div variants={pageVariants}>
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
               {t("products.title")}
             </h1>
             <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-6">
               {t("products.description")}
             </p>
           </motion.div>
         </motion.div>
       </motion.section>

       {/* Product Categories */}
       <motion.section 
         className="py-16"
         initial="initial"
         whileInView="animate"
         viewport={{ once: true }}
       >
         <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
           <motion.div 
             variants={pageVariants}
             className="flex flex-wrap gap-4 justify-center"
           >
             {categories.map((category) => {
               const Icon = category.icon;
               return (
                 <Button
                   key={category.id}
                   variant={activeCategory === category.id ? "default" : "outline"}
                   onClick={() => setActiveCategory(category.id as ProductCategory)}
                   className={cn(
                     "group transition-all duration-300 px-6 py-3 rounded-2xl",
                     activeCategory === category.id 
                       ? "bg-gradient-to-r from-primary to-primary/90" 
                       : "hover:border-primary hover:bg-secondary/10"
                   )}
                 >
                   <div className="flex items-center gap-3">
                     <Icon 
                       className={cn(
                         "w-5 h-5 transition-colors",
                         activeCategory === category.id 
                           ? "text-white" 
                           : "text-primary group-hover:text-primary"
                       )}
                     />
                     {category.label}
                   </div>
                 </Button>
               );
             })}
           </motion.div>
         </div>
       </motion.section>

       {/* Products Grid */}
       <motion.section 
         className="py-24 bg-secondary/5"
         initial="initial"
         whileInView="animate"
         viewport={{ once: true }}
       >
         <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
           <motion.div 
             variants={pageVariants}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
             {filteredProducts.map((product, index) => (
               <motion.div
                 key={product.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ 
                   opacity: 1, 
                   scale: 1,
                   transition: { 
                     duration: 0.5,
                     delay: index * 0.1
                   }
                 }}
                 viewport={{ once: true }}
                 className="flex h-full" // Added h-full to ensure consistent height
               >
                 <ProductCard
                   title={product.title}
                   image={product.image}
                   description={product.description}
                   details={product.details}
                   className="hover:shadow-primary/10 transition-shadow duration-300 flex-grow flex flex-col" // Added flex-grow and flex-col
                 />
               </motion.div>
             ))}
           </motion.div>
         </div>
       </motion.section>
     </main>
     <Footer />
   </div>
 );
};

export default Products;