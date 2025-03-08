import { NavLink } from "react-router-dom";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  // Modern gradient styles
  const titleGradient = "linear-gradient(135deg, #059669, #34d399)";
  const textGradient = "linear-gradient(135deg, #047857, #10b981)";
  const hoverGradient = "linear-gradient(135deg, #059669, #6ee7b7)";

  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-emerald-500/20">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <h3 
              className="text-xl font-display font-bold mb-4 inline-flex items-center gap-2"
            >
              <img
                src="/tree_logo.png"
                alt="Roodan Logo"
                className="w-8 h-10 object-contain -translate-y-1 transform transition-transform duration-300"
              />
              <span 
                className="bg-clip-text text-transparent transition-all duration-300 relative group inline-block"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #0a5d36, #4ade80)",
                  textShadow: "0 2px 4px rgba(10, 93, 54, 0.2)"
                }}
              >
                ROODAN
                <span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                  style={{ 
                    background: "linear-gradient(to right, #0a5d36, #4ade80)",
                    boxShadow: "0 0 8px rgba(10, 93, 54, 0.3)"
                  }}
                />
              </span>
            </h3>
            <p className="text-black text-sm max-w-xs leading-relaxed">
              {t("slogan")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-medium mb-4 text-sm uppercase tracking-wider inline-block"
            >
              <span 
                className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: titleGradient }}
              >
                {t("nav.quick_link")}
              </span>
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/about", label: t("nav.about") },
                { to: "/products", label: t("nav.products") },
                { to: "/inquiry", label: t("nav.inquiry") },
                { to: "/contact", label: t("nav.contact") }
              ].map((link) => (
                <li key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) =>
                      cn(
<<<<<<< HEAD
                        "transition-all duration-300 text-gray-600 hover:text-gray-900", // Same color for all links
                        isActive ? "font-medium" : "" // Only apply font-weight difference for active link
=======
                        "transition-all duration-300 hover:font-medium",
                        isActive ? "font-medium text-black" : "text-black"
>>>>>>> 955e0ecc002bad52a8227ed2cce02c79e3d04a95
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 
              className="font-medium mb-4 text-sm uppercase tracking-wider inline-block"
            >
              <span 
                className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: titleGradient }}
              >
                {t("hero.cta")}
              </span>
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                t("products.sugar"),
                t("products.coffee"),
                t("products.meat"),
                t("products.oil"),
                t("products.petroleum")
              ].map((product) => (
                <li key={product}>
                  <NavLink 
                    to="/products" 
                    className="transition-all duration-300 text-black hover:font-medium"
                  >
                    {product}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="font-medium mb-4 text-sm uppercase tracking-wider inline-block"
            >
              <span 
                className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: titleGradient }}
              >
                {t("contact.title")}
              </span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-black">{t("contact.email")}:</span>
                <a 
                  href="mailto:info@tradenexus.com" 
                  className="transition-all duration-300 text-black hover:font-medium"
                >
                  www.roodan.ae
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-black">{t("contact.phone")}:</span>
                <a 
                  href="tel:+12345678900" 
                  className="transition-all duration-300 text-black hover:font-medium"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-black">{t("contact.address")}:</span>
                <span className="text-black">
                  {t("contact.address_main")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-emerald-500/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black text-sm">
            &copy; {currentYear} ROODAN. {t("footer.rights")}.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["footer.privacy", "footer.terms"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm text-black transition-all duration-300 hover:font-medium"
              >
                {t(item)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}