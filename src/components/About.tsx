import { useI18n } from '../utils/i18n';

const About = () => {
  const { t } = useI18n();

  {/* Mission Section */}
  <div className="w-full bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          To empower businesses with cutting-edge technology solutions that drive growth and innovation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We constantly push the boundaries of technology to deliver innovative solutions that give our clients a competitive edge.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our commitment to excellence drives us to deliver the highest quality solutions and services to our clients.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Team Section */}
  <div className="w-full bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {t('about.team.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('about.team.desc')}
        </p>
      </div>
      {/* Team members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Team member cards */}
      </div>
    </div>
  </div>

  {/* Partners Section */}
  <div className="w-full bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {t('about.partners.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
          {t('about.partners.desc')}
        </p>
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">
          {t('about.partners.subtitle')}
        </h3>
      </div>

      {/* Partners Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex space-x-6 transition-transform duration-500 ease-in-out" id="partners-carousel">
            {/* European Representation */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.europe')}</h4>
              <p className="text-gray-800 font-medium mb-2">International Foodstuff Supplier SL</p>
              <p className="text-gray-600 mb-1">Mr. Moreno & Nunoz</p>
              <p className="text-gray-600">Madrid, Spain</p>
            </div>

            {/* West Africa Distribution */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.westAfrica')}</h4>
              <p className="text-gray-800 font-medium mb-2">Soufa Global Business Import Export</p>
              <p className="text-gray-600 mb-1">Mr. Abdourahmane Diallo</p>
              <p className="text-gray-600">Dakar, Senegal</p>
            </div>

            {/* Mali Distribution */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.mali')}</h4>
              <p className="text-gray-800 font-medium mb-2">Fatoumata Haidara Negoce-Services</p>
              <p className="text-gray-600 mb-1">Mrs. Fatoumata Haidara</p>
              <p className="text-gray-600">Bamako, Mali</p>
            </div>

            {/* East Africa Distribution */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.eastAfrica')}</h4>
              <p className="text-gray-800 font-medium mb-2">Al-wabil Al-saieb Trading</p>
              <p className="text-gray-600 mb-1">Mr. Abdelsalam Mekki A. Yahya</p>
              <p className="text-gray-600">Khartoum, Soudan</p>
            </div>

            {/* Asia Representation */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.asia')}</h4>
              <p className="text-gray-800 font-medium mb-2">Saatvik Foods Ltd</p>
              <p className="text-gray-600 mb-1">Mrs. Aditi More</p>
              <p className="text-gray-600">Mumbai, India</p>
            </div>

            {/* India Foodstuff and Fruits */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.india')}</h4>
              <p className="text-gray-800 font-medium mb-2">Schi Traders Ltd</p>
              <p className="text-gray-600 mb-1">Mr. Kakasaheb Chavan</p>
              <p className="text-gray-600">Mumbai, India</p>
              <p className="text-gray-600">Osmanabad, India</p>
            </div>

            {/* Latin America Representation */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.latinAmerica')}</h4>
              <p className="text-gray-800 font-medium mb-2">Roodan do Brasil</p>
              <p className="text-gray-600 mb-1">Mr. Vicenzo Lauria</p>
              <p className="text-gray-600">Vitória da Conquista – Bahia, Brazil</p>
            </div>

            {/* Logistics Partner */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.logistics')}</h4>
              <p className="text-gray-800 font-medium mb-2">United Global Logistic</p>
              <p className="text-gray-600 mb-1">Mr. Mo Khan</p>
              <p className="text-gray-600 mb-1">New York, USA</p>
              <a href="https://www.unitedgloball.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                www.unitedgloball.com
              </a>
            </div>

            {/* UAE Partners */}
            <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('about.partners.uae')}</h4>
              <p className="text-gray-800 font-medium mb-2">Buttner Coffee Trading LLC</p>
              <p className="text-gray-600 mb-1">Mr. Sebastian Buttner</p>
              <p className="text-gray-600 mb-4">Dubai, UAE</p>
              <p className="text-gray-800 font-medium mb-2">Wealth Capital Global Trading LLC</p>
              <p className="text-gray-600 mb-1">Mr. Salim Khaleleyal</p>
              <p className="text-gray-600">Deria, UAE</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition-colors duration-200"
          onClick={() => {
            const carousel = document.getElementById('partners-carousel');
            if (carousel) {
              carousel.scrollBy({ left: -320, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition-colors duration-200"
          onClick={() => {
            const carousel = document.getElementById('partners-carousel');
            if (carousel) {
              carousel.scrollBy({ left: 320, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div> 
} 