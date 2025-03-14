import { useState, useEffect, useMemo, useRef } from "react";
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
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const prevLanguageRef = useRef(language);
  
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

  // Product options with translation keys
  const productOptions = useMemo(() => [
    { value: "sugar_icumsa", label: t('product.sugar.title') },
    { value: "soy_products", label: t('product.soy.title') },
    { value: "coffee_beans", label: t('product.coffee.title') },
    { value: "beef_products", label: t('product.beef.title') },
    { value: "chicken_meat", label: t('product.chicken.title') },
    { value: "beef_ghee", label: t('product.ghee.title') },
    { value: "vegetable_oils", label: t('product.vegetable.title') },
    { value: "rice_varieties", label: t('product.rice.title') },
    { value: "olive_oil", label: t('product.olive.title') },
    { value: "urea_and_fertilizers", label: t('product.urea.title') },
    { value: "petroleum_products", label: t('product.petroleum.title') },
  ], [t, language, forceUpdate]);

  // Set the selected product when the component mounts or language changes
  useEffect(() => {
    const state = location.state as { selectedProduct?: string };
    if (state?.selectedProduct) {
      // Try to find a direct match with the value first
      let matchingProduct = productOptions.find(option => option.value === state.selectedProduct);
      
      // If no direct match, try to match by comparing the transformed product ID
      if (!matchingProduct) {
        // Get all product labels in lowercase with spaces replaced by underscores
        const normalizedLabels = productOptions.map(option => ({
          value: option.value,
          normalizedLabel: option.label.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and')
        }));
        
        // Find a match with the normalized label
        const matchByLabel = normalizedLabels.find(item => item.normalizedLabel === state.selectedProduct);
        
        if (matchByLabel) {
          matchingProduct = productOptions.find(option => option.value === matchByLabel.value);
        }
      }
      
      if (matchingProduct) {
        setFormData(prev => ({ ...prev, product: matchingProduct.value }));
      }
    }
  }, [location.state, productOptions, language]);
  
  // Force UI update when language changes
  useEffect(() => {
    // Only run this effect when language actually changes
    if (prevLanguageRef.current !== language) {
      // Store current values
      const currentValues = { ...formData };
      
      // Reset form data to force re-render of select components
      setFormData(prev => ({
        ...prev,
        product: "",
        delivery: ""
      }));
      
      // After a short delay, restore the values and force update
      const timer = setTimeout(() => {
        setFormData(currentValues);
        setForceUpdate(prev => prev + 1); // Increment to force re-render
      }, 50);
      
      // Update the ref to current language
      prevLanguageRef.current = language;
      
      return () => clearTimeout(timer);
    }
  }, [language, formData]);
  
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

  // Delivery terms options with translations
  const deliveryOptions = useMemo(() => [
    { value: "cif", label: t('inquiry.form.delivery.cif') },
    { value: "fob", label: t('inquiry.form.delivery.fob') },
    { value: "ex_works", label: t('inquiry.form.delivery.exw') },
    { value: "ddp", label: t('inquiry.form.delivery.ddp') },
    { value: "fas", label: t('inquiry.form.delivery.fas') },
    { value: "cfr", label: t('inquiry.form.delivery.cfr') },
    { value: "other", label: t('inquiry.form.delivery.other') },
  ], [t, language, forceUpdate]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 font-sans">
      <Header />
      <main className="flex-grow">
        {/* Inquiry Form - Moved to top */}
        <motion.section 
          className="py-12 pt-28 relative"
          initial="initial"
          animate="animate"
          variants={pageVariants}
        >
          {/* Subtle background effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
            <motion.div
              className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-64 -right-64"
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
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              variants={pageVariants}
              className="max-w-4xl mx-auto mt-8 bg-white/90 backdrop-blur-sm border border-gray-100/80 rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl"
            >
              <motion.div variants={pageVariants} className="text-center mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <Send className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mb-2 sm:mb-0" />
                  <h2 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent text-center">
                    {t("inquiry.form.title")}
                  </h2>
                </div>
                <p className="text-foreground max-w-2xl mx-auto text-sm sm:text-base">
                  {t("inquiry.form.description")}
                </p>
              </motion.div>
              
              <form key={`inquiry-form-${language}-${forceUpdate}`} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="company" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.company")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="name" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.name")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="email" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.email")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="phone" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.phone")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <motion.div 
                    variants={pageVariants} 
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="product" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.product")} <span className="text-destructive">*</span>
                    </label>
                    <Select 
                      key={`product-select-${language}-${forceUpdate}`}
                      value={formData.product} 
                      onValueChange={(value) => handleSelectChange('product', value)}
                      required
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder={t("inquiry.form.selectProduct")} />
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
                    className="space-y-2 sm:space-y-3"
                  >
                    <label htmlFor="quantity" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      {t("inquiry.form.quantity")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="quantity" 
                      value={formData.quantity}
                      onChange={handleChange}
                      required 
                      className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </motion.div>
                </div>

                <motion.div 
                  variants={pageVariants} 
                  className="space-y-2 sm:space-y-3"
                >
                  <label htmlFor="delivery" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    {t("inquiry.form.delivery")} <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    key={`delivery-select-${language}-${forceUpdate}`}
                    value={formData.delivery} 
                    onValueChange={(value) => handleSelectChange('delivery', value)}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder={t("inquiry.form.selectDelivery")} />
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
                  className="space-y-2 sm:space-y-3"
                >
                  <label htmlFor="message" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    {t("inquiry.form.message")}
                  </label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </motion.div>

                <motion.div variants={pageVariants}>
                  <Button 
                    type="submit" 
                    className="w-full px-6 sm:px-12 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold text-white">
                      {isSubmitting ? "Submitting..." : t("inquiry.form.submit")}
                    </span>
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