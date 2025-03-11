import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Contact = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Improved loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target;
      const formData = {
        name: form.elements.namedItem("name").value,
        email: form.elements.namedItem("email").value,
        message: form.elements.namedItem("message").value,
      };

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent",
          description:
            data.message ||
            "We've received your message and will get back to you soon.",
          duration: 5000,
        });

        form.reset();
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 font-sans">
      <Header />
      <main className="flex-grow relative">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full opacity-20 blur-3xl"></div>

        {/* Added proper spacing from navbar */}
        <div className="h-20 relative z-10"></div>

        <div
          className={cn(
            "page-container",
            language === "ar" ? "rtl" : "ltr",
            "pt-14 pb-10"
          )}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2
              className="text-4xl md:text-5xl font-display font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mt-4"
            >
              {t("contact.title")}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-500 mx-auto rounded-full mb-8"></div>

          {/*  */}
        </div>

        {/* Contact Information Cards - Compact with minimal spacing */}
        <section className="py-4">
          <div
            className={cn("page-container", language === "ar" ? "rtl" : "ltr")}
          >
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 h-32 animate-pulse shadow-sm"
                  ></div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {[
                  {
                    icon: Mail,
                    title: t("contact.email"),
                    links: [
                      // { text: "www.roodan.ae", href: "https://www.roodan.ae" },
                      { text: "info@roodan.ae", href: "mailto:info@roodan.ae" },
                    ],
                  },
                  {
                    icon: Phone,
                    title: t("contact.phone"),
                    links: [
                      // { text: "+1 (234) 567-8900", href: "tel:+12345678900" },
                      { text: "+971507654228", href: "tel:+971507654228" },
                    ],
                  },
                  {
                    icon: MessageCircle,
                    title: t("contact.whatsapp"),
                    links: [
                      {
                        text: "+971507654228",
                        href: "https://wa.me/971507654228",
                      },
                    ],
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
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                    className="bg-white rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 rounded-full flex items-center justify-center mb-2">
                      <item.icon className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h3 className="text-sm font-medium mb-1 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    {item.links ? (
                      <div className="space-y-0.5">
                        {item.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.href}
                            className="block text-xs text-gray-600 hover:text-emerald-500 transition-colors"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <address className="not-italic text-xs text-gray-600">
                        {item.address}
                      </address>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Form + Map - Adjusted size for form elements */}
        <section className="py-6">
          <div
            className={cn(
              "page-container max-w-6xl",
              language === "ar" ? "rtl" : "ltr"
            )}
          >
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Form Section - Increased size of form elements */}
                <div className="p-5 md:p-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {t("SendUs.title")}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t("SendUs.desc")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form.name")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        className="h-10 text-sm rounded-md border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/30 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form.email")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="h-10 text-sm rounded-md border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/30 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form.message")} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="text-sm rounded-md border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/30 transition-all"
                        placeholder="Your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 group relative overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 font-medium text-white">
                        {isSubmitting ? t("SendUs.sending") : t("SendUs.button")}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Button>
                  </form>
                </div>

                {/* Map Section - Height adjusted */}
                <div className="relative h-[300px] lg:h-auto">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.417834204089!2d54.33697647424187!3d24.470975504507794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65e0afe75c95%3A0x3f42d2c696969cec!2sKhalidiyah%20Tower!5e0!3m2!1sen!2sae!4v1710835058468!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Roodan Office Location"
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Added bottom spacing */}
        <div className="h-8"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
