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
    'nav.inquiry': 'Request Quotation',
    'nav.contact': 'Contact',
    //Header
    'logo.title':'ROODAN',
    
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
    'about.team.title': 'Our Leadership Team',
    'about.team.desc': "Discover the exceptional individuals driving our company's vision and success.",

    // Our Mission
    'about.values.value1.title':'Quality Assurance',
    'about.values.value1.desc': 'Delivering premium agricultural and industrial products to global standards.',
    'about.values.value2.title':'Reliable Partnerships',
    'about.values.value2.desc': 'Building lasting client relationships with timely, efficient delivery.',
    'about.values.value3.title':'Sustainable Trade',
    'about.values.value3.desc': 'Upholding sustainable and ethical trade in all operations.',
    'about.values.value4.title':'Customer Commitment',
    'about.values.value4.desc': 'Ensuring customer satisfaction through fair pricing, top logistics, and great service.',

    // About.Why Choose Us
    'about.whyChooseUs.title': 'Why Choose Us?',
    'about.whyChooseUs.title1': 'Superior Quality Assurance',
    'about.whyChooseUs.reason1': 'Premium quality products sourced from trusted suppliers worldwide',
    'about.whyChooseUs.title2': 'Tailored Logistics Solutions',
    'about.whyChooseUs.reason2': 'Flexible delivery terms to meet your specific requirements',
    'about.whyChooseUs.title3': 'Competitive & Transparent Pricing',
    'about.whyChooseUs.reason3': 'Competitive pricing and transparent business practices',
    'about.whyChooseUs.title4': 'Dedicated Customer Support ',
    'about.whyChooseUs.reason4': 'Responsive customer service and dedicated support',
    'about.whyChooseUs.title5': 'Global Expertise & Trusted Network',
    'about.whyChooseUs.reason5': 'Years of experience in international trade with a global network',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.address': 'Address',
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah,\nAbu Dhabi, United Arab Emirates',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.whatsapp' : 'WhatsApp',
    'SendUs.title' : 'Send us a Message',
    'SendUs.desc' :' Have a question or inquiry? Fill out the form below and we will get back to you as soon as possible.',
    // Inquiry
    'inquiry.title': 'Request a Quote',
    'inquiry.subtitle': 'Fill out the form to receive a personalized quote',
    'inquiry.form.title': 'Request a Quote',
    'inquiry.form.description': 'Fill out the form to receive a personalized quote',
    'inquiry.form.company': 'Company Name',
    'inquiry.form.name': 'Your Name',
    'inquiry.form.email': 'Email Address',
    'inquiry.form.phone': 'Phone Number',
    'inquiry.form.product': 'Product',
    'inquiry.form.quantity': 'Quantity',
    'inquiry.form.delivery': 'Delivery Terms',
    'inquiry.form.message': 'Additional Information',
    'inquiry.form.submit': 'Send Request',
    
    // Footer
    'slogan':'Premium global trading solutions providing high-quality products with reliable service worldwide.',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'nav.quick_link':'Quick Links',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.inquiry': 'demande de devis',
    'nav.contact': 'Contact',
    //Header
    'logo.title':'ROODAN',
    
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
    'about.team.title': 'Notre équipe de direction',
    'about.team.desc': 'Découvrez les individus exceptionnels qui sont à l’origine de la vision et du succès de notre entreprise.',

    // Our Mission
    'about.values.value1.title':'Quality Assurance',
    'about.values.value1.desc': 'Fournir des produits agricoles et industriels de haute qualité répondant aux normes mondiales.',
    'about.values.value2.title':'Des partenariats fiables',
    'about.values.value2.desc': 'Construire des relations à long terme avec les clients en assurant une livraison rapide et efficace.',
    'about.values.value3.title':'Commerce durable',
    'about.values.value3.desc': 'Promouvoir des pratiques commerciales durables et éthiques dans toutes nos opérations.',
    'about.values.value4.title':'Engagement client',
    'about.values.value4.desc': 'Assurer la satisfaction du client grâce à des prix compétitifs, une logistique supérieure et un service exceptionnel.',

    // About.Why Choose Us
    'about.whyChooseUs.title': 'Why Choose Us?',
    'about.whyChooseUs.title1': 'Assurance qualité supérieure',
    'about.whyChooseUs.reason1': 'Premium quality products sourced from trusted suppliers worldwide',
    'about.whyChooseUs.title2': 'Des solutions logistiques sur mesure',
    'about.whyChooseUs.reason2': 'Flexible delivery terms to meet your specific requirements',
    'about.whyChooseUs.title3': 'Des prix compétitifs et transparents',
    'about.whyChooseUs.reason3': 'Competitive pricing and transparent business practices',
    'about.whyChooseUs.title4': 'Assistance client dédiée',
    'about.whyChooseUs.reason4': 'Responsive customer service and dedicated support',
    'about.whyChooseUs.title5': 'Expertise mondiale et réseau de confiance',
    'about.whyChooseUs.reason5': 'Years of experience in international trade with a global network',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Entrez en contact avec notre équipe',
    'contact.address': 'Adresse',
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah,\nAbu Dhabi, Émirats Arabes Unis',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.message': 'Votre Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.whatsapp' : 'WhatsApp',
    'SendUs.title' : 'Envoyez-nous un message',
    'SendUs.desc' :'Vous avez une question ou une demande ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
    
    // Inquiry
    'inquiry.title': 'Demande de Devis',
    'inquiry.subtitle': 'Remplissez le formulaire pour recevoir un devis personnalisé',
    'inquiry.form.title': 'Demande de Devis',
    'inquiry.form.description': 'Remplissez le formulaire pour recevoir un devis personnalisé',
    'inquiry.form.company': 'Nom de l\'Entreprise',
    'inquiry.form.name': 'Votre Nom',
    'inquiry.form.email': 'Adresse Email',
    'inquiry.form.phone': 'Numéro de Téléphone',
    'inquiry.form.product': 'Produit',
    'inquiry.form.quantity': 'Quantité',
    'inquiry.form.delivery': 'Conditions de Livraison',
    'inquiry.form.message': 'Informations Supplémentaires',
    'inquiry.form.submit': 'Envoyer la demande',
    
    // Footer
    'slogan':'Solutions commerciales mondiales haut de gamme offrant des produits de haute qualité avec un service fiable dans le monde entier.',
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'nav.quick_link':'Liens rapides',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.inquiry': 'طلب الاقتباس',
    'nav.contact': 'اتصل بنا',
    //Header
    'logo.title':'رودان',
    
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
    'about.team.title': 'فريق القيادة لدينا',
    'about.team.desc':'اكتشف الأفراد الاستثنائيين الذين يقودون رؤية شركتنا ونجاحها.',

    // Our Mission
    'about.values.value1.title':'ضمان الجودة',
    'about.values.value1.desc': 'توفير منتجات زراعية وصناعية عالية الجودة تتوافق مع المعايير العالمية.',
    'about.values.value2.title':'شراكات موثوقة',
    'about.values.value2.desc': 'بناء علاقات طويلة الأمد مع العملاء من خلال ضمان التسليم في الوقت المناسب وبكفاءة.',
    'about.values.value3.title':'التجارة المستدامة',
    'about.values.value3.desc': 'تعزيز ممارسات التجارة المستدامة والأخلاقية في جميع عملياتنا.',
    'about.values.value4.title':'التزام العملاء',
    'about.values.value4.desc': 'لضمان رضا العملاء من خلال الأسعار التنافسية والخدمات اللوجستية المتفوقة والخدمة الاستثنائية.',
      
    // About.Why Choose Us
    'about.whyChooseUs.title': 'لماذا تختارنا؟',
    'about.whyChooseUs.title1': 'ضمان الجودة العالية',
    'about.whyChooseUs.reason1': 'منتجات فائقة الجودة من موردين موثوقين في جميع أنحاء العالم',
    'about.whyChooseUs.title2': 'حلول لوجستية مخصصة',
    'about.whyChooseUs.reason2': 'شروط تسليم مرنة لتلبية متطلباتك المحددة',
    'about.whyChooseUs.title3': 'أسعار تنافسية وشفافة',
    'about.whyChooseUs.reason3': 'أسعار تنافسية وممارسات تجارية شفافة',
    'about.whyChooseUs.title4': 'دعم العملاء المخصص',
    'about.whyChooseUs.reason4': 'خدمة عملاء سريعة الاستجابة ودعم مخصص',
    'about.whyChooseUs.title5': 'خبرة عالمية وشبكة موثوقة',
    'about.whyChooseUs.reason5': 'سنوات من الخبرة في التجارة الدولية مع شبكة عالمية',
    
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.address': 'العنوان',
    'contact.address_main':'أبراج الخالدية، طابق الميزانين،\nشارع الفسكر W10،\nالبطين، الخالدية،\nأبوظبي، الإمارات العربية المتحدة',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.whatsapp' : 'واتساب',     
    'SendUs.title' : 'أرسل لنا رسالة',
    'SendUs.desc' :'هل لديك سؤال أو استفسار؟ املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.',

    
    // Inquiry
    'inquiry.title': 'طلب عرض سعر',
    'inquiry.subtitle': 'املأ النموذج للحصول على عرض سعر مخصص',
    'inquiry.form.title': 'طلب عرض سعر',
    'inquiry.form.description': 'املأ النموذج للحصول على عرض سعر مخصص',
    'inquiry.form.company': 'اسم الشركة',
    'inquiry.form.name': 'اسمك',
    'inquiry.form.email': 'البريد الإلكتروني',
    'inquiry.form.phone': 'رقم الهاتف',
    'inquiry.form.product': 'المنتج',
    'inquiry.form.quantity': 'الكمية',
    'inquiry.form.delivery': 'شروط التسليم',
    'inquiry.form.message': 'معلومات إضافية',
    'inquiry.form.submit': 'إرسال الطلب',
    
    // Footer
    'slogan':'حلول تجارية عالمية متميزة توفر منتجات عالية الجودة مع خدمة موثوقة في جميع أنحاء العالم..',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'nav.quick_link':'روابط سريعة',
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
