import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Send, 
  Mail, 
  Phone, 
  Building, 
  ShoppingCart, 
  MessageCircle 
} from "lucide-react";

const Inquiry = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    delivery: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      const requiredFields = ['company', 'name', 'email', 'phone', 'product', 'quantity', 'delivery'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        throw new Error("Please fill all required fields");
      }
      
      // Send data to backend API
      const response = await fetch('http://localhost:5000/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Inquiry Submitted",
          description: data.message || "We've received your inquiry and will contact you soon.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          company: "",
          name: "",
          email: "",
          phone: "",
          product: "",
          quantity: "",
          delivery: "",
          message: ""
        });
      } else {
        throw new Error(data.message || "Failed to submit inquiry");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Product options
  const productOptions = [
    { value: "sugar", label: "Sugar ICUMSA" },
    { value: "soy", label: "Soy Products" },
    { value: "coffee", label: "Coffee Beans" },
    { value: "beef", label: "Beef Products" },
    { value: "chicken", label: "Chicken Meat" },
    { value: "ghee", label: "Beef Ghee" },
    { value: "vegetable_oil", label: "Vegetable Oils" },
    { value: "rice", label: "Rice" },
    { value: "olive_oil", label: "Olive Oil" },
    { value: "urea", label: "Urea & Fertilizers" },
    { value: "petroleum", label: "Petroleum Products" },
    { value: "other", label: "Other" },
  ];

  // Delivery terms options
  const deliveryOptions = [
    { value: "cif", label: "CIF" },
    { value: "fob", label: "FOB" },
    { value: "ex_works", label: "Ex Works" },
    { value: "ddp", label: "DDP" },
    { value: "fas", label: "FAS" },
    { value: "cfr", label: "CFR" },
    { value: "other", label: "Other" },
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
                {t("inquiry.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-6">
                {t("inquiry.subtitle")}
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Inquiry Form */}
        <motion.section 
          className="py-24 bg-secondary/5"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              variants={pageVariants}
              className="max-w-4xl mx-auto bg-white border border-border/20 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <motion.div variants={pageVariants} className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Send className="w-12 h-12 text-primary" />
                  <h2 className="text-3xl font-display font-bold">
                    {t("inquiry.form.title")}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("inquiry.form.description")}
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                      <Building className="w-5 h-5 text-primary" />
                      {t("inquiry.form.company")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      {t("inquiry.form.name")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-5 h-5 text-primary" />
                      {t("inquiry.form.email")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-5 h-5 text-primary" />
                      {t("inquiry.form.phone")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="rounded-xl focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="product" className="flex items-center gap-2 text-sm font-medium">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      {t("inquiry.form.product")} <span className="text-destructive">*</span>
                    </label>
                    <Select 
                      value={formData.product} 
                      onValueChange={(value) => handleSelectChange('product', value)}
                      required
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {productOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="hover:bg-secondary/20"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-3"
                  >
                    <label htmlFor="quantity" className="flex items-center gap-2 text-sm font-medium">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      {t("inquiry.form.quantity")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="quantity" 
                      value={formData.quantity}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>
                </div>

                <motion.div 
                  variants={pageVariants} 
                  className="space-y-3"
                >
                  <label htmlFor="delivery" className="flex items-center gap-2 text-sm font-medium">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    {t("inquiry.form.delivery")} <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    value={formData.delivery} 
                    onValueChange={(value) => handleSelectChange('delivery', value)}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select delivery terms" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="hover:bg-secondary/20"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div 
                  variants={pageVariants} 
                  className="space-y-3"
                >
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    {t("inquiry.form.message")}
                  </label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="rounded-xl focus:ring-2 focus:ring-primary/30"
                  />
                </motion.div>

                <motion.div variants={pageVariants}>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-primary/30"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : t("inquiry.form.submit")}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Inquiry;