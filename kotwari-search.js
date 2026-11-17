/**
 * Kotwari International Ltd. — Universal Global Search Engine (kotwari-search.js)
 * Enterprise client-side search index covering all 51+ routes and products.
 * Zero external dependencies. Full keyboard navigation and highlighting support.
 */
(function() {
  'use strict';

  // Comprehensive Website Catalog Index
  const SEARCH_INDEX = [
    // Flagship & Corporate
    {
      title: "Kotwari International — Gao Se Global Tak",
      url: "index.html",
      category: "Corporate",
      keywords: ["home", "gao se global tak", "rural commerce", "ecosystem", "farmers", "village sourcing", "processing", "corporate", "conglomerate"],
      desc: "Flagship portal of Kotwari International Ltd. Building India's farmer-to-market-to-global value chain."
    },
    {
      title: "About Kotwari — Mission, Leadership & Philosophy",
      url: "about.html",
      category: "Corporate",
      keywords: ["about us", "leadership", "chairman", "m a kotwari", "alamgir siddiqui", "mission", "vision", "core values", "board", "governance"],
      desc: "Learn about Kotwari's founding story, Chairman M. A. Kotwari's vision, and our 7 corporate pillars of enduring trust."
    },
    {
      title: "Corporate News & Insights",
      url: "news.html",
      category: "Media",
      keywords: ["news", "insights", "press release", "updates", "media", "announcements", "export dispatches", "agritech", "rural prosperity"],
      desc: "Official corporate press releases, executive perspectives, agricultural reports, and international trade dispatches."
    },
    {
      title: "Investor Relations & Strategic Governance",
      url: "investors.html",
      category: "Corporate",
      keywords: ["investors", "financials", "annual report", "growth roadmap", "esg", "governance", "capital allocation", "expansion"],
      desc: "Strategic 5-year growth trajectory, capital allocation philosophy, audited metrics, and investor presentations."
    },
    {
      title: "Careers & Talent Acquisition",
      url: "careers.html",
      category: "Careers",
      keywords: ["careers", "jobs", "hiring", "recruitment", "agronomy", "supply chain", "dairy technologist", "logistics", "retail manager", "cv", "resume"],
      desc: "Explore career opportunities across supply chain, agronomy, food science, export trade, and modern retail."
    },
    {
      title: "Contact & Global Trade Desk",
      url: "contact.html",
      category: "Contact",
      keywords: ["contact", "office", "lucknow", "jankipuram", "kursi road", "phone", "email", "trade desk", "whatsapp", "enquiry"],
      desc: "Registered corporate headquarters at Kotwari House, Lucknow, with departmental direct contacts and instant WhatsApp routing."
    },
    {
      title: "Partner with Kotwari — Alliances & Franchises",
      url: "partners.html",
      category: "Alliances",
      keywords: ["partner", "franchise", "fpo alliance", "vendor", "super stockist", "distributor", "cooperative", "procurement"],
      desc: "Strategic partnership frameworks for farmers, retail franchisees, domestic distributors, and institutional buyers."
    },
    {
      title: "Sustainability & Rural ESG Charter",
      url: "sustainability.html",
      category: "Corporate",
      keywords: ["sustainability", "esg", "environment", "water stewardship", "clean energy", "soil regeneration", "rural prosperity", "csr"],
      desc: "Our environmental and social commitment: solar-powered cold hubs, water neutrality, and zero chemical adulteration."
    },

    // Core Business Verticals
    {
      title: "Global Export Division — Agricultural Commodities",
      url: "exports.html",
      category: "Exports",
      keywords: ["exports", "international trade", "middle east", "gcc", "dubai", "fob", "cif", "container shipment", "basmati rice", "spices", "mustard oil"],
      desc: "APEDA and FSSAI certified global trade division delivering premium Indian agro-commodities to the Gulf, Africa, and Asia."
    },
    {
      title: "Kotwari Dairy — Pure Milk & Fresh Dairy Products",
      url: "dairy.html",
      category: "Dairy",
      keywords: ["dairy", "milk", "desi ghee", "lassi", "chaas", "dahi", "buttermilk", "paneer", "white gold", "kursi road plant"],
      desc: "Direct village chilling, automated pasteurization, and unadulterated milk, ghee, dahi, and traditional lassi."
    },
    {
      title: "Kotwari FMCG — Pure Spices, Staples & Cold-Pressed Oils",
      url: "fmcg.html",
      category: "FMCG",
      keywords: ["fmcg", "spices", "mustard oil", "kachi ghani", "sattu", "turmeric", "haldi", "garam masala", "red chilli", "makhana", "dry fruits", "juices"],
      desc: "Direct-from-source pantry staples: stone-ground spices, pure Bihar chana sattu, and traditional cold-pressed oils."
    },
    {
      title: "KooA Natural Mineral & Packaged Drinking Water",
      url: "water.html",
      category: "Beverages",
      keywords: ["kooa", "mineral water", "drinking water", "alkaline", "beverages", "purification", "natural hydration"],
      desc: "Multi-stage purified mineral water with essential natural electrolytes, bottled untouched by hand."
    },
    {
      title: "Kotwari Eggs — Farm Fresh Village Poultry Network",
      url: "eggs.html",
      category: "Poultry",
      keywords: ["eggs", "poultry", "table eggs", "brown eggs", "sahebganj", "layer farming", "protein", "cracking quality"],
      desc: "Integrated village poultry collection, computerised candling, sanitised grading, and farm-fresh daily delivery."
    },
    {
      title: "Kotwari One — Modern Rural & Urban Retail",
      url: "retail.html",
      category: "Retail",
      keywords: ["retail", "kotwari one", "breakfast point", "convenience store", "franchise", "daily essentials", "protein point"],
      desc: "Modern retail store network and Protein Breakfast Points bringing farm-direct products to neighborhood consumers."
    },
    {
      title: "Farmers & Agriculture — Fair Village Procurement",
      url: "farmers.html",
      category: "Agri & FPO",
      keywords: ["farmers", "kisan", "procurement", "fair price", "weigh slips", "soil care", "veterinary support", "rural development"],
      desc: "Empowering rural cultivators with computerized weigh slips, prompt bank settlements, and field agronomist support."
    },
    {
      title: "FPO Network — Farmer Producer Organizations",
      url: "fpo.html",
      category: "Agri & FPO",
      keywords: ["fpo", "farmer producer company", "aggregation", "collective bargaining", "fpo alliance", "cluster farming"],
      desc: "Institutional tie-ups with registered FPOs for large-scale crop aggregation, grading, and direct market linkage."
    },

    // 31 Product Pages
    {
      title: "Kotwari Traditional Basmati Rice (Aged Long Grain)",
      url: "product-kotwari-basmati-rice.html",
      category: "Product",
      keywords: ["basmati rice", "rice", "biryani rice", "aged rice", "export quality rice", "pantry"],
      desc: "Aged long-grain royal basmati rice with exquisite aroma and elongation for premium culinary preparations."
    },
    {
      title: "Kotwari Kachi Ghani Black Mustard Oil (Cold-Pressed)",
      url: "product-kotwari-black-mustard-oil.html",
      category: "Product",
      keywords: ["black mustard oil", "mustard oil", "kachi ghani", "sarson tel", "cold pressed oil", "pungent"],
      desc: "100% pure cold-pressed black mustard oil with intense natural pungency and high omega-3 fatty acids."
    },
    {
      title: "Kotwari Pure Chana Sattu (Roasted Gram Flour)",
      url: "product-kotwari-chana-sattu.html",
      category: "Product",
      keywords: ["chana sattu", "sattu", "roasted gram flour", "protein drink", "bihar sattu", "staple"],
      desc: "Traditional stone-ground roasted Bengal gram flour. Natural high-protein superfood for shakes and litti."
    },
    {
      title: "Kotwari Traditional Desi Ghee (Danedar Aromatic)",
      url: "product-kotwari-deshi-ghee.html",
      category: "Product",
      keywords: ["desi ghee", "deshi ghee", "clarified butter", "pure ghee", "danedar ghee", "dairy"],
      desc: "Slow-cooked artisanal cow and buffalo milk ghee with rich granular golden texture and authentic aroma."
    },
    {
      title: "Kotwari Himalayan Haldi (High Curcumin Turmeric)",
      url: "product-kotwari-himalayan-haldi.html",
      category: "Product",
      keywords: ["himalayan haldi", "haldi", "turmeric powder", "curcumin", "spices", "pure spices"],
      desc: "Sun-dried turmeric with guaranteed 4.5%+ curcumin content, ground without synthetic coloring."
    },
    {
      title: "Kotwari Royal Garam Masala (16 Aromatic Whole Spices)",
      url: "product-kotwari-garam-masala.html",
      category: "Product",
      keywords: ["garam masala", "spices", "whole spices", "curry powder", "aromatic masala"],
      desc: "Master blend of 16 hand-selected whole spices, slow-roasted and ground for rich Indian curries."
    },
    {
      title: "Kotwari Kashmiri Red Chilli Powder (Mild Heat, Deep Color)",
      url: "product-kotwari-kashmiri-red-chilli.html",
      category: "Product",
      keywords: ["kashmiri red chilli", "mirch powder", "lal mirch", "chilli powder", "natural red"],
      desc: "Stemless Kashmiri chillies ground for rich crimson red color and mild, flavorful culinary heat."
    },
    {
      title: "Kotwari Sun-Dried Whole Red Chilli (Stemless Sabut Mirch)",
      url: "product-kotwari-whole-red-chilli.html",
      category: "Product",
      keywords: ["whole red chilli", "sabut lal mirch", "dried chillies", "tadka spices"],
      desc: "Crisp sun-dried whole red chillies with intact seeds, ideal for authentic tempering and pickles."
    },
    {
      title: "Kotwari Banarasi Red Chilli Achar (Traditional Stuffed Pickle)",
      url: "product-kotwari-red-chilli-achar.html",
      category: "Product",
      keywords: ["red chilli achar", "pickle", "banarasi achar", "bharwa lal mirch", "mustard oil pickle"],
      desc: "Handcrafted thick red chillies stuffed with heirloom roasted spice blend and matured in pure mustard oil."
    },
    {
      title: "Kotwari Mithila Phool Makhana (Select Fox Nuts Jumbo)",
      url: "product-kotwari-mithla-makhana.html",
      category: "Product",
      keywords: ["mithla makhana", "phool makhana", "fox nuts", "lotus seeds", "healthy snack"],
      desc: "GI-grade jumbo grade phool makhana harvested directly from Bihar's wetlands. Zero cholesterol."
    },
    {
      title: "Kotwari Roasted & Salted Makhana (Crunchy Snack)",
      url: "product-kotwari-roasted-makhana.html",
      category: "Product",
      keywords: ["roasted makhana", "salted makhana", "healthy snack", "roasted fox nuts", "diet snack"],
      desc: "Lightly olive oil roasted jumbo makhana tossed with rock salt and black pepper for guilt-free snacking."
    },
    {
      title: "Kotwari Select Medjool Dates (Natural Sweet Jumbo Dates)",
      url: "product-kotwari-medjool-dates.html",
      category: "Product",
      keywords: ["medjool dates", "dates", "khajoor", "dry fruits", "natural energy"],
      desc: "Hand-sorted succulent Medjool dates with soft caramel texture and rich natural fiber."
    },
    {
      title: "Kotwari Select Dry Fruits (Cashews, Almonds, Pistachios, Raisins)",
      url: "product-kotwari-dry-fruits.html",
      category: "Product",
      keywords: ["dry fruits", "kaju", "badam", "pista", "kishmish", "almonds", "cashews"],
      desc: "Premium grade California almonds, W240 cashews, and Afghan green raisins vacuum packed."
    },
    {
      title: "Kotwari Premium Dry Fruit Namkeen (Royal Mixture)",
      url: "product-kotwari-dry-fruit-namkeen.html",
      category: "Product",
      keywords: ["dry fruit namkeen", "namkeen", "mixture", "chivda", "snacks"],
      desc: "Crispy flattened rice flakes combined with roasted cashews, almonds, raisins, and mild spices."
    },
    {
      title: "Kotwari Authentic Mix Bhuja (Spicy Tea-Time Snack)",
      url: "product-kotwari-mix-bhuja.html",
      category: "Product",
      keywords: ["mix bhuja", "bhuja", "chivda namkeen", "evening snacks", "crunchy"],
      desc: "Authentic eastern Indian puffed grain snack flavored with mustard oil, roasted peanuts, and spices."
    },
    {
      title: "Kotwari Potato Finger Sticks (Crispy Golden Fries)",
      url: "product-kotwari-potato-finger-sticks.html",
      category: "Product",
      keywords: ["potato finger sticks", "potato sticks", "aloo bhujia", "chips", "crispy snacks"],
      desc: "Crispy salted potato sticks made from select starch-rich potatoes, seasoned with mild spices."
    },
    {
      title: "Kotwari Cold-Pressed Yellow Mustard Oil (Mild Aroma)",
      url: "product-kotwari-yellow-mustard-oil.html",
      category: "Product",
      keywords: ["yellow mustard oil", "peeli sarson tel", "cold pressed mustard oil", "delicate oil"],
      desc: "Gentle cold-pressed oil from golden yellow mustard seeds. Rich flavor without overpowering tears."
    },
    {
      title: "Kotwari Kachi Ghani Mustard Oil 5L Bulk Pack",
      url: "product-kotwari-kachi-ghani-5l.html",
      category: "Product",
      keywords: ["mustard oil 5l", "sarson tel can", "bulk oil", "family pack"],
      desc: "Economy 5-liter food-grade jerry can of authentic unrefined kachi ghani mustard oil."
    },
    {
      title: "Kotwari Fresh Desi Adrak (Ginger Farm Direct)",
      url: "product-kotwari-desi-adrak.html",
      category: "Product",
      keywords: ["desi adrak", "ginger", "fresh ginger", "farm harvest", "vegetables"],
      desc: "Freshly harvested, washed, and sorted aromatic ginger rhizomes from Awadh fertile belts."
    },
    {
      title: "Kotwari Desi Garlic (Pungent Small Clove Lehsun)",
      url: "product-kotwari-desi-garlic.html",
      category: "Product",
      keywords: ["desi garlic", "lehsun", "garlic bulbs", "spices", "medicinal garlic"],
      desc: "Sun-cured country garlic bulbs with high allicin content and intense medicinal aroma."
    },
    {
      title: "Kotwari Farm Fresh Table Eggs (Pack of 6, 12, 30)",
      url: "product-kotwari-eggs.html",
      category: "Product",
      keywords: ["eggs", "poultry eggs", "fresh eggs", "protein", "table eggs", "egg crate"],
      desc: "Hygienically candled and graded farm fresh white eggs delivered straight from village layer flocks."
    },
    {
      title: "Kotwari Farm Fresh Premium Milk (Pasteurized Toned & Full Cream)",
      url: "product-kotwari-premium-milk.html",
      category: "Product",
      keywords: ["premium milk", "fresh milk", "pasteurized milk", "dairy milk", "toned milk"],
      desc: "Single-source farm fresh milk collected and chilled within 90 minutes of milking."
    },
    {
      title: "Kotwari Rose Gold Lassi (Rich Traditional Sweet Yogurt Drink)",
      url: "product-kotwari-rose-gold-lassi.html",
      category: "Product",
      keywords: ["rose gold lassi", "lassi", "rose lassi", "sweet yogurt drink", "refreshment"],
      desc: "Thick creamy churned yogurt drink infused with natural Damascus rose extracts and cardamom."
    },
    {
      title: "KooA White Gold Fresh Milk (Nutrient Rich Dairy)",
      url: "product-kooa-white-gold-milk.html",
      category: "Product",
      keywords: ["white gold milk", "kooa milk", "whole milk", "pure buffalo milk", "dairy"],
      desc: "High SNF rich whole milk sourced directly from vetted village dairy keepers."
    },
    {
      title: "KooA White Gold Lassi (Classic Sweet Cream Lassi)",
      url: "product-kooa-white-gold-lassi.html",
      category: "Product",
      keywords: ["white gold lassi", "kooa lassi", "sweet lassi", "curd beverage"],
      desc: "Traditional thick sweetened yogurt beverage with a luscious cream top note."
    },
    {
      title: "KooA Mama Lassi (Homestyle Spiced Buttermilk)",
      url: "product-kooa-mama-lassi.html",
      category: "Product",
      keywords: ["mama lassi", "salted lassi", "spiced lassi", "cooling drink"],
      desc: "Comforting homestyle lassi churned with natural rock salt, roasted cumin, and mint."
    },
    {
      title: "KooA Arabian Chhass (Probiotic Refreshing Buttermilk)",
      url: "product-kooa-arabian-chhass.html",
      category: "Product",
      keywords: ["arabian chhass", "chhass", "chaas", "buttermilk", "probiotic drink"],
      desc: "Ultra-refreshing salted buttermilk infused with roasted jeera and mint, formulated for warm climates."
    },
    {
      title: "KooA Arabian Dahi (Thick Set Natural Curd)",
      url: "product-kooa-arabian-dahi.html",
      category: "Product",
      keywords: ["arabian dahi", "dahi", "curd", "yogurt", "thick dahi", "probiotic"],
      desc: "Natural whole-milk set curd with firm texture and mild tang, without artificial thickeners."
    },
    {
      title: "KooA Natural Mineral Water (Bottled at Source)",
      url: "product-kooa-mineral-water.html",
      category: "Product",
      keywords: ["kooa mineral water", "mineral water", "packaged water", "500ml", "1l water"],
      desc: "Micro-filtered mineral water with balanced pH and essential natural dissolved salts."
    },
    {
      title: "Kotwari Pure Mixed Fruit Juice (Natural Vitamin Boost)",
      url: "product-kotwari-mix-fruits-juice.html",
      category: "Product",
      keywords: ["mix fruits juice", "fruit juice", "natural juice", "beverage"],
      desc: "Carefully blended tropical fruit juice rich in vitamin C with zero added synthetic colors."
    },
    {
      title: "Kotwari Fruit & Nut Nectar (Real Fruit Pulp & Crushed Dry Fruits)",
      url: "product-kotwari-mix-fruit-milk-dryfruits-juice.html",
      category: "Product",
      keywords: ["fruit and nut nectar", "dryfruit shake", "energy beverage", "rich juice"],
      desc: "Wholesome nectar blending real orchard fruit pulp with crushed almonds, pistachios, and milk solids."
    },

    // Legal & Utility
    {
      title: "Privacy Policy & Data Security",
      url: "privacy.html",
      category: "Legal",
      keywords: ["privacy policy", "data protection", "gdpr", "personal data", "security"],
      desc: "Our corporate privacy commitments regarding personal data collection and confidentiality."
    },
    {
      title: "Terms & Conditions of Commercial Engagement",
      url: "terms.html",
      category: "Legal",
      keywords: ["terms", "conditions", "commercial terms", "legal agreement"],
      desc: "Standard legal terms governing website access, intellectual property, and trade contracts."
    },
    {
      title: "Cookie Policy & Tracking Controls",
      url: "cookie-policy.html",
      category: "Legal",
      keywords: ["cookie policy", "cookies", "analytics", "preferences", "consent"],
      desc: "Detailed explanation of technical, analytics, and functional cookies used on Kotwari platforms."
    },
    {
      title: "Website Help & 404 Navigation Center",
      url: "404.html",
      category: "Utility",
      keywords: ["404", "help", "not found", "sitemap", "directory"],
      desc: "Navigate directly to active Kotwari corporate divisions, product catalogs, and help desks."
    }
  ];

  // Quick Suggested Searches
  const SUGGESTED_QUERIES = [
    "Export Catalog",
    "Basmati Rice",
    "Poultry Eggs",
    "Desi Ghee",
    "Careers",
    "KooA Water",
    "Mustard Oil",
    "Chana Sattu",
    "Investor Relations",
    "Farmers & FPO"
  ];

  // State
  let overlayEl = null;
  let inputEl = null;
  let resultsContainer = null;
  let clearBtn = null;
  let activeIndex = -1;
  let currentResults = [];

  // Initialize Search Modal in DOM
  function initSearchUI() {
    if (document.getElementById('kotwari-search-overlay')) return;

    // Ensure CSS is loaded
    if (!document.querySelector('link[href*="kotwari-search.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'kotwari-search.css';
      document.head.appendChild(link);
    }

    const overlay = document.createElement('div');
    overlay.id = 'kotwari-search-overlay';
    overlay.className = 'kotwari-search-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Website Global Search');

    overlay.innerHTML = `
      <div class="kotwari-search-dialog" onclick="event.stopPropagation()">
        <div class="kotwari-search-header">
          <div class="kotwari-search-icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input type="text" class="kotwari-search-input" id="kotwari-search-input" placeholder="Search pages, products, exports, careers..." autocomplete="off" spellcheck="false">
          <button type="button" class="kotwari-search-clear-btn" id="kotwari-search-clear" aria-label="Clear search">✕</button>
          <button type="button" class="kotwari-search-close-badge" id="kotwari-search-close" aria-label="Close search" title="Close search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="kotwari-search-suggestions">
          <span class="kotwari-search-sug-label">Popular:</span>
          ${SUGGESTED_QUERIES.map(q => `<button type="button" class="kotwari-search-chip" data-query="${q}">${q}</button>`).join('')}
        </div>

        <div class="kotwari-search-results" id="kotwari-search-results">
          <!-- Live results injected here -->
        </div>

        <div class="kotwari-search-footer">
          <div class="kotwari-search-footer-brand">
            <img src="kotwari_emblem_new.png" alt="Kotwari Emblem" class="kotwari-search-footer-emblem" width="16" height="16">
            <span>Kotwari International Ltd.</span>
          </div>
          <div class="kotwari-search-footer-meta" id="kotwari-search-count">Gao Se Global Tak</div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlayEl = overlay;
    inputEl = document.getElementById('kotwari-search-input');
    resultsContainer = document.getElementById('kotwari-search-results');
    clearBtn = document.getElementById('kotwari-search-clear');

    // Event Listeners
    overlay.addEventListener('click', closeSearch);
    document.getElementById('kotwari-search-close').addEventListener('click', closeSearch);

    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      clearBtn.classList.remove('is-visible');
      inputEl.focus();
      renderInitialSuggestions();
    });

    inputEl.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (q.length > 0) {
        clearBtn.classList.add('is-visible');
        performSearch(q);
      } else {
        clearBtn.classList.remove('is-visible');
        renderInitialSuggestions();
      }
    });

    inputEl.addEventListener('keydown', handleKeyNavigation);

    // Suggestion chips click
    overlay.querySelectorAll('.kotwari-search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        inputEl.value = query;
        clearBtn.classList.add('is-visible');
        performSearch(query);
        inputEl.focus();
      });
    });

    // Populate initial suggestion state
    renderInitialSuggestions();
  }

  // Highlight helper
  function highlightMatches(text, query) {
    if (!query) return text;
    const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    if (!words.length) return text;
    const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return text.replace(pattern, '<mark>$1</mark>');
  }

  // Search logic
  function performSearch(query) {
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/).filter(w => w.length > 0);

    const scored = [];

    SEARCH_INDEX.forEach(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.desc.toLowerCase();
      const catLower = item.category.toLowerCase();

      // Title exact / partial match
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 60;
      else if (titleLower.includes(q)) score += 40;

      // Keyword matches
      words.forEach(w => {
        if (item.keywords.some(k => k.includes(w))) score += 25;
        if (titleLower.includes(w)) score += 20;
        if (descLower.includes(w)) score += 10;
        if (catLower.includes(w)) score += 15;
      });

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    currentResults = scored.map(s => s.item);
    activeIndex = -1;

    renderResults(currentResults, query);
  }

  // Render results
  function renderResults(results, query) {
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="kotwari-search-empty">
          <div class="kotwari-search-empty-icon" aria-hidden="true">🔍</div>
          <h4>No matching corporate records</h4>
          <p>We couldn't find anything matching &ldquo;<strong>${escapeHtml(query)}</strong>&rdquo;.<br>Try broader terms like <em>Rice</em>, <em>Dairy</em>, <em>Spices</em>, or <em>Careers</em>.</p>
        </div>
      `;
      return;
    }

    let html = '';
    results.forEach((item, idx) => {
      html += `
        <a href="${item.url}" class="kotwari-search-item" data-index="${idx}">
          <div class="kotwari-search-item-meta">
            <span class="kotwari-search-badge">${escapeHtml(item.category)}</span>
          </div>
          <h3 class="kotwari-search-item-title">${highlightMatches(escapeHtml(item.title), query)}</h3>
          <p class="kotwari-search-item-desc">${highlightMatches(escapeHtml(item.desc), query)}</p>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
    const countEl = document.getElementById('kotwari-search-count');
    if (countEl) {
      countEl.textContent = `${results.length} ${results.length === 1 ? 'result' : 'results'}`;
    }
  }

  function renderInitialSuggestions() {
    if (!resultsContainer) return;
    currentResults = SEARCH_INDEX.slice(0, 8);
    activeIndex = -1;

    let html = `<div class="kotwari-search-heading-label">Suggested Destinations</div>`;
    currentResults.forEach((item, idx) => {
      html += `
        <a href="${item.url}" class="kotwari-search-item" data-index="${idx}">
          <div class="kotwari-search-item-meta">
            <span class="kotwari-search-badge">${escapeHtml(item.category)}</span>
          </div>
          <h3 class="kotwari-search-item-title">${escapeHtml(item.title)}</h3>
          <p class="kotwari-search-item-desc">${escapeHtml(item.desc)}</p>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
    const countEl = document.getElementById('kotwari-search-count');
    if (countEl) {
      countEl.textContent = 'Gao Se Global Tak';
    }
  }

  // Keyboard navigation inside list
  function handleKeyNavigation(e) {
    if (!resultsContainer) return;
    const items = resultsContainer.querySelectorAll('.kotwari-search-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        items[activeIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  }

  function updateActiveItem(items) {
    items.forEach((el, idx) => {
      if (idx === activeIndex) {
        el.classList.add('is-selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('is-selected');
      }
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Open & Close public API
  function openSearch(prefill) {
    initSearchUI();
    overlayEl.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    if (prefill && typeof prefill === 'string') {
      inputEl.value = prefill;
      clearBtn.classList.add('is-visible');
      performSearch(prefill);
    } else {
      renderInitialSuggestions();
    }

    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 50);
  }

  function closeSearch() {
    if (!overlayEl) return;
    overlayEl.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Global hotkeys (Ctrl+K, Cmd+K, /)
  window.addEventListener('keydown', (e) => {
    // If inside an input/textarea and pressing '/', don't open
    const targetTag = e.target.tagName.toLowerCase();
    if ((targetTag === 'input' || targetTag === 'textarea') && e.key === '/') {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlayEl && overlayEl.classList.contains('is-active')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === '/' && targetTag !== 'input' && targetTag !== 'textarea') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Wire up any search triggers on page load
  function wireTriggers() {
    document.querySelectorAll('.search-trigger-btn, [data-open-search]').forEach(btn => {
      btn.removeEventListener('click', openSearch);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    });

    // Auto-inject into headers if no trigger is present
    const headerTools = document.querySelector('.header-tools') || document.querySelector('.header-inner') || document.querySelector('header nav');
    if (headerTools && !document.querySelector('.search-trigger-btn')) {
      const searchBtn = document.createElement('button');
      searchBtn.type = 'button';
      searchBtn.className = 'search-trigger-btn';
      searchBtn.setAttribute('aria-label', 'Search website');
      searchBtn.setAttribute('title', 'Global Search (Ctrl+K or /)');
      searchBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span class="search-label-text">Search</span>
        <span class="search-hint-key" aria-hidden="true">⌘K</span>
      `;
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });

      // Insert cleanly before language selector or as first tool
      const langEl = headerTools.querySelector('.lang') || headerTools.querySelector('.custom-select-trigger') || headerTools.firstChild;
      if (langEl) {
        headerTools.insertBefore(searchBtn, langEl);
      } else {
        headerTools.appendChild(searchBtn);
      }
    }
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireTriggers);
  } else {
    wireTriggers();
  }

  // Export to window
  window.KotwariSearch = {
    open: openSearch,
    close: closeSearch,
    search: performSearch,
    index: SEARCH_INDEX
  };
})();
