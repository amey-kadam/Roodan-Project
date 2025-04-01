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
    'strengths.quality.desc': 'our products are sourced from experienced and reliable suppliers who are shortlisted by our field team',
    'strengths.reliability.title': 'Reliability',
    'strengths.reliability.desc': 'we work with trusted partners who are an integrated part of our supply chain that provide an end to end solution with 100% transparency',
    'strengths.partnership.title': 'Partnership',
    'strengths.partnership.desc': 'Our long term partnerships with all our stakeholders is built upon long standing trust and transparency',
    'strengths.flexibility.title': 'Customised Solution',
    'strengths.flexibility.desc': 'We provide tailor made export solutions as per customer needs',
    
    // Products
    'products.title': 'Our Products',
    'products.description': 'Discover our comprehensive range of premium quality products, sourced from trusted global suppliers.',
    'products.viewAll': 'View All Products',
    'products.viewDetails': 'View Details',
    'products.sugar': 'Sugar',
    'products.sugarDesc': 'ICUMSA 45, ICUMSA 100, ICUMSA 150',
    'products.soy': 'Soy Products',
    'products.soyDesc': 'Soybeans, Soy Flour, Soy Oil',
    'products.coffee': 'Coffee Beans',
    'products.coffeeDesc': 'Robusta & Arabica',
    'products.meat': 'Meat Products',
    'products.meatDesc': 'Buffalo Meat, Chicken & Cow Ghee',
    'products.oil': 'Vegetable Oils',
    'products.oilDesc': 'CP8, CP10 & Olive Oil, soyabean oil, sunflower oil & avacado oil ',
    'products.rice': 'Rice',
    'products.riceDesc': 'Basmati, Jasmine & White Rice',
    'products.olive': 'Olive Oil',
    'products.urea': 'Urea & Fertilizers',
    'products.petroleum': 'Petroleum Products',
    'products.petroleumDesc': 'EN 590, D2, AGO, Jet A1',
    'products.categories.all': 'All Products',
    'products.categories.food': 'Food Products',
    'products.categories.oils': 'Oils',
    'products.categories.agri': 'Agricultural',
    'products.categories.petro': 'Petroleum',
    'products.requestQuote': 'Request Quote',
    'products.noProductsFound': 'No products found',
    'products.noProductsMatching': 'No products matching "{query}" in {category} category.',
    'products.noProductsInCategory': 'No products available in the {category} category.',
    'products.clearFilters': 'Clear filters',
    
    // Product Details
    'product.sugar.title': 'Sugar ICUMSA',
    'product.sugar.description': 'Premium sugar with various ICUMSA grades from Brazil',
    'product.sugar.detail1': 'ICUMSA 45 (white sugar), ICUMSA 100 (raw sugar), ICUMSA 150',
    'product.sugar.detail2': 'Packaging: 50 kg bags or big bags',
    'product.sugar.detail3': 'Delivery: CIF, FOB, etc.',
    
    'product.soy.title': 'Soy Products',
    'product.soy.description': 'High-quality soy products for various applications',
    'product.soy.detail1': 'Soybeans (GMO-free on request), soy flour, soy oil',
    'product.soy.detail2': 'Packaging: According to customer requirements',
    'product.soy.detail3': 'Delivery: Worldwide, flexible',
    
    'product.coffee.title': 'Coffee Beans',
    'product.coffee.description': 'Premium Robusta and Arabica coffee beans',
    'product.coffee.detail1': 'Robusta (strong) and Arabica (mild)',
    'product.coffee.detail2': 'Origin: South America, Asia, Africa',
    'product.coffee.detail3': 'Packaging: 50 kg bags or big bags',
    
    'product.beef.title': 'Buffalo Meat (HALAL)',
    'product.beef.description': 'Premium quality Buffalo Meat from India',
    'product.beef.detail1': 'Frozen Buffalo Meat, various cuts',
    'product.beef.detail2': 'Packaging: Frozen goods',
    'product.beef.detail3': 'Delivery: Worldwide',
    
    'product.chicken.title': 'Chicken Meat',
    'product.chicken.description': 'Various chicken products of the highest quality',
    'product.chicken.detail1': 'Whole chickens, chicken breasts, chicken legs, chicken wings',
    'product.chicken.detail2': 'Packaging: Frozen goods',
    'product.chicken.detail3': 'Delivery: Worldwide',
    
    'product.ghee.title': 'Ghee',
    'product.ghee.description': 'Pure ghee from India',
    'product.ghee.detail1': '100% pure ghee',
    'product.ghee.detail2': 'Packaging: 1 kg cans, 15 kg buckets',
    'product.ghee.detail3': 'Delivery: Worldwide',
    
    'product.vegetable.title': 'Vegetable Oils',
    'product.vegetable.description': 'High-quality vegetable oils CP8 and CP10 from Asia',
    'product.vegetable.detail1': 'Palm oil, various packaging sizes, soyabean oil, sunflower oil, &avacado oil',
    'product.vegetable.detail2': 'Delivery: CIF, FOB or by arrangement',
    'product.vegetable.detail3': 'Premium quality for food and industrial applications',
    
    'product.rice.title': 'Rice Varieties',
    'product.rice.description': 'Premium rice varieties from around the world',
    'product.rice.detail1': 'Basmati, jasmine, parboiled, white rice',
    'product.rice.detail2': 'Packaging: 5 kg, 25 kg bags or big bags',
    'product.rice.detail3': 'Delivery: CIF, FOB',
    
    'product.olive.title': 'Olive Oil',
    'product.olive.description': 'Premium olive oil from Greece',
    'product.olive.detail1': 'Extra virgin olive oil, virgin olive oil, refined olive oil',
    'product.olive.detail2': 'Packaging: 1 l bottles, 5 l canisters, 200L drums',
    'product.olive.detail3': 'Delivery: CIF, FOB',
    
    'product.urea.title': 'Urea & Fertilizers',
    'product.urea.description': 'High-quality urea and fertilizers for agricultural use',
    'product.urea.detail1': 'Urea 46% Granular and Prilled',
    'product.urea.detail2': 'Packaging: 50kg bags or big bags',
    'product.urea.detail3': 'Delivery: Worldwide',
    
    'product.petroleum.title': 'Petroleum Products',
    'product.petroleum.description': 'Premium petroleum products for various applications',
    'product.petroleum.detail1': 'EN 590, D2, AGO, Jet A1',
    'product.petroleum.detail2': 'Diesel, Aviation Fuel, Automotive Fuel',
    'product.petroleum.detail3': 'Delivery: CIF, FOB',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our mission and values',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide premium quality products through transparent and reliable partnerships worldwide.',
    'about.services.title': 'Our Services',
    'about.services.desc': 'Providing Quality Products with Trust & Transparency Worldwide',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Quality, reliability, partnership, and flexibility form the cornerstone of our business philosophy.',
    'about.experience.title': 'Our Experience',
    'about.experience.desc': 'With years of experience in international trade, we have established strong partnerships and a reputation for excellence.',
    'about.team.title': 'Our Leadership Team',
    'about.team.desc': "Discover the exceptional individuals driving our company's vision and success.",

    // Our Services
    'about.service.service1.title':'Project Management & Consulting',
    'about.service.service1.desc': 
    '• Planning, execution, and optimization of projects \n' +
    '• Process analysis and efficiency improvement \n' +
    '• Strategic consulting and market entry strategies',
    'about.service.service2.title':'General Trading & Distribution',
    'about.service.service2.desc': 
    '• Import & export of various goods \n' +
    '• Procurement and logistics management \n' +
    '• Development of trade strategies \n',


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
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah, Abu Dhabi,\n\nUnited Arab Emirates',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.whatsapp' : 'WhatsApp',
    'SendUs.title' : 'Send us a Message',
    'SendUs.desc' :' Have a question or inquiry? Fill out the form below and we will get back to you as soon as possible.',
    'SendUs.button':'Send',
    'SendUs.sending':'Sending...',
    'SendUS.success':'Message sent successfully!',

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
    'inquiry.form.selectProduct': 'Select a product',
    'inquiry.form.quantity': 'Quantity',
    'inquiry.form.delivery': 'Delivery Terms',
    'inquiry.form.selectDelivery': 'Select delivery terms',
    'inquiry.form.delivery.cif': 'CIF (Cost, Insurance & Freight)',
    'inquiry.form.delivery.fob': 'FOB (Free On Board)',
    'inquiry.form.delivery.exw': 'Ex Works',
    'inquiry.form.delivery.ddp': 'DDP (Delivered Duty Paid)',
    'inquiry.form.delivery.fas': 'FAS (Free Alongside Ship)',
    'inquiry.form.delivery.cfr': 'CFR (Cost and Freight)',
    'inquiry.form.delivery.other': 'Other',
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
    'strengths.quality.desc': 'nos produits proviennent de fournisseurs expérimentés et fiables qui sont présélectionnés par notre équipe de terrain',
    'strengths.reliability.title': 'Fiabilité',
    'strengths.reliability.desc': "nous travaillons avec des partenaires de confiance qui font partie intégrante de notre chaîne d'approvisionnement et qui fournissent une solution de bout en bout avec une transparence à 100%",
    'strengths.partnership.title': 'Partenariat',
    'strengths.partnership.desc': 'Nos partenariats à long terme avec toutes nos parties prenantes reposent sur une confiance et une transparence de longue date',
    'strengths.flexibility.title': 'Solution Personnalisée',
    'strengths.flexibility.desc': "Nous fournissons des solutions d'exportation sur mesure selon les besoins des clients",
    
    // Products
    'products.title': 'Nos Produits',
    'products.description': 'Découvrez notre gamme complète de produits de qualité supérieure, provenant de fournisseurs mondiaux de confiance.',
    'products.viewAll': 'Voir tous les produits',
    'products.viewDetails': 'Voir les détails',
    'products.sugar': 'Sucre',
    'products.sugarDesc': 'ICUMSA 45, ICUMSA 100, ICUMSA 150',
    'products.soy': 'Produits à base de soja',
    'products.soyDesc': 'Soja, farine de soja, huile de soja',
    'products.coffee': 'Café en grains',
    'products.coffeeDesc': 'Robusta et Arabica',
    'produits.café': 'Café Beans',
    'produits.coffeeDesc': 'Robusta & Arabica, etc',
    'produits.viande': 'Produits de viande, Produits de viande',
    'products.meat': 'Produits à base de viande',
    'products.meatDesc': 'Buffalo Meat, Chicken & Cow Ghee, Duc',
    'products.oil': 'Huiles végétales',
    'products.oilDesc': 'CP8, CP10 & Huile d\'olive, huile de soja, huile de tournesol & huile d\'avocat',
    'products.rice': 'Riz',
    'products.riceDesc': 'Basmati, Jasmin & Riz Blanc',
    'products.olive': 'Huile d\'olive',
    'products.urea': 'Urée & Engrais',
    'products.petroleum': 'Produits pétroliers',
    'products.petroleumDesc': 'EN 590, D2, AGO, Jet A1',
    'products.categories.all': 'Tous les produits',
    'products.categories.food': 'Produits alimentaires',
    'products.categories.oils': 'Huiles',
    'products.categories.agri': 'Produits agricoles',
    'products.categories.petro': 'Produits pétroliers',
    'products.requestQuote': 'Demander un devis',
    'products.noProductsFound': 'Aucun produit trouvé',
    'products.noProductsMatching': 'Aucun produit correspondant à "{query}" dans {category}.',
    'products.noProductsInCategory': "Aucun produit n'est disponible dans la catégorie {}.",
    'products.clearFilters': 'Effacer les filtres',
    
    // Product Details
    'product.sugar.title': 'Sucre ICUMSA',
    'product.sugar.description': 'Sucre premium avec différentes qualités ICUMSA du Brésil',
    'product.sugar.detail1': 'ICUMSA 45 (sucre blanc), ICUMSA 100 (sucre brut), ICUMSA 150',
    'product.sugar.detail2': 'Emballage: sacs de 50 kg ou grands sacs',
    'product.sugar.detail3': 'Livraison: CIF, FOB, etc.',
    
    'product.soy.title': 'Produits de Soja',
    'product.soy.description': 'Produits de soja de haute qualité pour diverses applications',
    'product.soy.detail1': 'Graines de soja (sans OGM sur demande), farine de soja, huile de soja',
    'product.soy.detail2': 'Emballage: Selon les exigences du client',
    'product.soy.detail3': 'Livraison: Mondiale, flexible',
    
    'product.coffee.title': 'Grains de Café',
    'product.coffee.description': 'Grains de café Robusta et Arabica de qualité supérieure',
    'product.coffee.detail1': 'Robusta (fort) et Arabica (doux)',
    'product.coffee.detail2': 'Origine: Amérique du Sud, Asie, Afrique',
    'product.coffee.detail3': 'Emballage: sacs de 50 kg ou grands sacs',
    
    'product.beef.title': 'Produits de Bœuf',
    'product.beef.description': 'Bœuf de qualité supérieure d\'Inde',
    'product.beef.detail1': 'Bœuf surgelé, diverses coupes',
    'product.beef.detail2': 'Emballage: Produits surgelés',
    'product.beef.detail3': 'Livraison: Mondiale',
    
    'product.chicken.title': 'Viande de Poulet',
    'product.chicken.description': 'Divers produits de poulet de la plus haute qualité',
    'product.chicken.detail1': 'Poulets entiers, poitrines de poulet, cuisses de poulet, ailes de poulet',
    'product.chicken.detail2': 'Emballage: Produits surgelés',
    'product.chicken.detail3': 'Livraison: Mondiale',
    
    'product.ghee.title': 'Ghee de Bœuf',
    'product.ghee.description': 'Ghee de bœuf pur d\'Inde',
    'product.ghee.detail1': 'Ghee de bœuf 100% pur',
    'product.ghee.detail2': 'Emballage: Boîtes de 1 kg, seaux de 15 kg',
    'product.ghee.detail3': 'Livraison: Mondiale',
    
    'product.vegetable.title': 'Huiles Végétales',
    'product.vegetable.description': 'Huiles végétales de haute qualité CP8 et CP10 d\'Asie',
    'product.vegetable.detail1': 'Huile de palme, différentes tailles d\'emballage',
    'product.vegetable.detail2': 'Livraison: CIF, FOB ou sur arrangement',
    'product.vegetable.detail3': 'Qualité premium pour applications alimentaires et industrielles',
    
    'product.rice.title': 'Variétés de Riz',
    'product.rice.description': 'Variétés de riz premium du monde entier',
    'product.rice.detail1': 'Basmati, jasmin, étuvé, riz blanc',
    'product.rice.detail2': 'Emballage: Sacs de 5 kg, 25 kg ou grands sacs',
    'product.rice.detail3': 'Livraison: CIF, FOB',
    
    'product.olive.title': 'Huile d\'Olive',
    'product.olive.description': 'Huile d\'olive premium de Grèce',
    'product.olive.detail1': 'Huile d\'olive extra vierge, huile d\'olive vierge, huile d\'olive raffinée',
    'product.olive.detail2': 'Emballage: Bouteilles de 1 l, bidons de 5 l, fûts de 200 l',
    'product.olive.detail3': 'Livraison: CIF, FOB',
    
    'product.urea.title': 'Urée & Engrais',
    'product.urea.description': 'Urée et engrais de haute qualité pour usage agricole',
    'product.urea.detail1': 'Urée 46% Granulaire et Prilled',
    'product.urea.detail2': 'Emballage: Sacs de 50 kg ou grands sacs',
    'product.urea.detail3': 'Livraison: Mondiale',
    
    'product.petroleum.title': 'Produits Pétroliers',
    'product.petroleum.description': 'Produits pétroliers premium pour diverses applications',
    'product.petroleum.detail1': 'EN 590, D2, AGO, Jet A1',
    'product.petroleum.detail2': 'Diesel, Carburant Aviation, Carburant Automobile',
    'product.petroleum.detail3': 'Delivery: CIF, FOB',
    
    // About
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Notre mission et nos valeurs',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Fournir des produits de qualité premium grâce à des partenariats transparents et fiables dans le monde entier.',
    'about.services.title': 'Nos prestations',
    'about.services.desc': 'Fournir des produits de qualité avec confiance et transparence dans le monde entier',
    'about.values.title': 'Nos Valeurs',
    'about.values.desc': 'La qualité, la fiabilité, le partenariat et la flexibilité constituent la pierre angulaire de notre philosophie d\'entreprise.',
    'about.experience.title': 'Notre Expérience',
    'about.experience.desc': 'Avec des années d\'expérience dans le commerce international, nous avons établi des partenariats solides et une réputation d\'excellence.',
    'about.team.title': 'Notre équipe de direction',
    'about.team.desc': 'Découvrez les individus exceptionnels qui sont à l\'origine de la vision et du succès de notre entreprise.',

    // Our Mission
    'about.values.value1.title':'Quality Assurance',
    'about.values.value1.desc': 'Fournir des produits agricoles et industriels de haute qualité répondant aux normes mondiales.',
    'about.values.value2.title':'Des partenariats fiables',
    'about.values.value2.desc': 'Construire des relations à long terme avec les clients en assurant une livraison rapide et efficace.',
    'about.values.value3.title':'Commerce durable',
    'about.values.value3.desc': 'Promouvoir des pratiques commerciales durables et éthiques dans toutes nos opérations.',
    'about.values.value4.title':'Engagement client',
    'about.values.value4.desc': 'Assurer la satisfaction du client grâce à des prix compétitifs, une logistique supérieure et un service exceptionnel.',

    // Our Services
    'about.service.service1.title':'Gestion de projet et conseil',
    'about.service.service1.desc': 
    '• Planification, exécution et optimisation de projets \n' +
    '• Analyse des processus et amélioration de lefficacité \n' +
    '• Conseil stratégique et stratégies dentrée sur le marché',
    'about.service.service2.title':'Négoce général et distribution',
    'about.service.service2.desc': 
    '• Importation et exportation de marchandises diverses \n' +
    '• Gestion des achats et de la logistique \n' +
    '• Développement de stratégies commerciales \n',

    // About.Why Choose Us
    'about.whyChooseUs.title': 'Pourquoi nous choisir ?',
    'about.whyChooseUs.title1': 'Assurance qualité supérieure',
    'about.whyChooseUs.reason1': 'Produits de qualité supérieure provenant de fournisseurs de confiance dans le monde entier',
    'about.whyChooseUs.title2': 'Des solutions logistiques sur mesure',
    'about.whyChooseUs.reason2': 'Conditions de livraison flexibles pour répondre à vos besoins spécifiques',
    'about.whyChooseUs.title3': 'Des prix compétitifs et transparents',
    'about.whyChooseUs.reason3': 'Des prix compétitifs et des pratiques commerciales transparentes',
    'about.whyChooseUs.title4': 'Assistance client dédiée',
    'about.whyChooseUs.reason4': 'Service client réactif et support dédié',
    'about.whyChooseUs.title5': 'Expertise mondiale et réseau de confiance',
    'about.whyChooseUs.reason5': 'Des années dexpérience dans le commerce international avec un réseau mondial',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Entrez en contact avec notre équipe',
    'contact.address': 'Adresse',
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah,\nAbu Dhabi,\n\nÉmirats Arabes Unis',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.message': 'Votre Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.whatsapp' : 'WhatsApp',
    'SendUs.title' : 'Envoyez-nous un message',
    'SendUs.desc' :'Vous avez une question ou une demande ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
    'SendUs.button':'Envoyer',
    'SendUs.sending':'Envoi...',
    'SendUS.success':'Message envoyé avec succès !',
    
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
    'inquiry.form.selectProduct': 'Sélectionnez un produit',
    'inquiry.form.quantity': 'Quantité',
    'inquiry.form.delivery': 'Conditions de Livraison',
    'inquiry.form.selectDelivery': 'Sélectionnez les conditions de livraison',
    'inquiry.form.delivery.cif': 'CIF (Coût, Assurance & Fret)',
    'inquiry.form.delivery.fob': 'FOB (Franco à Bord)',
    'inquiry.form.delivery.exw': 'Ex Works (Départ Usine)',
    'inquiry.form.delivery.ddp': 'DDP (Rendu Droits Acquittés)',
    'inquiry.form.delivery.fas': 'FAS (Franco le Long du Navire)',
    'inquiry.form.delivery.cfr': 'CFR (Coût et Fret)',
    'inquiry.form.delivery.other': 'Autre',
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
    'nav.inquiry': 'طلب عرض سعر',
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
    'strengths.quality.desc': 'يتم الحصول على منتجاتنا من الموردين ذوي الخبرة والموثوقين الذين يتم اختيارهم من قبل فريقنا الميداني',
    'strengths.reliability.title': 'الموثوقية',
    'strengths.reliability.desc': 'نحن نعمل مع شركاء موثوق بهم وهم جزء متكامل من سلسلة التوريد الخاصة بنا والذين يقدمون حلاً شاملاً بشفافية ٪  100',
    'strengths.partnership.title': 'الشراكة',
    'strengths.partnership.desc': 'تعتمد شراكاتنا طويلة الأمد مع جميع أصحاب المصلحة لدينا على الثقة والشفافية طويلة الأمد',
    'strengths.flexibility.title': 'المرونة',
    'strengths.flexibility.desc': 'نحن نقدم حلول تصدير مصممة خصيصًا وفقًا لاحتياجات العملاء',
    
    // Products
    'products.title': 'منتجاتنا',
    'products.description': 'اكتشف مجموعتنا الشاملة من المنتجات ذات الجودة المتميزة، التي يتم الحصول عليها من موردين عالميين موثوقين.',
    'products.viewAll': 'عرض جميع المنتجات',
    'products.viewDetails': 'عرض التفاصيل',
    'products.sugar': 'السكر والصويا',
    'products.sugarDesc': 'ICUMSA 45، ICUMSA 100، ICUMSA 150',
    'products.soy': 'منتجات الصويا',
    'products.soyDesc': 'فول الصويا، دقيق الصويا، زيت الصويا',
    'products.coffee': 'حبوب القهوة',
    'products.coffeeDesc': 'روبوستا وأرابيكا',
    'products.meat': 'منتجات اللحوم',
    'products.meatDesc': 'لحم البقر والدجاج وسمن البقر',
    'products.oil': 'الزيوت النباتية',
    'products.oilDesc': 'CP8، CP10 وزيت الزيتون',
    'products.rice': 'الأرز',
    'products.riceDesc': 'بسمتي، ياسمين وأرز أبيض',
    'products.olive': 'زيت الزيتون',
    'products.urea': 'اليوريا والأسمدة',
    'products.petroleum': 'المنتجات البترولية',
    'products.petroleumDesc': 'EN 590، D2، AGO، Jet A1',
    'products.categories.all': 'جميع المنتجات',
    'products.categories.food': 'المنتجات الغذائية',
    'products.categories.oils': 'الزيوت',
    'products.categories.agri': 'المنتجات الزراعية',
    'products.categories.petro': 'المنتجات البترولية',
    'products.requestQuote': 'طلب عرض سعر',
    'products.noProductsFound': 'لم يتم العثور على منتجات',
    'products.noProductsMatching': 'لا توجد منتجات تطابق "{query}" في فئة {category}.',
    'products.noProductsInCategory': 'لا توجد منتجات متاحة في فئة {category}.',
    'products.clearFilters': 'مسح عوامل التصفية',
    
    // Product Details
    'product.sugar.title': 'سكر ICUMSA',
    'product.sugar.description': 'سكر ممتاز بدرجات ICUMSA متنوعة من البرازيل',
    'product.sugar.detail1': 'ICUMSA 45 (سكر أبيض)، ICUMSA 100 (سكر خام)، ICUMSA 150',
    'product.sugar.detail2': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    'product.sugar.detail3': 'التسليم: CIF، FOB، إلخ.',
    
    'product.soy.title': 'منتجات الصويا',
    'product.soy.description': 'منتجات صويا عالية الجودة لمختلف التطبيقات',
    'product.soy.detail1': 'فول الصويا (خالي من المواد المعدلة وراثيًا عند الطلب)، دقيق الصويا، زيت الصويا',
    'product.soy.detail2': 'التعبئة: وفقًا لمتطلبات العميل',
    'product.soy.detail3': 'التسليم: عالمي، مرن',
    
    'product.coffee.title': 'حبوب القهوة',
    'product.coffee.description': 'حبوب قهوة روبوستا وأرابيكا ممتازة',
    'product.coffee.detail1': 'روبوستا (قوية) وأرابيكا (خفيفة)',
    'product.coffee.detail2': 'المنشأ: أمريكا الجنوبية، آسيا، أفريقيا',
    'product.coffee.detail3': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    
    'product.beef.title': 'منتجات اللحم البقري',
    'product.beef.description': 'لحم بقري عالي الجودة من الهند',
    'product.beef.detail1': 'لحم بقري مجمد، قطع متنوعة',
    'product.beef.detail2': 'التعبئة: سلع مجمدة',
    'product.beef.detail3': 'التسليم: عالمي',
    
    'product.chicken.title': 'لحم الدجاج',
    'product.chicken.description': 'منتجات دجاج متنوعة بأعلى جودة',
    'product.chicken.detail1': 'دجاج كامل، صدور دجاج، أفخاذ دجاج، أجنحة دجاج',
    'product.chicken.detail2': 'التعبئة: سلع مجمدة',
    'product.chicken.detail3': 'التسليم: عالمي',
    
    'product.ghee.title': 'سمن بقري',
    'product.ghee.description': 'سمن بقري نقي من الهند',
    'product.ghee.detail1': 'سمن بقري نقي 100%',
    'product.ghee.detail2': 'التعبئة: علب 1 كجم، دلاء 15 كجم',
    'product.ghee.detail3': 'التسليم: عالمي',
    
    'product.vegetable.title': 'زيوت نباتية',
    'product.vegetable.description': 'زيوت نباتية عالية الجودة CP8 و CP10 من آسيا',
    'product.vegetable.detail1': 'زيت النخيل، أحجام تعبئة مختلفة',
    'product.vegetable.detail2': 'التسليم: CIF، FOB أو حسب الترتيب',
    'product.vegetable.detail3': 'جودة ممتازة للتطبيقات الغذائية والصناعية',
    
    'product.rice.title': 'أنواع الأرز',
    'product.rice.description': 'أنواع أرز ممتازة من جميع أنحاء العالم',
    'product.rice.detail1': 'بسمتي، ياسمين، مسلوق، أرز أبيض',
    'product.rice.detail2': 'التعبئة: أكياس 5 كجم، 25 كجم أو أكياس كبيرة',
    'product.rice.detail3': 'التسليم: CIF، FOB',
    
    'product.olive.title': 'زيت الزيتون',
    'product.olive.description': 'زيت زيتون ممتاز من اليونان',
    'product.olive.detail1': 'زيت زيتون بكر ممتاز، زيت زيتون بكر، زيت زيتون مكرر',
    'product.olive.detail2': 'التعبئة: زجاجات 1 لتر، علب 5 لتر، براميل 200 لتر',
    'product.olive.detail3': 'التسليم: CIF، FOB',
    
    'product.urea.title': 'اليوريا والأسمدة',
    'product.urea.description': 'يوريا وأسمدة عالية الجودة للاستخدام الزراعي',
    'product.urea.detail1': 'يوريا 46% حبيبية ومحببة',
    'product.urea.detail2': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    'product.urea.detail3': 'التسليم: عالمي',
    
    'product.petroleum.title': 'المنتجات البترولية',
    'product.petroleum.description': 'منتجات بترولية ممتازة لمختلف التطبيقات',
    'product.petroleum.detail1': 'EN 590، D2، AGO، Jet A1',
    'product.petroleum.detail2': 'ديزل، وقود طيران، وقود سيارات',
    'product.petroleum.detail3': 'التسليم: CIF، FOB',
    
    // About
    'about.title': 'اتصال',
    'about.subtitle': 'مهمتنا وقيمنا',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'توفير منتجات عالية الجودة من خلال شراكات شفافة وموثوقة في جميع أنحاء العالم.',
    'about.services.title': 'خدماتنا',
    'about.services.desc': 'توفير منتجات عالية الجودة مع الثقة والشفافية في جميع أنحاء العالم',
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

    // Our Services
    'about.service.service1.title':'إدارة المشاريع والاستشارات',
    'about.service.service1.desc': 
    'التخطيط والتنفيذ وتحسين المشاريع •\n' +
    'تحليل العمليات وتحسين الكفاءة •\n' +
    'الاستشارات الاستراتيجية واستراتيجيات دخول السوق •',
    'about.service.service2.title':'التجارة العامة والتوزيع',
    'about.service.service2.desc': 
    'استيراد وتصدير مختلف السلع •\n' +
    'إدارة المشتريات والخدمات اللوجستية •\n' +
    'تطوير استراتيجيات التجارة •\n',
      
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
    'contact.address_main':'أبراج الخالدية، طابق الميزانين،\nشارع الفسكر W10،\nالبطين، الخالدية،\nأبوظبي،\n\nالإمارات العربية المتحدة',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.whatsapp' : 'واتساب',     
    'SendUs.title' : 'أرسل لنا رسالة',
    'SendUs.desc' :'هل لديك سؤال أو استفسار؟ املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.',
    'SendUs.button':'يرسل',
    'SendUs.sending':'إرسال...',
    'SendUS.success':'تم إرسال الرسالة بنجاح!',

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
    'inquiry.form.selectProduct': 'اختر منتجًا',
    'inquiry.form.quantity': 'الكمية',
    'inquiry.form.delivery': 'شروط التسليم',
    'inquiry.form.selectDelivery': 'اختر شروط التسليم',
    'inquiry.form.delivery.cif': 'CIF (التكلفة والتأمين والشحن)',
    'inquiry.form.delivery.fob': 'FOB (تسليم على ظهر السفينة)',
    'inquiry.form.delivery.exw': 'Ex Works (تسليم من المصنع)',
    'inquiry.form.delivery.ddp': 'DDP (تسليم خالص الرسوم)',
    'inquiry.form.delivery.fas': 'FAS (تسليم بجانب السفينة)',
    'inquiry.form.delivery.cfr': 'CFR (التكلفة والشحن)',
    'inquiry.form.delivery.other': 'أخرى',
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
