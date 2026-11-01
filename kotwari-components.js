/**
 * Kotwari Enterprise Components & Search Engine
 * Provides instant search modal across all 28 catalog items & mobile quick bar
 */
(function() {
  // Master catalog reference
  var catalog = [
    {"name":"KooA Mineral Water (Arabian Collection)","cat":"Mineral Water","file":"product-kooa-mineral-water.html","img":"products/kooa-mineral-water-300ml-hand.jpeg"},
    {"name":"Kotwari Premium Deshi Ghee","cat":"Dairy","file":"product-kotwari-deshi-ghee.html","img":"products/kotwari-dairy-deshi-ghee-1l-jar.jpeg"},
    {"name":"Kotwari White Gold Milk","cat":"Dairy","file":"product-kooa-white-gold-milk.html","img":"products/kooa-dairy-white-gold-milk-1l-bottle.jpeg"},
    {"name":"Kotwari Arabian Dahi","cat":"Dairy","file":"product-kooa-arabian-dahi.html","img":"products/kooa-dairy-arabian-dahi-400g-tub.jpeg"},
    {"name":"Kotwari White Gold Lassi","cat":"Dairy","file":"product-kooa-white-gold-lassi.html","img":"products/kooa-dairy-white-gold-lassi-200g-cup.jpeg"},
    {"name":"Kotwari Arabian Chhass","cat":"Dairy","file":"product-kooa-arabian-chhass.html","img":"products/kooa-dairy-arabian-chhass-200ml-pouch.jpeg"},
    {"name":"KooA Mama Lassi","cat":"Dairy","file":"product-kooa-mama-lassi.html","img":"products/kooa-dairy-mama-lassi-200ml-cup.jpeg"},
    {"name":"Kotwari Dairy Rose Gold Lassi","cat":"Dairy","file":"product-kotwari-rose-gold-lassi.html","img":"products/kotwari-dairy-rose-gold-lassi-200g-cup.jpeg"},
    {"name":"Kotwari Dairy Premium Milk","cat":"Dairy","file":"product-kotwari-premium-milk.html","img":"products/kotwari-dairy-premium-milk-bottle.jpeg"},
    {"name":"Kotwari Arabian Collection Eggs","cat":"Eggs & Poultry","file":"product-kotwari-eggs.html","img":"products/kotwari-eggs-arabian-collection-12pack.jpeg"},
    {"name":"Kotwari Fresh Eggs Portal","cat":"Eggs & Poultry","file":"eggs.html","img":"products/kotwari-eggs-retail-tray.jpeg"},
    {"name":"Premium Himalayan Desi Haldi (Turmeric)","cat":"Spices","file":"product-kotwari-himalayan-haldi.html","img":"products/kotwari-spices-himalayan-haldi-showcase.jpeg"},
    {"name":"Himalayan Garam Masala (12 Spices Blend)","cat":"Spices","file":"product-kotwari-garam-masala.html","img":"products/kotwari-spices-garam-masala-showcase.jpeg"},
    {"name":"Himalayan Whole Red Chilli (Sabut Lal Mirch)","cat":"Spices","file":"product-kotwari-whole-red-chilli.html","img":"products/kotwari-spices-whole-red-chilli-showcase.jpeg"},
    {"name":"Kashmiri Red Chilli Powder","cat":"Spices","file":"product-kotwari-kashmiri-red-chilli.html","img":"products/kotwari-spices-kashmiri-red-chilli-200g-jar.jpeg"},
    {"name":"Himalayan Dry Desi Garlic (Desi Lahsun)","cat":"Spices","file":"product-kotwari-desi-garlic.html","img":"products/kotwari-spices-desi-garlic-showcase.jpeg"},
    {"name":"Himalayan Desi Adrak (Ginger)","cat":"Spices","file":"product-kotwari-desi-adrak.html","img":"products/kotwari-spices-desi-adrak-showcase.jpeg"},
    {"name":"Kotwari Royal Basmati Rice","cat":"Staples","file":"product-kotwari-basmati-rice.html","img":"products/kotwari-staples-basmati-rice-5kg-bag.jpeg"},
    {"name":"Pure Chana Sattu (Traditional Roasted Gram Flour)","cat":"Staples","file":"product-kotwari-chana-sattu.html","img":"products/kotwari-staples-chana-sattu-500g-pack.jpeg"},
    {"name":"Mithila Phool Makhana (Fox Nuts)","cat":"Snacks","file":"product-kotwari-mithla-makhana.html","img":"products/kotwari-snacks-mithla-makhana-250g-pack.jpeg"},
    {"name":"Roasted & Salted Phool Makhana","cat":"Snacks","file":"product-kotwari-roasted-makhana.html","img":"products/kotwari-snacks-roasted-makhana-100g-pouch.jpeg"},
    {"name":"Premium Royal Mix Dry Fruits","cat":"Snacks","file":"product-kotwari-dry-fruits.html","img":"products/kotwari-snacks-dry-fruits-500g-box.jpeg"},
    {"name":"Medjool Premium Dates","cat":"Snacks","file":"product-kotwari-medjool-dates.html","img":"products/kotwari-snacks-medjool-dates-500g-box.jpeg"},
    {"name":"Potato Finger Sticks (Namkeen)","cat":"Snacks","file":"product-kotwari-potato-finger-sticks.html","img":"products/kotwari-snacks-potato-finger-sticks-200g-pouch.jpeg"},
    {"name":"Mix Bhuja (Traditional Namkeen Mixture)","cat":"Snacks","file":"product-kotwari-mix-bhuja.html","img":"products/kotwari-snacks-mix-bhuja-200g-pouch.jpeg"},
    {"name":"Royal Dry Fruit Namkeen","cat":"Snacks","file":"product-kotwari-dry-fruit-namkeen.html","img":"products/kotwari-snacks-dry-fruit-namkeen-200g-pouch.jpeg"},
    {"name":"Banarasi Bharwa Red Chilli Achar","cat":"Pickles","file":"product-kotwari-red-chilli-achar.html","img":"products/kotwari-pickles-red-chilli-achar-500g-jar.jpeg"},
    {"name":"Yellow Mustard Oil (Kachi Ghani)","cat":"Oils","file":"product-kotwari-yellow-mustard-oil.html","img":"products/kotwari-oils-yellow-mustard-oil-1l-bottle.jpeg"},
    {"name":"Black Mustard Oil (Kachi Ghani)","cat":"Oils","file":"product-kotwari-black-mustard-oil.html","img":"products/kotwari-oils-black-mustard-oil-1l-bottle.jpeg"},
    {"name":"Kachi Ghani Mustard Oil (5L Can)","cat":"Oils","file":"product-kotwari-kachi-ghani-5l.html","img":"products/kotwari-oils-kachi-ghani-5l-can.jpeg"},
    {"name":"Natural 7-Mix Fruits Juice","cat":"Beverages","file":"product-kotwari-mix-fruits-juice.html","img":"products/kotwari-beverages-mix-fruits-juice-200ml-bottle.jpeg"},
    {"name":"Mix Fruit, Milk & Dry-Fruits Juice Shake","cat":"Beverages","file":"product-kotwari-mix-fruit-milk-dryfruits-juice.html","img":"products/kotwari-beverages-mix-fruit-milk-dryfruits-juice-showcase.jpeg"}
  ];

  // Create Search Modal DOM
  function injectSearchModal() {
    if (document.getElementById('kotwariSearchModal')) return;

    var modal = document.createElement('div');
    modal.id = 'kotwariSearchModal';
    modal.className = 'kotwari-search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Search Kotwari Products');

    modal.innerHTML = [
      '<div class="kotwari-search-box">',
      '  <div class="search-input-wrap">',
      '    <input type="search" id="kotwariSearchInput" placeholder="Search ghee, eggs, water, spices, mustard oil..." autocomplete="off">',
      '    <button type="button" class="search-close-btn" id="kotwariSearchClose" aria-label="Close search">&times;</button>',
      '  </div>',
      '  <div class="search-results-list" id="kotwariSearchResults"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    var input = document.getElementById('kotwariSearchInput');
    var resultsList = document.getElementById('kotwariSearchResults');
    var closeBtn = document.getElementById('kotwariSearchClose');

    function renderResults(q) {
      var query = (q || '').trim().toLowerCase();
      var matches = catalog.filter(function(item) {
        if (!query) return true;
        return item.name.toLowerCase().indexOf(query) !== -1 ||
               item.cat.toLowerCase().indexOf(query) !== -1;
      });

      if (matches.length === 0) {
        resultsList.innerHTML = '<div class="search-empty-state">No products found matching "' + escapeHTML(query) + '".</div>';
        return;
      }

      var html = matches.map(function(item) {
        return [
          '<a class="search-result-item" href="' + item.file + '">',
          '  <img class="search-item-thumb" src="' + item.img + '" alt="' + escapeHTML(item.name) + '" loading="lazy">',
          '  <div class="search-item-info">',
          '    <div class="search-item-title">' + escapeHTML(item.name) + '</div>',
          '    <div class="search-item-cat">' + escapeHTML(item.cat) + '</div>',
          '  </div>',
          '  <span style="color:#bc944f;font-weight:bold">&rarr;</span>',
          '</a>'
        ].join('');
      }).join('');

      resultsList.innerHTML = html;
    }

    function escapeHTML(str) {
      return (str || '').replace(/[&<>"']/g, function(m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
      });
    }

    input.addEventListener('input', function() {
      renderResults(this.value);
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    window.openKotwariSearch = function() {
      modal.classList.add('is-active');
      renderResults('');
      setTimeout(function() { input.focus(); }, 100);
    };

    window.closeModal = function() {
      modal.classList.remove('is-active');
    };

    // Keyboard shortcut (Ctrl+K or Cmd+K or /)
    window.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.openKotwariSearch();
      }
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // Inject Sticky Mobile Quick Bar
  function injectMobileBar() {
    if (document.getElementById('kotwariMobileBar')) return;

    var bar = document.createElement('div');
    bar.id = 'kotwariMobileBar';
    bar.className = 'kotwari-mobile-bar';
    bar.innerHTML = [
      '<button type="button" class="btn-quick-search" onclick="openKotwariSearch()" aria-label="Search Catalog" title="Search">Search</button>',
      '<a class="btn-quick-wa" href="https://wa.me/919978648583?text=Hello%20Kotwari,%20I%20would%20like%20to%20enquire%20about%20dealership%20and%20products." target="_blank">WhatsApp Order</a>',
      '<a class="btn-quick-call" href="tel:+919978648583">Call Desk</a>'
    ].join('');

    document.body.appendChild(bar);
  }

  document.addEventListener('DOMContentLoaded', function() {
    injectSearchModal();
    injectMobileBar();
  });
})();

