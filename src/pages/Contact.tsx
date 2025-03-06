import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Contact = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add loading state management
  useState(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  const floatingVariants = {
    initial: { y: -20 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const form = e.target as HTMLFormElement;
      const formData = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      };
      
      // Send data to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: data.message || "We've received your message and will get back to you soon.",
          duration: 5000,
        });
        
        // Reset form
        form.reset();
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Motion Background */}
        <motion.section 
          className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/10 opacity-100" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
            
            {/* Animated Floating Shapes */}
            <motion.div
              className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-64 -left-64"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="absolute w-[700px] h-[700px] bg-secondary/5 rounded-full blur-3xl -bottom-64 -right-64"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 2 }}
            />
          </div>
          
          {/* Page Title Content */}
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {t("contact.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-4">
                {t("contact.subtitle")}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-secondary/30 rounded-xl p-6 h-48 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                {[
                  { 
                    icon: Mail, 
                    title: t("contact.email"), 
                    links: [
                      { text: "www.roodan.ae", href: "https://www.roodan.ae" },
                      { text: "sales@tradenexus.com", href: "mailto:sales@tradenexus.com" }
                    ]
                  },
                  { 
                    icon: Phone, 
                    title: t("contact.phone"), 
                    links: [
                      { text: "+1 (234) 567-8900", href: "tel:+12345678900" },
                      { text: "+1 (234) 567-8901", href: "tel:+12345678901" }
                    ]
                  },
                  { 
                    icon: MessageCircle, 
                    title: t("contact.whatsapp") || "WhatsApp", 
                    links: [
                      { text: "+1 (234) 567-8902", href: "https://wa.me/12345678902" }
                    ]
                  },
                  { 
                   
                    icon: MapPin, 
                    title: t("contact.address"), 
                    address: t("contact.address_main"),
                  },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="bg-secondary/30 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 border border-border/30"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                    {item.links ? (
                      item.links.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.href} 
                          className="text-primary hover:underline"
                        >
                          {link.text}
                        </a>
                      ))
                    ) : (
                      <address className="not-italic">{item.address}</address>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary/30">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Have a question or inquiry? Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="name" 
                      required 
                      className="focus:border-primary focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="focus:border-primary focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("contact.form.message")} <span className="text-destructive">*</span>
                    </label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      required 
                      className="focus:border-primary focus:ring-primary/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="group h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-primary/30 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center gap-3 text-lg font-semibold">
                      {isSubmitting ? "Sending..." : t("contact.form.submit")}
                      <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </form>
              </div>
              
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.417834204089!2d54.336976478241866!3d24.4709755045078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65e0afe75c95%3A0x3f42d2c696969cec!2sKhalidiya%20Towers%20-%20Al%20Bateen%20-%20W10%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1741159624605!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;