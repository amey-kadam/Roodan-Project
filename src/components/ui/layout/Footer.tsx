import { NavLink } from "react-router-dom";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  // Modern gradient styles
  const titleGradient = "linear-gradient(to right, #0a5d36, #4ade80)";
  const textGradient = "linear-gradient(135deg, #047857, #10b981)";
  const hoverGradient = "linear-gradient(to right, #0a5d36, #4ade80)";

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  // Format address to properly display multiline content
  const formatAddress = (address: string) => {
    // First replace the escaped newlines with actual newlines
    const processedAddress = address.replace(/\\n/g, '\n');
    // Then split by newline and map to spans
    return processedAddress.split('\n').map((line, index) => (
      <span key={index} className="block">{line}</span>
    ));
  };

  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-emerald-500/20">
      <div className="px-4 md:px-6 py-8 md:py-16 max-w-7xl mx-auto">
        {/* Mobile logo section */}
        <div className="md:hidden mb-8 text-center">
          <h3 className="text-xl font-display font-bold mb-4">
            <button
              onClick={handleLogoClick}
              className="inline-flex items-center justify-center gap-2 hover:opacity-80 transition-all duration-300"
            >
              <img
                src="/tree_logo.png"
                alt="Roodan Logo"
                className="w-8 h-10 object-contain -translate-y-1 transform transition-transform duration-300"
              />
              <span 
                className="bg-clip-text text-transparent transition-all duration-300 inline-block relative group"
                style={{ 
                  backgroundImage: titleGradient,
                  textShadow: "0 2px 4px rgba(10, 93, 54, 0.2)"
                }}
              >
                {t("logo.title")}
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-800 to-emerald-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  style={{
                    boxShadow: "0 1px 2px rgba(10, 93, 54, 0.2)"
                  }}
                />
              </span>
            </button>
          </h3>
          <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
            {t("slogan")}
          </p>
        </div>

        {/* Footer links grid with proper alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 md:gap-x-8 lg:gap-12">
          {/* Logo and slogan (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block">
            <h3 className="text-xl font-display font-bold mb-4">
              <button
                onClick={handleLogoClick}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-all duration-300"
              >
                <img
                  src="/tree_logo.png"
                  alt="Roodan Logo"
                  className="w-8 h-10 object-contain -translate-y-1 transform transition-transform duration-300"
                />
                <span 
                  className="bg-clip-text text-transparent transition-all duration-300 inline-block relative group"
                  style={{ 
                    backgroundImage: titleGradient,
                    textShadow: "0 2px 4px rgba(10, 93, 54, 0.2)"
                  }}
                >
                  {t("logo.title")}
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-800 to-emerald-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                    style={{
                      boxShadow: "0 1px 2px rgba(10, 93, 54, 0.2)"
                    }}
                  />
                </span>
              </button>
            </h3>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              {t("slogan")}
            </p>
          </div>

          {/* Quick Links - with consistent heading and text alignment */}
          <div className="px-2 sm:px-0">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: titleGradient,
                  textShadow: "0 1px 2px rgba(10, 93, 54, 0.2)"
                }}
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
                        "transition-all duration-300 text-gray-600 hover:text-black-900",
                        isActive ? "font-medium" : ""
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Products - with consistent heading and text alignment */}
          <div className="px-2 sm:px-0">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: titleGradient,
                  textShadow: "0 1px 2px rgba(10, 93, 54, 0.2)"
                }}
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
                    className="transition-all duration-300 text-gray-600 hover:text-gray-900"
                  >
                    {product}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - spans 2 columns on mobile, 1 on desktop with proper alignment */}
          <div className="col-span-2 md:col-span-1 px-2 sm:px-0">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: titleGradient,
                  textShadow: "0 1px 2px rgba(10, 93, 54, 0.2)"
                }}
              >
                {t("contact.title")}
              </span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-2">
                <span className="text-gray-600 font-medium">{t("contact.email")}:</span>
                <a 
                  href="mailto:info@tradenexus.com" 
                  className="transition-all duration-300 text-gray-600 hover:text-gray-900"
                >
                  www.roodan.ae
                </a>
              </li>
              <li className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-2">
                <span className="text-gray-600 font-medium">{t("contact.phone")}:</span>
                <a 
                  href="tel:+12345678900" 
                  className="transition-all duration-300 text-gray-600 hover:text-gray-900"
                >
                  +971507654228
                </a>
              </li>
              <li className="grid grid-cols-1 gap-y-1">
                <span className="text-gray-600 font-medium">{t("contact.address")}:</span>
                <div className="text-gray-600">
                  {formatAddress(t("contact.address_main"))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Single divider line with copyright and links in one row */}
        <div className="mt-8 pt-4 border-t border-emerald-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-gray-600 text-sm text-center md:text-left">
              &copy; {currentYear} {t("logo.title")} {t("footer.rights")}.
            </p>
            
            <div className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              {["footer.privacy", "footer.terms"].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-sm text-gray-600 transition-all duration-300 hover:text-gray-900"
                >
                  {t(item)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}