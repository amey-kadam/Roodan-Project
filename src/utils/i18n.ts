import { create } from 'zustand';

type Language = 'en' | 'ar' | 'fr';

interface I18nState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Translation strings
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.inquiry': 'Enquiry',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Roodan General Trading ',
    'hero.subtitle': 'Global quality products with reliable service',
    'hero.cta': 'Explore Products',
    
    // Strengths
    'strengths.title': 'Our Strengths',
    'strengths.quality.title': 'Quality',
    'strengths.quality.desc': 'Premium products meeting international standards',
    'strengths.reliability.title': 'Reliability',
    'strengths.reliability.desc': 'Trusted partner with consistent delivery',
    'strengths.partnership.title': 'Partnership',
    'strengths.partnership.desc': 'Long-term relationships built on transparency',
    'strengths.flexibility.title': 'Flexibility',
    'strengths.flexibility.desc': 'Customized solutions for your specific needs',
    
    // Products
    'products.title': 'Our Products',
    'products.description': 'Discover our comprehensive range of premium quality products, sourced from trusted global suppliers.',
    'products.viewAll': 'View All Products',
    'products.sugar': 'Sugar & Soy',
    'products.coffee': 'Coffee Beans',
    'products.meat': 'Meat Products',
    'products.oil': 'Vegetable Oils',
    'products.rice': 'Rice',
    'products.olive': 'Olive Oil',
    'products.urea': 'Urea & Fertilizers',
    'products.petroleum': 'Petroleum Products',
    'products.categories.all': 'All Products',
    'products.categories.food': 'Food Products',
    'products.categories.oils': 'Oils',
    'products.categories.agri': 'Agricultural',
    'products.categories.petro': 'Petroleum',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our mission and values',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide premium quality products through transparent and reliable partnerships worldwide.',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Quality, reliability, partnership, and flexibility form the cornerstone of our business philosophy.',
    'about.experience.title': 'Our Experience',
    'about.experience.desc': 'With years of experience in international trade, we have established strong partnerships and a reputation for excellence.',
    'about.team.title': 'Our Team',
    'about.team.desc': 'Meet our dedicated team of experts who are committed to providing exceptional service and building strong partnerships with our clients.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    
    // Inquiry
    'inquiry.title': 'Request a Quote',
    'inquiry.subtitle': 'Fill out the form to receive a personalized quote',
    'inquiry.form.company': 'Company Name',
    'inquiry.form.name': 'Your Name',
    'inquiry.form.email': 'Email Address',
    'inquiry.form.phone': 'Phone Number',
    'inquiry.form.product': 'Product',
    'inquiry.form.quantity': 'Quantity',
    'inquiry.form.delivery': 'Delivery Terms',
    'inquiry.form.message': 'Additional Information',
    'inquiry.form.submit': 'Submit Inquiry',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.inquiry': 'Enquête',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Commerce général de Roodan',
    'hero.subtitle': 'Produits de qualité mondiale avec un service fiable',
    'hero.cta': 'Explorer les Produits',
    
    // Strengths
    'strengths.title': 'Nos Forces',
    'strengths.quality.title': 'Qualité',
    'strengths.quality.desc': 'Produits premium répondant aux normes internationales',
    'strengths.reliability.title': 'Fiabilité',
    'strengths.reliability.desc': 'Partenaire de confiance avec une livraison constante',
    'strengths.partnership.title': 'Partenariat',
    'strengths.partnership.desc': 'Relations à long terme basées sur la transparence',
    'strengths.flexibility.title': 'Flexibilité',
    'strengths.flexibility.desc': 'Solutions personnalisées pour vos besoins spécifiques',
    
    // Products
    'products.title': 'Nos Produits',
    'products.description': 'Découvrez notre gamme complète de produits de qualité premium, provenant de fournisseurs mondiaux de confiance.',
    'products.viewAll': 'Voir Tous les Produits',
    'products.sugar': 'Sucre & Soja',
    'products.coffee': 'Grains de Café',
    'products.meat': 'Produits de Viande',
    'products.oil': 'Huiles Végétales',
    'products.rice': 'Riz',
    'products.olive': 'Huile d\'Olive',
    'products.urea': 'Urée & Engrais',
    'products.petroleum': 'Produits Pétroliers',
    'products.categories.all': 'Tous les Produits',
    'products.categories.food': 'Produits Alimentaires',
    'products.categories.oils': 'Huiles',
    'products.categories.agri': 'Agricole',
    'products.categories.petro': 'Pétrole',
    
    // About
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Notre mission et nos valeurs',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Fournir des produits de qualité premium grâce à des partenariats transparents et fiables dans le monde entier.',
    'about.values.title': 'Nos Valeurs',
    'about.values.desc': 'La qualité, la fiabilité, le partenariat et la flexibilité constituent la pierre angulaire de notre philosophie d\'entreprise.',
    'about.experience.title': 'Notre Expérience',
    'about.experience.desc': 'Avec des années d\'expérience dans le commerce international, nous avons établi des partenariats solides et une réputation d\'excellence.',
    'about.team.title': 'Notre Équipe',
    'about.team.desc': 'Rencontrez notre équipe dévouée d\'experts qui s\'engagent à fournir un service exceptionnel et à construire des partenariats solides avec nos clients.',
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Entrez en contact avec notre équipe',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.message': 'Votre Message',
    'contact.form.submit': 'Envoyer le Message',
    
    // Inquiry
    'inquiry.title': 'Demande de Devis',
    'inquiry.subtitle': 'Remplissez le formulaire pour recevoir un devis personnalisé',
    'inquiry.form.company': 'Nom de l\'Entreprise',
    'inquiry.form.name': 'Votre Nom',
    'inquiry.form.email': 'Adresse Email',
    'inquiry.form.phone': 'Numéro de Téléphone',
    'inquiry.form.product': 'Produit',
    'inquiry.form.quantity': 'Quantité',
    'inquiry.form.delivery': 'Conditions de Livraison',
    'inquiry.form.message': 'Informations Supplémentaires',
    'inquiry.form.submit': 'Soumettre la Demande',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.inquiry': 'اسْتيضاح',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title': 'رودان للتجارة العامة',
    'hero.subtitle': 'منتجات عالمية الجودة مع خدمة موثوقة',
    'hero.cta': 'استكشاف المنتجات',
    
    // Strengths
    'strengths.title': 'نقاط قوتنا',
    'strengths.quality.title': 'الجودة',
    'strengths.quality.desc': 'منتجات متميزة تلبي المعايير الدولية',
    'strengths.reliability.title': 'الموثوقية',
    'strengths.reliability.desc': 'شريك موثوق به مع تسليم متسق',
    'strengths.partnership.title': 'الشراكة',
    'strengths.partnership.desc': 'علاقات طويلة الأمد مبنية على الشفافية',
    'strengths.flexibility.title': 'المرونة',
    'strengths.flexibility.desc': 'حلول مخصصة لاحتياجاتك الخاصة',
    
    // Products
    'products.title': 'منتجاتنا',
    'products.description': 'اكتشف مجموعتنا الشاملة من المنتجات عالية الجودة، التي يتم الحصول عليها من موردين عالميين موثوق بهم.',
    'products.viewAll': 'عرض جميع المنتجات',
    'products.sugar': 'السكر والصويا',
    'products.coffee': 'حبوب القهوة',
    'products.meat': 'منتجات اللحوم',
    'products.oil': 'الزيوت النباتية',
    'products.rice': 'الأرز',
    'products.olive': 'زيت الزيتون',
    'products.urea': 'اليوريا والأسمدة',
    'products.petroleum': 'المنتجات البترولية',
    'products.categories.all': 'جميع المنتجات',
    'products.categories.food': 'المنتجات الغذائية',
    'products.categories.oils': 'الزيوت',
    'products.categories.agri': 'المنتجات الزراعية',
    'products.categories.petro': 'المنتجات البترولية',
    
    // About
    'about.title': 'من نحن',
    'about.subtitle': 'مهمتنا وقيمنا',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'توفير منتجات عالية الجودة من خلال شراكات شفافة وموثوقة في جميع أنحاء العالم.',
    'about.values.title': 'قيمنا',
    'about.values.desc': 'الجودة والموثوقية والشراكة والمرونة تشكل حجر الزاوية في فلسفة أعمالنا.',
    'about.experience.title': 'خبرتنا',
    'about.experience.desc': 'مع سنوات من الخبرة في التجارة الدولية، أقمنا شراكات قوية وسمعة في التميز.',
    'about.team.title': 'فريقنا',
    'about.team.desc': 'تعرف على فريقنا المتفاني من الخبراء الملتزمين بتقديم خدمة استثنائية وبناء شراكات قوية مع عملائنا.',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.address': 'العنوان',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    
    // Inquiry
    'inquiry.title': 'طلب عرض سعر',
    'inquiry.subtitle': 'املأ النموذج للحصول على عرض سعر مخصص',
    'inquiry.form.company': 'اسم الشركة',
    'inquiry.form.name': 'اسمك',
    'inquiry.form.email': 'البريد الإلكتروني',
    'inquiry.form.phone': 'رقم الهاتف',
    'inquiry.form.product': 'المنتج',
    'inquiry.form.quantity': 'الكمية',
    'inquiry.form.delivery': 'شروط التسليم',
    'inquiry.form.message': 'معلومات إضافية',
    'inquiry.form.submit': 'تقديم الطلب',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  }
};

// Create the store
export const useI18n = create<I18nState>((set, get) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
  t: (key) => {
    const { language } = get();
    return translations[language][key] || key;
  }
}));
