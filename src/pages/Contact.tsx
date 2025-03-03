
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
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
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        duration: 5000,
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format")',
              backgroundPosition: '50% 40%'
            }}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t("contact.title")}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-secondary/30 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{t("contact.email")}</h3>
                <a href="mailto:info@tradenexus.com" className="text-primary hover:underline">
                  info@tradenexus.com
                </a>
                <a href="mailto:sales@tradenexus.com" className="text-primary hover:underline">
                  sales@tradenexus.com
                </a>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{t("contact.phone")}</h3>
                <a href="tel:+12345678900" className="text-primary hover:underline">
                  +1 (234) 567-8900
                </a>
                <a href="tel:+12345678901" className="text-primary hover:underline">
                  +1 (234) 567-8901
                </a>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{t("contact.address")}</h3>
                <address className="not-italic">
                  123 Trading Street<br />
                  Business City, 10001<br />
                  United States
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary/30">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-6">
                  Have a question or inquiry? Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name")} <span className="text-destructive">*</span>
                    </label>
                    <Input id="name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")} <span className="text-destructive">*</span>
                    </label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("contact.form.message")} <span className="text-destructive">*</span>
                    </label>
                    <Textarea id="message" rows={5} required />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : t("contact.form.submit")}
                  </Button>
                </form>
              </div>
              
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830911728!2d-74.11976315!3d40.69766999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1653913536737!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
