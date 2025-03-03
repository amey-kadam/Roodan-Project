
import { useState } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Inquiry = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Inquiry Submitted",
        description: "We've received your inquiry and will contact you soon.",
        duration: 5000,
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1932&auto=format")',
              backgroundPosition: '50% 30%'
            }}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t("inquiry.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("inquiry.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="section-padding bg-white">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        {t("inquiry.form.company")} <span className="text-destructive">*</span>
                      </label>
                      <Input id="company" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t("inquiry.form.name")} <span className="text-destructive">*</span>
                      </label>
                      <Input id="name" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("inquiry.form.email")} <span className="text-destructive">*</span>
                      </label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {t("inquiry.form.phone")}
                      </label>
                      <Input id="phone" type="tel" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="product" className="text-sm font-medium">
                        {t("inquiry.form.product")} <span className="text-destructive">*</span>
                      </label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-sm font-medium">
                        {t("inquiry.form.quantity")} <span className="text-destructive">*</span>
                      </label>
                      <Input id="quantity" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="delivery" className="text-sm font-medium">
                      {t("inquiry.form.delivery")}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery terms" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("inquiry.form.message")}
                    </label>
                    <Textarea id="message" rows={5} />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : t("inquiry.form.submit")}
                  </Button>
                </form>
              </div>
              
              <div>
                <div className="bg-secondary/50 rounded-xl p-6 border border-border/30 shadow-sm">
                  <h3 className="text-xl font-display font-semibold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Premium quality products sourced from trusted suppliers worldwide</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Flexible delivery terms to meet your specific requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Competitive pricing and transparent business practices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Responsive customer service and dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Years of experience in international trade with a global network</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 bg-secondary/50 rounded-xl p-6 border border-border/30 shadow-sm">
                  <h3 className="text-xl font-display font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Email:</p>
                      <a href="mailto:info@tradenexus.com" className="text-primary hover:underline">
                        info@tradenexus.com
                      </a>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <a href="tel:+12345678900" className="text-primary hover:underline">
                        +1 (234) 567-8900
                      </a>
                    </div>
                    <div>
                      <p className="font-medium">Address:</p>
                      <address className="not-italic">
                        123 Trading Street<br />
                        Business City, 10001
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inquiry;
