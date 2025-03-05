
import { NavLink } from "react-router-dom";
import { useI18n } from "@/utils/i18n";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border/30">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <h3 className="text-lg font-display font-semibold mb-4">ROODAN</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
            {t("slogan")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {t("nav.quick_link")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("nav.home")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("nav.about")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("nav.products")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/inquiry" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("nav.inquiry")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("nav.contact")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
            {t("hero.cta")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("products.sugar")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("products.coffee")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("products.meat")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("products.oil")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  {t("products.petroleum")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-foreground/70">{t("contact.email")}:</span>
                <a href="mailto:info@tradenexus.com" className="text-foreground/70 hover:text-primary transition-colors">
                www.roodan.ae 
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-foreground/70">{t("contact.phone")}:</span>
                <a href="tel:+12345678900" className="text-foreground/70 hover:text-primary transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-foreground/70">{t("contact.address")}:</span>
                <span className="text-foreground/70">
                {t("contact.address_main")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} ROODAN. {t("footer.rights")}.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
