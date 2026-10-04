/**
 * Kotwari International Ltd. — Universal Multilingual System (kotwari-lang.js)
 * Enables seamless, persistent language switching across all pages (English, Hindi, Arabic).
 * Works offline, on local file:/// protocol, and online with full RTL support and Glass Dropdowns.
 */
(function() {
  'use strict';

  // Comprehensive Multilingual Translation Dictionary
  const DICT = {
    // Brand & Global
    "Gao Se Global Tak": { hi: "गांव से ग्लोबल तक", ar: "من القرية إلى العالم" },
    "Gao Se Global Tak.": { hi: "गांव से ग्लोबल तक।", ar: "من القرية إلى العالم." },
    "Kotwari": { hi: "कोटवारी", ar: "كوتواري" },
    "Kotwari International Ltd.": { hi: "कोटवारी इंटरनेशनल लिमिटेड", ar: "شركة كوتواري الدولية المحدودة" },
    "Rooted in Villages · Connecting to the World": { hi: "गांवों से जुड़े · दुनिया को जोड़ते", ar: "متجذرون في القرى · متصلون بالعالم" },
    "Official Export Division": { hi: "आधिकारिक निर्यात प्रभाग", ar: "قسم التصدير الرسمي" },
    "Village Sourcing": { hi: "ग्रामीण स्रोत", ar: "التوريد القروي" },
    "Integrated Processing": { hi: "एकीकृत प्रसंस्करण", ar: "المعالجة المتكاملة" },
    "Audio Story": { hi: "ऑडियो कहानी", ar: "قصة صوتية" },
    "Menu": { hi: "मेनू", ar: "القائمة" },
    "Close": { hi: "बंद करें", ar: "إغلاق" },
    "Back to top": { hi: "शीर्ष पर जाएं", ar: "العودة إلى الأعلى" },
    "All rights reserved.": { hi: "सर्वाधिकार सुरक्षित।", ar: "جميع الحقوق محفوظة." },

    // Primary Navigation Items
    "Home": { hi: "होम", ar: "الرئيسية" },
    "Collection": { hi: "कलेक्शन", ar: "المجموعات" },
    "Businesses": { hi: "व्यवसाय", ar: "الأعمال" },
    "Ecosystem": { hi: "हमारा नेटवर्क", ar: "منظومتना" },
    "Products": { hi: "उत्पाद", ar: "المنتجات" },
    "Contact": { hi: "संपर्क", ar: "اتصل بنا" },
    "Farmers & FPO": { hi: "किसान और FPO", ar: "المزارعون والمنظمات" },
    "Partner with Kotwari": { hi: "Kotwari से जुड़ें", ar: "كن شريكاً لكوتواري" },
    "Partner With Kotwari": { hi: "Kotwari से जुड़ें", ar: "كن شريكاً لكوتواري" },
    "Partner With Kotwari ↗": { hi: "Kotwari से जुड़ें ↗", ar: "كن شريكاً لكوتواري ↖" },
    "Contact Us": { hi: "संपर्क करें", ar: "اتصل بنا" },
    "Contact Us →": { hi: "संपर्क करें →", ar: "اتصل بنا ←" },
    "About Us": { hi: "हमारे बारे में", ar: "من نحن" },

    // Secondary & Hub Navigation
    "Vision & Mission": { hi: "दृष्टि और मिशन", ar: "الرؤية والرسالة" },
    "Chairman's Message": { hi: "अध्यक्ष का संदेश", ar: "رسالة رئيس مجلس الإدارة" },
    "Core Philosophy": { hi: "मूल दर्शन", ar: "فلسفتنا الأساسية" },
    "Core Values": { hi: "मूल मूल्य", ar: "قيمنا الجوهرية" },
    "Dairy Range": { hi: "डेयरी उत्पाद", ar: "منتجات الألبان" },
    "Milk Sourcing": { hi: "दूध संग्रह", ar: "توريد الحليب" },
    "Quality & Chilling": { hi: "गुणवत्ता और शीतलन", ar: "الجودة والتبريد" },
    "Spices": { hi: "मसाले", ar: "التوابل" },
    "Staples & Sattu": { hi: "अनाज और सत्तू", ar: "الحبوب والساتو" },
    "Snacks & Dry Fruits": { hi: "स्नैक्स और सूखे मेवे", ar: "المقرمشات والمكسرات" },
    "Beverages": { hi: "पेय पदार्थ", ar: "المشروبات" },
    "Wood Pressed Oils": { hi: "कोल्हू का शुद्ध तेल", ar: "الزيوت المعصورة على البارد" },
    "Farmer Support": { hi: "किसान सहायता", ar: "دعم المزارعين" },
    "Supply Chain Model": { hi: "आपूर्ति श्रृंखला मॉडल", ar: "نموذج سلاسل الإمداد" },
    "Farmer ID System": { hi: "किसान पहचान प्रणाली", ar: "نظام هوية المزارع" },
    "Digital Modules": { hi: "डिजिटल मॉड्यूल", ar: "الوحدات الرقمية" },
    "FPO Network": { hi: "एफपीओ नेटवर्क", ar: "شبكة منظمات المنتجين" },
    "Featured FPO": { hi: "प्रमुख एफपीओ", ar: "منظمات المنتجين المميزة" },
    "FPO Verticals": { hi: "एफपीओ क्षेत्र", ar: "قطاعات منظمات المنتجين" },
    "Aggregation Model": { hi: "संग्रह मॉडल", ar: "نموذج التجميع" },
    "Kotwari One": { hi: "कोटवारी वन", ar: "كوتواري ون" },
    "Protein Breakfast Point": { hi: "प्रोटीन ब्रेकफास्ट पॉइंट", ar: "نقاط إفطار البروتين" },
    "Protein Breakfast Points": { hi: "प्रोटीन ब्रेकफास्ट पॉइंट", ar: "نقاط إفطار البروتين" },
    "Franchise Terms": { hi: "फ्रैंचाइज़ी शर्तें", ar: "شروط الامتياز التجاري" },
    "Eggs": { hi: "अंडे", ar: "البيض" },
    "KooA Water": { hi: "KooA मिनरल वाटर", ar: "مياه كوا المعدنية" },
    "Kotwari Global": { hi: "कोटवारी ग्लोबल", ar: "كوتواري العالمية" },
    "Trade Enquiry": { hi: "व्यापार पूछताछ", ar: "استفسار تجاري" },
    "Trade Enquiry ↗": { hi: "व्यापार पूछताछ ↗", ar: "استفسار تجاري ↖" },
    "Trade Enquiry →": { hi: "व्यापार पूछताछ →", ar: "استفسار تجاري ←" },
    "Order Inquiry ↗": { hi: "ऑर्डर पूछताछ ↗", ar: "طلب استفسار ↖" },
    "Order Inquiry": { hi: "ऑर्डर पूछताछ", ar: "طلب استفسار" },
    "FMCG": { hi: "FMCG खाद्य", ar: "السلع الاستهلاكية" },
    "Dairy": { hi: "डेयरी", ar: "الألبان" },
    "Water": { hi: "जल", ar: "المياه" },
    "Exports": { hi: "निर्यात", ar: "التصدير" },
    "Retail": { hi: "रिटेल", ar: "التجزئة" },
    "Sustainability": { hi: "स्थिरता व पर्यावरण", ar: "الاستدامة والبيئة" },
    "Investors": { hi: "निवेशक", ar: "المستثمرون" },
    "Careers": { hi: "करियर", ar: "الوظائف" },
    "Partners": { hi: "साझेदार", ar: "الشركاء" },

    // CTAs & Buttons
    "Explore Export Catalog ↓": { hi: "निर्यात कैटलॉग देखें ↓", ar: "استكشف كتالوج التصدير ↓" },
    "Explore Export Catalog": { hi: "निर्यात कैटलॉग देखें", ar: "استكشف كتالوج التصدير" },
    "Start Trade Enquiry ↗": { hi: "व्यापार पूछताछ शुरू करें ↗", ar: "ابدأ استفسار التجارة ↖" },
    "Start Trade Enquiry": { hi: "व्यापार पूछताछ शुरू करें", ar: "ابدأ استفسار التجارة" },
    "Explore Store Formats →": { hi: "स्टोर प्रारूप देखें →", ar: "استكشف أشكال المتاجر ←" },
    "How We Support Farmers →": { hi: "हम किसानों की सहायता कैसे करते हैं →", ar: "كيف ندعم المزارعين ←" },
    "FPO Partnership WhatsApp →": { hi: "FPO साझेदारी व्हाट्सएप →", ar: "واتساب شراكة منظمات المنتجين ←" },
    "Farmer Helpdesk WhatsApp →": { hi: "किसान हेल्पडेस्क व्हाट्सएप →", ar: "واتساب مساعدة المزارعين ←" },
    "Dairy Trade WhatsApp →": { hi: "डेयरी ट्रेड व्हाट्सएप →", ar: "واتساب تجارة الألبان ←" },
    "B2B FMCG WhatsApp →": { hi: "B2B FMCG व्हाट्सएप →", ar: "واتساب تجارة السلع الاستهلاكية ←" },
    "Retail Franchise WhatsApp →": { hi: "रिटेल फ्रैंचाइज़ी व्हाट्सएप →", ar: "واتساب الامتياز التجاري ←" },
    "Corporate Desk WhatsApp →": { hi: "कॉर्पोरेट डेस्क व्हाट्सएप →", ar: "واتساب المكتب التجاري ←" },
    "WhatsApp Helpdesk →": { hi: "व्हाट्सएप सहायता केंद्र →", ar: "مكتب مساعدة واتساب ←" },
    "Send Message →": { hi: "संदेश भेजें →", ar: "إرسال الرسالة ←" },
    "Submit Trade Enquiry": { hi: "व्यापार पूछताछ भेजें", ar: "إرسال الاستفسار التجاري" },
    "Explore Kotwari ↗": { hi: "कोटवारी को जानें ↗", ar: "استكشف كوتواري ↖" },
    "Join our network": { hi: "हमारे नेटवर्क से जुड़ें", ar: "انضم إلى شبكتنا" },

    // Page Eyebrows & Headings
    "From Indian Villages to Global Markets.": { hi: "भारतीय गांवों से वैश्विक बाजारों तक।", ar: "من القرى الهندية إلى الأسواق العالمية." },
    "From Indian Villages": { hi: "भारतीय गांवों से", ar: "من القرى الهندية" },
    "to Global Markets.": { hi: "वैश्विक बाजारों तक।", ar: "إلى الأسواق العالمية." },
    "Business 05 · Kotwari Global Trade Division": { hi: "व्यवसाय 05 · कोटवारी ग्लोबल ट्रेड डिवीज़न", ar: "العمل 05 · قسم التجارة الدولية لكوتواري" },
    "Target Expansion Corridors": { hi: "लक्षित विस्तार गलियारे", ar: "مسارات التوسع المستهدفة" },
    "Active Export Corridors & Port Terminals": { hi: "सक्रिय निर्यात गलियारे और बंदरगाह", ar: "مسارات التصدير النشطة وموانئ الشحن" },
    "UAE, Saudi Arabia & GCC": { hi: "यूएई, सऊदी अरब और जीसीसी", ar: "الإمارات، السعودية ودول الخليج" },
    "South & Southeast Asia": { hi: "दक्षिण और दक्षिण-पूर्व एशिया", ar: "جنوب وجنوب شرق آسيا" },
    "Africa & International Diaspora": { hi: "अफ्रीका और प्रवासी भारतीय समुदाय", ar: "أفريقيا والمغتربون حول العالم" },
    "Export Catalog & Specifications": { hi: "निर्यात कैटलॉग और विनिर्देश", ar: "كتالوج التصدير والمواصفات الفنية" },
    "End-to-End Export Assurance": { hi: "संपूर्ण निर्यात गुणवत्ता आश्वासन", ar: "ضمان جودة التصدير المتكامل" },
    "Interactive Trade Planning Tool": { hi: "इंटरैक्टिव व्यापार योजना उपकरण", ar: "أداة التخطيط التجاري التفاعلية" },

    "Pure Milk from India's Villages. Everyday Goodness for All.": { hi: "भारतीय गांवों का शुद्ध दूध। सभी के लिए दैनिक पोषण।", ar: "حليب نقي من قرى الهند. خير يومي للجميع." },
    "Pure Milk from India's Villages.": { hi: "भारतीय गांवों का शुद्ध दूध।", ar: "حليب نقي من قرى الهند." },
    "Everyday Goodness for All.": { hi: "सभी के लिए दैनिक पोषण।", ar: "خير يومي للجميع." },
    "Good Food · Everyday Essentials · Farm Direct": { hi: "उत्तम भोजन · दैनिक आवश्यकताएं · सीधे खेत से", ar: "طعام صحي · أساسيات يومية · من المزرعة مباشرة" },
    "Pure Village Nutrition. Global Standards of Trust.": { hi: "शुद्ध ग्रामीण पोषण। विश्वास के वैश्विक मानक।", ar: "تغذية قروية نقية. معايير عالمية للثقة." },
    "Pure Village Nutrition.": { hi: "शुद्ध ग्रामीण पोषण।", ar: "تغذية قروية نقية." },
    "Global Standards of Trust.": { hi: "विश्वास के वैश्विक मानक।", ar: "معايير عالمية للثقة." },

    "Modern Retail Rooted in Indian Villages.": { hi: "भारतीय गांवों में निहित आधुनिक रिटेल।", ar: "تجزئة حديثة متجذرة في القرى الهندية." },
    "Modern Retail Rooted in Indian Villages. Kotwari One.": { hi: "भारतीय गांवों में निहित आधुनिक रिटेल। कोटवारी वन।", ar: "تجزئة حديثة متجذرة في القرى الهندية. كوتواري ون." },
    "Direct From Village Farms to Neighbourhood Shelves": { hi: "गांवों के खेतों से सीधे आस-पड़ोस की दुकानों तक", ar: "مباشرة من مزارع القرى إلى أرفف المتاجر" },

    "Prosperity Begins at the Roots. India's Farmers, Empowered.": { hi: "समृद्धि जड़ों से शुरू होती है। सशक्त भारतीय किसान।", ar: "الازدهار يبدأ من الجذور. تمكين مزارعي الهند." },
    "Prosperity Begins at the Roots.": { hi: "समृद्धि जड़ों से शुरू होती है।", ar: "الازدهار يبدأ من الجذور." },
    "India's Farmers, Empowered.": { hi: "सशक्त भारतीय किसान।", ar: "تمكين مزارعي الهند." },
    "The Foundation of Kotwari · Farmer to Global": { hi: "कोटवारी की नींव · किसान से वैश्विक तक", ar: "أساس كوتواري · من المزارع إلى العالم" },

    "Village Producer Groups. Global Market Scale.": { hi: "ग्रामीण उत्पादक समूह। वैश्विक बाजार का पैमाना।", ar: "مجموعات المنتجين القرويين. على نطاق الأسواق العالمية." },
    "Village Producer Groups.": { hi: "ग्रामीण उत्पादक समूह।", ar: "مجموعات المنتجين القرويين." },
    "Global Market Scale.": { hi: "वैश्विक बाजार का पैमाना।", ar: "على نطاق الأسواق العالمية." },
    "Aggregating India's Agricultural Might": { hi: "भारत की कृषि शक्ति का एकत्रीकरण", ar: "تجميع القوة الزراعية الهندية" },

    "Building Prosperity From India's Villages.": { hi: "भारत के गांवों से समृद्धि का निर्माण।", ar: "بناء الازدهار من القرى الهندية." },
    "Building Prosperity From": { hi: "समृद्धि का निर्माण", ar: "بناء الازدهار من" },
    "India's Villages.": { hi: "भारत के गांवों से।", ar: "القرى الهندية." },
    "The Kotwari Story · Gao Se Global Tak": { hi: "कोटवारी की कहानी · गांव से ग्लोबल तक", ar: "قصة كوتواري · من القرية إلى العالم" },

    "One Ecosystem. Endless Opportunities. Partner With Kotwari.": { hi: "एक साझा इकोसिस्टम। असीम अवसर। कोटवारी के साथ जुड़ें।", ar: "منظومة واحدة. فرص لا حصر لها. كن شريكاً لكوتواري." },
    "One Ecosystem. Endless Opportunities.": { hi: "एक साझा इकोसिस्टम। असीम अवसर।", ar: "منظومة واحدة. فرص لا حصر لها." },
    "Partner With Kotwari.": { hi: "कोटवारी के साथ जुड़ें।", ar: "كن شريكاً لكوتواري." },
    "Collaboration Across the Entire Value Chain": { hi: "संपूर्ण मूल्य श्रृंखला में सहयोग", ar: "التعاون عبر كامل سلسلة القيمة" },

    "Connecting You Directly to the Kotwari Leadership Team": { hi: "आपको सीधे कोटवारी नेतृत्व टीम से जोड़ना", ar: "ربطكم مباشرة بفريق القيادة في كوتواري" },
    "Get in Touch With Kotwari International": { hi: "कोटवारी इंटरनेशनल से संपर्क करें", ar: "تواصل مع كوتواري الدولية" },
    "Corporate Headquarters": { hi: "कॉर्पोरेट मुख्यालय", ar: "المقر الرئيسي للشركة" },
    "Farmer Helpdesk": { hi: "किसान सहायता केंद्र", ar: "مكتب مساعدة المزارعين" },
    "B2B Trade & Exports": { hi: "B2B व्यापार और निर्यात", ar: "التجارة بين الشركات والتصدير" },

    // Product Showcase Details
    "100% Pure Deshi": { hi: "100% शुद्ध देसी", ar: "100% بلدي خالص" },
    "Halal Certified": { hi: "हलाल प्रमाणित", ar: "معتمد حلال" },
    "Click to zoom": { hi: "बड़ा देखने के लिए क्लिक करें", ar: "انقر للتكبير" },
    "Available Pack Sizes & Formats": { hi: "उपलब्ध पैक आकार और प्रारूप", ar: "الأحجام والعبوات المتاحة" },
    "Brand": { hi: "ब्रांड", ar: "العلامة التجارية" },
    "Origin": { hi: "मूल स्थान", ar: "المنشأ" },
    "Packaging": { hi: "पैकेजिंग", ar: "التعبئة والتغليف" },
    "Shelf Life": { hi: "शेल्फ लाइफ", ar: "مدة الصلاحية" },
    "Storage": { hi: "भंडारण", ar: "طريقة التخزين" },
    "Certification": { hi: "प्रमाणीकरण", ar: "الشهادات" },
    "Tamper-Evident Food-Grade Tub / Tin": { hi: "सीलबंद फूड-ग्रेड टब / टिन", ar: "عبوة آمنة ومحكمة ومطابقة للمعايير الغذائية" },
    "9 Months from Packaging": { hi: "पैकेजिंग से 9 महीने", ar: "9 أشهر من تاريخ التعبئة" },
    "Store in a cool, dry place. No refrigeration required.": { hi: "ठंडी और सूखी जगह पर रखें। फ्रिज की आवश्यकता नहीं।", ar: "يحفظ في مكان بارد وجاف، لا يتطلب تبريداً." },
    "Agmark / FSSAI Certified": { hi: "एगमार्क / एफएसएसएआई प्रमाणित", ar: "معتمد من Agmark و FSSAI" },

    // Forms
    "Full Name": { hi: "पूरा नाम", ar: "الاسم الكامل" },
    "Mobile / WhatsApp": { hi: "मोबाइल / व्हाट्सएप", ar: "الجوال / واتساب" },
    "Email Address": { hi: "ईमेल पता", ar: "البريد الإلكتروني" },
    "City, State / Country": { hi: "शहर, राज्य / देश", ar: "المدينة، الدولة" },
    "Your Message / Trade Requirement": { hi: "आपका संदेश / व्यापार आवश्यकता", ar: "رسالتكم / متطلباتكم التجارية" },
    "Send Message": { hi: "संदेश भेजें", ar: "إرسال الرسالة" },
    "Privacy": { hi: "गोपनीयता नीति", ar: "الخصوصية" },
    "Terms": { hi: "नियम व शर्तें", ar: "الشروط والأحكام" },
    "Cookies": { hi: "कुकी नीति", ar: "ملفات تعريف الارتباط" }
  };

  // Helper functions
  function getStoredLang() {
    try {
      const p = new URLSearchParams(window.location.search);
      const urlLang = p.get('lang');
      if (['en', 'hi', 'ar'].includes(urlLang)) return urlLang;
      const stored = localStorage.getItem('kotwari_lang');
      if (['en', 'hi', 'ar'].includes(stored)) return stored;
      const cookieMatch = document.cookie.match(/(?:^|;\s*)kotwari_lang=([^;]+)/);
      if (cookieMatch && ['en', 'hi', 'ar'].includes(cookieMatch[1])) return cookieMatch[1];
    } catch (e) {}
    return 'en';
  }

  function setStoredLang(lang) {
    if (!['en', 'hi', 'ar'].includes(lang)) lang = 'en';
    try {
      localStorage.setItem('kotwari_lang', lang);
      document.cookie = 'kotwari_lang=' + lang + ';path=/;max-age=31536000';
      document.cookie = 'googtrans=/en/' + lang + ';path=/;max-age=31536000';
    } catch (e) {}
  }

  // Rewrite internal page links so they carry ?lang=
  function syncInternalLinks(lang) {
    try {
      const links = document.querySelectorAll('a[href]');
      links.forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.startsWith('#')) {
          return;
        }
        // Match .html or plain page links
        if (href.includes('.html') || (!href.includes('?') && !href.startsWith('#'))) {
          try {
            const parts = href.split('#');
            const base = parts[0];
            const hash = parts[1] ? '#' + parts[1] : '';
            
            const qParts = base.split('?');
            const page = qParts[0];
            const params = new URLSearchParams(qParts[1] || '');
            
            if (lang === 'en') {
              params.delete('lang');
            } else {
              params.set('lang', lang);
            }
            
            const qs = params.toString();
            const newHref = page + (qs ? '?' + qs : '') + hash;
            a.setAttribute('href', newHref);
          } catch (e) {}
        }
      });
    } catch (e) {}
  }

  function getTranslation(raw, lang) {
    if (!raw || !lang || lang === 'en') return null;
    if (DICT[raw] && DICT[raw][lang]) return DICT[raw][lang];

    let clean = raw;
    let prefix = '';
    let suffix = '';

    if (clean.startsWith('⌂ ')) {
      prefix = '⌂ ';
      clean = clean.slice(2).trim();
    }
    if (clean.endsWith(' ↗')) {
      suffix = (lang === 'ar' ? ' ↖' : ' ↗');
      clean = clean.slice(0, -2).trim();
    } else if (clean.endsWith(' →') || clean.endsWith(' &rarr;')) {
      suffix = (lang === 'ar' ? ' ←' : ' →');
      clean = clean.slice(0, -2).trim();
    } else if (clean.endsWith(' ↓') || clean.endsWith(' &darr;')) {
      suffix = ' ↓';
      clean = clean.slice(0, -2).trim();
    }

    if (DICT[clean] && DICT[clean][lang]) {
      return prefix + DICT[clean][lang] + suffix;
    }
    return null;
  }

  // Translate page DOM nodes based on active language
  function translateDOM(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // 1. Always restore cached originals first so we start from clean English
    document.querySelectorAll('[data-orig-text]').forEach(el => {
      el.textContent = el.getAttribute('data-orig-text');
    });
    document.querySelectorAll('[data-orig-html]').forEach(el => {
      el.innerHTML = el.getAttribute('data-orig-html');
    });
    document.querySelectorAll('[data-orig-placeholder]').forEach(el => {
      el.setAttribute('placeholder', el.getAttribute('data-orig-placeholder'));
    });
    document.querySelectorAll('*').forEach(el => {
      el.childNodes.forEach(child => {
        if (child.nodeType === 3 && child.__kotwariOrig) {
          child.textContent = child.__kotwariOrig;
        }
      });
    });

    if (lang === 'en') {
      return;
    }

    // Traverse elements and apply dictionary translations
    const targets = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, button, th, td, label, small, b, strong, em, li');
    targets.forEach(el => {
      // Skip script, style, language dropdown itself
      if (el.closest('#language') || el.closest('.custom-glass-dropdown') || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;

      // Handle child text nodes directly to preserve inline icons (like emojis or SVGs)
      let translatedChild = false;
      el.childNodes.forEach(child => {
        if (child.nodeType === 3) { // TEXT_NODE
          const raw = child.textContent.trim();
          const tr = getTranslation(raw, lang);
          if (tr) {
            if (!child.__kotwariOrig) child.__kotwariOrig = child.textContent;
            const lead = child.textContent.match(/^\s*/)[0];
            const trail = child.textContent.match(/\s*$/)[0];
            child.textContent = lead + tr + trail;
            translatedChild = true;
          }
        }
      });
      if (translatedChild) return;

      // Leaf elements with direct text matching
      if (el.children.length === 0) {
        const rawText = el.textContent.trim();
        const tr = getTranslation(rawText, lang);
        if (tr) {
          if (!el.hasAttribute('data-orig-text')) {
            el.setAttribute('data-orig-text', el.textContent);
          }
          const lead = el.textContent.match(/^\s*/)[0];
          const trail = el.textContent.match(/\s*$/)[0];
          el.textContent = lead + tr + trail;
          return;
        }

        // Phrase substitutions for compound text
        for (const [key, trans] of Object.entries(DICT)) {
          if (key.length > 5 && el.textContent.includes(key)) {
            if (!el.hasAttribute('data-orig-text')) {
              el.setAttribute('data-orig-text', el.textContent);
            }
            el.textContent = el.textContent.split(key).join(trans[lang]);
          }
        }
      } else {
        // InnerHTML matching for formatted headings (e.g. <h1>From Indian Villages<br><em>to Global Markets.</em></h1>)
        const cleanHtml = el.innerHTML.trim();
        if (cleanHtml && DICT[cleanHtml] && DICT[cleanHtml][lang]) {
          if (!el.hasAttribute('data-orig-html')) {
            el.setAttribute('data-orig-html', cleanHtml);
          }
          el.innerHTML = DICT[cleanHtml][lang];
        }
      }
    });

    // Translate inputs & placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const ph = el.getAttribute('placeholder');
      const tr = getTranslation(ph, lang);
      if (tr) {
        if (!el.hasAttribute('data-orig-placeholder')) {
          el.setAttribute('data-orig-placeholder', ph);
        }
        el.setAttribute('placeholder', tr);
      }
    });
  }

  // Ensure language selector is present in header
  function ensureHeaderSelector(lang) {
    let select = document.getElementById('language');
    if (!select) {
      const wrap = document.createElement('div');
      wrap.className = 'kotwari-lang-wrap';
      wrap.style.cssText = 'display:inline-flex;align-items:center;margin-inline-start:auto;margin-inline-end:10px;z-index:90;';
      wrap.innerHTML = `
        <select class="lang" id="language" aria-label="Language / भाषा / اللغة">
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="ar">العربية</option>
        </select>
      `;

      // Safe insertion before menuToggle or directly in header container
      const menuToggle = document.querySelector('.mobile-nav-toggle, #menuToggle, .menu, .menu-btn');
      if (menuToggle && menuToggle.parentNode) {
        menuToggle.parentNode.insertBefore(wrap, menuToggle);
      } else {
        const headerRow = document.querySelector('header .header-row, header .header-inner, header .wrap, header');
        if (headerRow) {
          headerRow.appendChild(wrap);
        }
      }
      select = document.getElementById('language');
    }

    if (select) {
      select.value = lang;
      
      // Wire change listener once
      if (!select.dataset.kotwariWired) {
        select.dataset.kotwariWired = 'true';
        select.addEventListener('change', function(e) {
          KotwariI18n.setLanguage(e.target.value);
        });
      }

      // Enhance with frosted glass dropdown
      if (window.enhanceAllGlassSelects) {
        window.enhanceAllGlassSelects();
      }
    }
  }

  // Main Public API
  window.KotwariI18n = {
    getLanguage: getStoredLang,
    
    setLanguage: function(lang) {
      if (!['en', 'hi', 'ar'].includes(lang)) lang = 'en';
      setStoredLang(lang);
      
      // If on index.html with native render()
      if (typeof window.language !== 'undefined' && typeof window.render === 'function') {
        window.language = lang;
        try { window.render(); } catch (e) {}
      } else {
        translateDOM(lang);
      }

      // Sync select value
      const select = document.getElementById('language');
      if (select && select.value !== lang) {
        select.value = lang;
        if (window.enhanceAllGlassSelects) window.enhanceAllGlassSelects();
      }

      // Sync outgoing links
      syncInternalLinks(lang);

      // Update URL query string without page reload
      try {
        const url = new URL(window.location.href);
        if (lang === 'en') {
          url.searchParams.delete('lang');
        } else {
          url.searchParams.set('lang', lang);
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {}
    },

    syncLinks: function(lang) {
      syncInternalLinks(lang || getStoredLang());
    },

    init: function() {
      const lang = getStoredLang();
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

      const run = () => {
        ensureHeaderSelector(lang);
        syncInternalLinks(lang);
        
        // If not index.html (which runs its own render), translate DOM directly
        if (!(typeof window.language !== 'undefined' && typeof window.render === 'function')) {
          if (lang !== 'en') {
            translateDOM(lang);
          }
        }
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
      } else {
        run();
      }
    }
  };

  // Immediate execution for fast direction setup
  KotwariI18n.init();

})();
