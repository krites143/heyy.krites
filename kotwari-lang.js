/**
 * Kotwari International Ltd. — Universal Multilingual System (kotwari-lang.js)
 * Enterprise client-side internationalization engine.
 * Fully supports English (en) and Hindi (hi); architecture prepared for Gujarati (gu).
 * Respects strict translation gating: only fully translated languages are surfaced as active.
 * Persists language via localStorage('kotwari_lang') and URL query (?lang=...).
 */
(function() {
  'use strict';

  // Configured Language Registry
  const SUPPORTED_LANGUAGES = {
    en: { name: 'English', native: 'English', active: true, dir: 'ltr' },
    hi: { name: 'Hindi', native: 'हिंदी', active: true, dir: 'ltr' },
    gu: { name: 'Gujarati', native: 'ગુજરાતી', active: false, status: 'Coming Soon', dir: 'ltr' }
  };

  // Comprehensive Multilingual Translation Dictionary
  const DICT = {
    // Brand & Global Headings
    "Gao Se Global Tak": {
      hi: "गांव से ग्लोबल तक",
      gu: "ગામથી ગ્લોબલ સુધી"
    },
    "Gao Se Global Tak.": {
      hi: "गांव से ग्लोबल तक।",
      gu: "ગામથી ગ્લોબલ સુધી."
    },
    "Kotwari": {
      hi: "कोटवारी",
      gu: "કોટવારી"
    },
    "Kotwari International Ltd.": {
      hi: "कोटवारी इंटरनेशनल लिमिटेड",
      gu: "કોટવારી ઇન્ટરનેશનલ લિમિટેડ"
    },
    "Rooted in Villages · Connecting to the World": {
      hi: "गांवों से जुड़े · दुनिया को जोड़ते",
      gu: "ગામડાઓ સાથે જોડાયેલા · વિશ્વ સાથે જોડતા"
    },
    "Official Export Division": {
      hi: "आधिकारिक निर्यात प्रभाग",
      gu: "સત્તાવાર નિકાસ વિભાગ"
    },
    "Village Sourcing": {
      hi: "ग्रामीण स्रोत",
      gu: "ગ્રામીણ સ્ત્રોત"
    },
    "Integrated Processing": {
      hi: "एकीकृत प्रसंस्करण",
      gu: "સંકલિત પ્રક્રિયા"
    },
    "Audio Story": {
      hi: "ऑडियो कहानी",
      gu: "ઑડિયો વાર્તા"
    },
    "Menu": {
      hi: "मेनू",
      gu: "મેનુ"
    },
    "Close": {
      hi: "बंद करें",
      gu: "બંધ કરો"
    },
    "Back to top": {
      hi: "शीर्ष पर जाएं",
      gu: "ટોચ પર જાઓ"
    },
    "All rights reserved.": {
      hi: "सर्वाधिकार सुरक्षित।",
      gu: "સર્વાધિકાર સુરક્ષિત."
    },

    // Primary Navigation Items
    "Home": {
      hi: "होम",
      gu: "હોમ"
    },
    "Home Page": {
      hi: "मुख्य पृष्ठ",
      gu: "મુખ્ય પૃષ્ઠ"
    },
    "About": {
      hi: "हमारे बारे में",
      gu: "અમારા વિશે"
    },
    "About Us": {
      hi: "हमारे बारे में",
      gu: "અમારા વિશે"
    },
    "Businesses": {
      hi: "व्यवसाय",
      gu: "વ્યવસાયો"
    },
    "Ecosystem": {
      hi: "हमारा नेटवर्क",
      gu: "ઇકોસિસ્ટમ"
    },
    "Products": {
      hi: "उत्पाद",
      gu: "ઉત્પાદનો"
    },
    "Contact": {
      hi: "संपर्क",
      gu: "સંપર્ક"
    },
    "Contact Us": {
      hi: "संपर्क करें",
      gu: "સંપર્ક કરો"
    },
    "Farmers & FPO": {
      hi: "किसान और FPO",
      gu: "ખેડૂતો અને FPO"
    },
    "Partner with Kotwari": {
      hi: "Kotwari से जुड़ें",
      gu: "કોટવારી સાથે જોડાઓ"
    },
    "Partner With Kotwari": {
      hi: "Kotwari से जुड़ें",
      gu: "કોટવારી સાથે જોડાઓ"
    },
    "Partner With Kotwari ↗": {
      hi: "Kotwari से जुड़ें ↗",
      gu: "કોટવારી સાથે જોડાઓ ↗"
    },
    "News & Insights": {
      hi: "समाचार एवं विचार",
      gu: "સમાચાર અને વિચારો"
    },
    "Careers": {
      hi: "करियर",
      gu: "કારકિર્દી"
    },
    "Investors": {
      hi: "निवेशक",
      gu: "રોકાણકારો"
    },
    "Sustainability": {
      hi: "स्थिरता व पर्यावरण",
      gu: "ટકાઉપણું"
    },
    "Search": {
      hi: "खोजें",
      gu: "શોધો"
    },

    // Secondary & Hub Navigation
    "Vision & Mission": {
      hi: "दृष्टि और मिशन",
      gu: "દ્રષ્ટિ અને મિશન"
    },
    "Chairman's Message": {
      hi: "अध्यक्ष का संदेश",
      gu: "ચેરમેનનો સંદેશ"
    },
    "Core Philosophy": {
      hi: "मूल दर्शन",
      gu: "મુખ્ય ફિલસૂફી"
    },
    "Core Values": {
      hi: "मूल मूल्य",
      gu: "મુખ્ય મૂલ્યો"
    },
    "Dairy Range": {
      hi: "डेयरी उत्पाद",
      gu: "ડેરી ઉત્પાદનો"
    },
    "Milk Sourcing": {
      hi: "दूध संग्रह",
      gu: "દૂધ પ્રાપ્તિ"
    },
    "Spices": {
      hi: "मसाले",
      gu: "મસાલા"
    },
    "Staples & Sattu": {
      hi: "अनाज और सत्तू",
      gu: "અનાજ અને સત્તુ"
    },
    "Snacks & Dry Fruits": {
      hi: "स्नैक्स और सूखे मेवे",
      gu: "નાસ્તો અને સૂકા મેવા"
    },
    "Wood Pressed Oils": {
      hi: "कोल्हू का शुद्ध तेल",
      gu: "લાકડાના ઘાણીનું તેલ"
    },
    "Farmer Support": {
      hi: "किसान सहायता",
      gu: "ખેડૂત સહાય"
    },
    "Supply Chain Model": {
      hi: "आपूर्ति श्रृंखला मॉडल",
      gu: "સપ્લાય ચેઇન મોડેલ"
    },
    "FPO Network": {
      hi: "एफपीओ नेटवर्क",
      gu: "FPO નેટવર્ક"
    },
    "Kotwari One": {
      hi: "कोटवारी वन",
      gu: "કોટવારી વન"
    },
    "Protein Breakfast Point": {
      hi: "प्रोटीन ब्रेकफास्ट पॉइंट",
      gu: "પ્રોટીન બ્રેકફાસ્ટ પોઈન્ટ"
    },
    "Eggs": {
      hi: "अंडे",
      gu: "ઇંડા"
    },
    "KooA Water": {
      hi: "KooA मिनरल वाटर",
      gu: "KooA મિનરલ વોટર"
    },

    // Action CTAs
    "Explore Export Catalog": {
      hi: "निर्यात कैटलॉग देखें",
      gu: "નિકાસ કેટલોગ જુઓ"
    },
    "Start Trade Enquiry": {
      hi: "व्यापार पूछताछ शुरू करें",
      gu: "વેપાર પૂછપરછ શરૂ કરો"
    },
    "Download Catalog": {
      hi: "कैटलॉग डाउनलोड करें",
      gu: "કેટલોગ ડાઉનલોડ કરો"
    },
    "Send Message": {
      hi: "संदेश भेजें",
      gu: "સંદેશ મોકલો"
    },
    "Send Message →": {
      hi: "संदेश भेजें →",
      gu: "સંદેશ મોકલો →"
    },
    "WhatsApp Helpdesk →": {
      hi: "व्हाट्सएप सहायता केंद्र →",
      gu: "વ્હોટ્સએપ હેલ્પડેસ્ક →"
    },
    "Corporate Desk WhatsApp →": {
      hi: "कॉर्पोरेट डेस्क व्हाट्सएप →",
      gu: "કોર્પોરેટ ડેસ્ક વ્હોટ્સએપ →"
    },
    "Cookie Settings": {
      hi: "कुकी प्राथमिकताएं",
      gu: "કૂકી પસંદગીઓ"
    },
    "Privacy Policy": {
      hi: "गोपनीयता नीति",
      gu: "ગોપનીયતા નીતિ"
    },
    "Terms of Service": {
      hi: "सेवा की शर्तें",
      gu: "સેવાની શરતો"
    }
  };

  // Determine current active language
  function getInitialLanguage() {
    try {
      // 1. URL parameter override
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && SUPPORTED_LANGUAGES[urlLang] && SUPPORTED_LANGUAGES[urlLang].active) {
        return urlLang;
      }

      // 2. LocalStorage persistence
      const saved = localStorage.getItem('kotwari_lang');
      if (saved && SUPPORTED_LANGUAGES[saved] && SUPPORTED_LANGUAGES[saved].active) {
        return saved;
      }
    } catch (e) {}

    return 'en'; // Default
  }

  let currentLang = getInitialLanguage();

  // DOM node walker to translate matching strings
  function translatePage(targetLang) {
    if (!SUPPORTED_LANGUAGES[targetLang]) return;

    currentLang = targetLang;
    try {
      localStorage.setItem('kotwari_lang', targetLang);
    } catch (e) {}

    document.documentElement.lang = targetLang;
    document.documentElement.dir = SUPPORTED_LANGUAGES[targetLang].dir || 'ltr';

    if (targetLang === 'en') {
      // If switching back to English from another language, reload or revert nodes
      const hadPrevious = sessionStorage.getItem('kotwari_lang_switched');
      if (hadPrevious) {
        sessionStorage.removeItem('kotwari_lang_switched');
        window.location.reload();
        return;
      }
      return;
    }

    sessionStorage.setItem('kotwari_lang_switched', '1');

    // Walk text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'code', 'pre', 'kbd'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('#kotwari-search-overlay, #kotwari-consent-banner, #kotwari-consent-modal')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
      const original = node.nodeValue.trim();
      if (DICT[original] && DICT[original][targetLang]) {
        node.nodeValue = node.nodeValue.replace(original, DICT[original][targetLang]);
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const ph = el.getAttribute('placeholder');
      if (ph && DICT[ph] && DICT[ph][targetLang]) {
        el.setAttribute('placeholder', DICT[ph][targetLang]);
      }
    });

    // Update active state in selector dropdowns
    document.querySelectorAll('.lang, #language, [data-lang-selector]').forEach(sel => {
      if (sel.tagName.toLowerCase() === 'select') {
        sel.value = targetLang;
      }
    });
  }

  // Sync links so language persists across navigation clicks
  function syncNavigationLinks(lang) {
    if (!lang || lang === 'en') return;
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (href.startsWith('http') && !href.includes(window.location.hostname)) return;

      try {
        const u = new URL(href, window.location.href);
        u.searchParams.set('lang', lang);
        a.setAttribute('href', u.pathname + u.search + u.hash);
      } catch (e) {}
    });
  }

  // Setup language selectors on page
  function setupLanguageSelectors() {
    document.querySelectorAll('select.lang, select#language, select[name="language"]').forEach(sel => {
      // Rebuild options strictly according to active status
      sel.innerHTML = `
        <option value="en"${currentLang === 'en' ? ' selected' : ''}>EN</option>
        <option value="hi"${currentLang === 'hi' ? ' selected' : ''}>हिंदी</option>
      `;

      sel.addEventListener('change', (e) => {
        const chosen = e.target.value;
        translatePage(chosen);
        syncNavigationLinks(chosen);
      });
    });

    if (currentLang !== 'en') {
      translatePage(currentLang);
      syncNavigationLinks(currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLanguageSelectors);
  } else {
    setupLanguageSelectors();
  }

  // Public API
  window.KotwariI18n = {
    setLanguage: function(lang) {
      if (SUPPORTED_LANGUAGES[lang] && SUPPORTED_LANGUAGES[lang].active) {
        translatePage(lang);
        syncNavigationLinks(lang);
      } else {
        console.warn('[KotwariI18n] Language ' + lang + ' is not currently marked active.');
      }
    },
    getLanguage: function() { return currentLang; },
    languages: SUPPORTED_LANGUAGES,
    syncLinks: syncNavigationLinks,
    dictionary: DICT
  };
})();
