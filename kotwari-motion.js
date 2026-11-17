/**
 * Kotwari International Ltd. — Advanced Motion & Interaction Engine
 * File: kotwari-motion.js
 * Hardware-accelerated interactions, scroll progress, hero choreography,
 * count-up metrics, page transitions, and micro-interactions.
 */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════════════════════════════
  // 1. SCROLL PROGRESS INDICATOR (GPU ScaleX)
  // ═══════════════════════════════════════════════════════════════
  function initScrollProgress() {
    if (prefersReducedMotion) return;

    var bar = document.getElementById('km-scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'km-scroll-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.prepend(bar);
    }

    var ticking = false;
    function updateProgress() {
      var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        var progress = Math.min(Math.max(window.scrollY / scrollTotal, 0), 1);
        bar.style.transform = 'scaleX(' + progress + ')';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. HERO SECTION CHOREOGRAPHY & CINEMATIC HEADLINES
  // ═══════════════════════════════════════════════════════════════
  function splitHeadlineWords(el) {
    if (prefersReducedMotion) return;
    try {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim().length > 0) {
          textNodes.push(node);
        }
      }

      var wordIndex = 0;
      textNodes.forEach(function (textNode) {
        var words = textNode.nodeValue.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        words.forEach(function (w) {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else if (w.length > 0) {
            var maskSpan = document.createElement('span');
            maskSpan.className = 'km-word-mask';
            var wordSpan = document.createElement('span');
            wordSpan.className = 'km-word';
            wordSpan.textContent = w;
            wordSpan.style.transitionDelay = (0.10 + (wordIndex * 0.055)) + 's';
            maskSpan.appendChild(wordSpan);
            frag.appendChild(maskSpan);
            wordIndex++;
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      });
    } catch (e) {
      // Fallback: leave text untouched on any parsing anomaly
    }
  }

  function initHeroEntrance() {
    var hero = document.querySelector('.hero, .hero-section, #home, header + main > section:first-of-type');
    if (!hero) return;

    if (prefersReducedMotion) {
      hero.classList.add('km-hero-active');
      return;
    }

    // Word-by-word reveal for hero headline
    var h1 = hero.querySelector('h1');
    if (h1 && !h1.getAttribute('data-km-split')) {
      h1.setAttribute('data-km-split', 'true');
      splitHeadlineWords(h1);
    }

    // Auto-tag hero children with stagger classes if not set
    var targets = hero.querySelectorAll('.eyebrow, .hero-badge, h1, .lead, p.lead, p.muted, .actions, .cta-group, .hero-card, .brand-emblem-img, .emblem-badge, .hero-trust-bar');
    targets.forEach(function (el) {
      if (!el.classList.contains('km-hero-stagger')) {
        el.classList.add('km-hero-stagger');
      }
    });

    // Tag background hero image for cinematic drift if available
    var heroImg = hero.querySelector('.hero-photo, .hero-img, img.hero-bg');
    if (heroImg && !heroImg.classList.contains('km-hero-cinematic')) {
      heroImg.classList.add('km-hero-cinematic');
    }

    // Trigger staggered entrance after browser paint
    window.requestAnimationFrame(function () {
      setTimeout(function () {
        hero.classList.add('km-hero-active');
        document.body.classList.add('km-loaded');
      }, 50);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. SCROLL-DRIVEN REVEAL SYSTEM (IntersectionObserver)
  // ═══════════════════════════════════════════════════════════════
  function initScrollReveals() {
    // Auto-tag common content sections if not tagged
    var autoTargets = document.querySelectorAll('main > section:not(.hero):not(.hero-section):not(#home), .timeline-item, .faq-item, .features-grid > div, .doc-card, .resource-card');
    autoTargets.forEach(function (el) {
      if (!el.classList.contains('reveal') && !el.classList.contains('km-reveal')) {
        el.classList.add('km-reveal');
      }
    });

    var revealElements = document.querySelectorAll('.km-reveal, .km-reveal-up, .km-reveal-scale, .km-reveal-stagger, .km-img-reveal, .reveal, .reveal-stagger');
    if (!revealElements.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('is-revealed', 'is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed', 'is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. VERIFIED STATISTICS ANIMATED COUNTERS
  // ═══════════════════════════════════════════════════════════════
  function initCounters() {
    if (prefersReducedMotion) return;

    var counterElements = document.querySelectorAll('.stat-box strong, .stat strong, .stat-num, .glance strong, .hero-card strong, [data-counter], .counter-num');
    if (!counterElements.length) return;

    function animateCounter(el) {
      var raw = el.getAttribute('data-original-val') || el.textContent.trim();
      if (!el.getAttribute('data-original-val')) {
        el.setAttribute('data-original-val', raw);
      }

      var match = raw.match(/([0-9,.]+)/);
      if (!match) return;

      var numStr = match[1].replace(/,/g, '');
      var targetNum = parseFloat(numStr);
      if (isNaN(targetNum) || targetNum <= 0) return;

      var prefix = raw.substring(0, match.index);
      var suffix = raw.substring(match.index + match[0].length);
      var isFloat = numStr.indexOf('.') !== -1;
      var decimals = isFloat ? numStr.split('.')[1].length : 0;

      var duration = 1400; // 1.4s smooth roll
      var startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);
        // Exponential ease-out curve
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = ease * targetNum;

        var displayVal = isFloat
          ? current.toFixed(decimals)
          : Math.floor(current).toLocaleString('en-IN');

        el.textContent = prefix + displayVal + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = raw; // Exact final string guaranteed
        }
      }

      window.requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      counterElements.forEach(function (el) {
        counterObserver.observe(el);
      });
    } else {
      counterElements.forEach(animateCounter);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. INTERACTIVE BUSINESS ECOSYSTEM FLOW
  // ═══════════════════════════════════════════════════════════════
  function initEcosystemFlow() {
    var flowContainer = document.querySelector('.flow');
    var stages = document.querySelectorAll('.stage');
    var flowDetail = document.querySelector('.flow-detail');
    if (!stages.length || !flowDetail) return;

    var stageTitle = document.getElementById('stage-title');
    var stageCopy = document.getElementById('stage-copy');
    var stageLink = document.getElementById('stage-link');

    // Stage route mappings
    var stageLinks = [
      'farmers.html',     // 01 Farmers
      'fpo.html',         // 02 FPO Network
      'farmers.html#collection', // 03 Collection
      'dairy.html',       // 04 Quality & Processing
      'about.html',       // 05 Kotwari Brand
      'exports.html',     // 06 Distribution
      'retail.html',      // 07 Retail & Consumers
      'exports.html'      // 08 Global Markets
    ];

    function activateStage(index, button) {
      stages.forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
      button.setAttribute('aria-pressed', 'true');

      // Soft transition
      flowDetail.classList.add('km-stage-fade');
      setTimeout(function () {
        var rawText = button.textContent.replace(/^[0-9]+\s*/, '').trim();
        if (stageTitle) stageTitle.textContent = rawText;

        // Dynamic stage copy fallbacks if stage-copy exists
        var stageData = [
          'Village-level agriculture and primary farming communities anchoring high-quality raw sourcing.',
          'Producer organisations coordinating bulk aggregation, farmer empowerment, and digital traceability.',
          'Decentralised collection hubs bridging farm gates to temperature-controlled logistics.',
          'World-class grading, cold-chain processing, and certified hygienic packaging standards.',
          'An integrated national and international consumer brand rooted in agricultural integrity.',
          'Modern ambient and refrigerated warehousing moving supply to institutional buyers.',
          'Kotwari One retail hypermarkets and partner grocery shelves serving daily households.',
          'Scaling Indian agri-produce and value-added consumer goods to GCC and global markets.'
        ];

        if (stageCopy && stageData[index]) {
          stageCopy.textContent = stageData[index];
        }

        if (stageLink && stageLinks[index]) {
          stageLink.href = stageLinks[index];
        }

        flowDetail.classList.remove('km-stage-fade');
      }, 180);
    }

    stages.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        activateStage(idx, btn);
      });

      // Keyboard arrow navigation
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' && stages[idx + 1]) {
          stages[idx + 1].focus();
          activateStage(idx + 1, stages[idx + 1]);
        } else if (e.key === 'ArrowLeft' && stages[idx - 1]) {
          stages[idx - 1].focus();
          activateStage(idx - 1, stages[idx - 1]);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. SEAMLESS PAGE TRANSITIONS (Zero White-Flash)
  // ═══════════════════════════════════════════════════════════════
  function initPageTransitions() {
    if (prefersReducedMotion) return;

    var transitionEl = document.getElementById('km-page-transition');
    if (!transitionEl) {
      transitionEl = document.createElement('div');
      transitionEl.id = 'km-page-transition';
      transitionEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(transitionEl);
    }

    // Reset overlay on page load & bfcache restoration
    window.addEventListener('pageshow', function () {
      transitionEl.classList.remove('is-active');
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      var target = link.getAttribute('target');

      // Only transition internal HTML routes
      if (!href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        target === '_blank' ||
        link.hasAttribute('download') ||
        href.endsWith('.pdf')) {
        return;
      }

      // Check same-origin or relative
      if (link.hostname && link.hostname !== window.location.hostname) return;

      e.preventDefault();
      transitionEl.classList.add('is-active');

      setTimeout(function () {
        window.location.href = href;
      }, 220);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. FORM MICRO-INTERACTIONS & FEEDBACK
  // ═══════════════════════════════════════════════════════════════
  function initFormFeedback() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (!submitBtn) return;

      form.addEventListener('submit', function () {
        if (!form.checkValidity()) return;

        // Micro-spinner feedback
        if (submitBtn.tagName.toLowerCase() === 'button') {
          var originalContent = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="km-spinner"></span> Processing...';

          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
          }, 2400);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. RESOURCE DOWNLOAD MICRO-INTERACTIONS
  // ═══════════════════════════════════════════════════════════════
  function initDownloadFeedback() {
    var toast = document.createElement('div');
    toast.className = 'km-download-toast';
    toast.id = 'km-download-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A15B" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> <span>Official Document Downloaded</span>';
    document.body.appendChild(toast);

    var pdfLinks = document.querySelectorAll('a[href$=".pdf"], a[download]');
    pdfLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toast.classList.add('is-visible');
        setTimeout(function () {
          toast.classList.remove('is-visible');
        }, 3200);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 9. ENTERPRISE MOBILE NAVIGATION SYSTEM
  // ═══════════════════════════════════════════════════════════════
  var mobileMenuState = {
    isOpen: false
  };

  function updateMobileMenuUI(isOpen) {
    mobileMenuState.isOpen = isOpen;
    var nav = document.querySelector('nav#navigation, header nav, .header-nav, .nav-menu');
    var btn = document.querySelector('.menu, .mobile-nav-toggle, #menuToggle, #mobileNavToggle, [aria-controls="navigation"]');
    var backdrop = document.getElementById('kmNavBackdrop');
    var header = document.querySelector('header');

    if (btn) {
      btn.setAttribute('aria-expanded', String(isOpen));
      var textEl = btn.querySelector('.km-menu-text');
      if (textEl) {
        var lang = document.documentElement.lang || 'en';
        var labels = {
          en: { menu: 'Menu', close: 'Close' },
          hi: { menu: 'मेनू', close: 'बंद करें' },
          ar: { menu: 'القائمة', close: 'إغلاق' }
        };
        var current = labels[lang] || labels.en;
        textEl.textContent = isOpen ? current.close : current.menu;
      } else {
        if (btn.innerHTML.indexOf('&#10005;') !== -1 || btn.innerHTML.indexOf('Menu') !== -1 || btn.innerHTML.indexOf('Close') !== -1) {
          btn.innerHTML = isOpen ? '&#10005; Close' : '&#9776; Menu';
        }
      }
    }

    if (nav) {
      if (isOpen) {
        nav.classList.add('open', 'mobile-open', 'is-open');
      } else {
        nav.classList.remove('open', 'mobile-open', 'is-open');
      }
    }

    if (header) {
      header.classList.toggle('km-nav-active', isOpen);
    }

    if (backdrop) {
      backdrop.classList.toggle('is-active', isOpen);
    }

    document.body.classList.toggle('km-nav-locked', isOpen);
    document.documentElement.classList.toggle('km-nav-locked', isOpen);
  }

  function openMobileMenu() {
    updateMobileMenuUI(true);
  }

  function closeMobileMenu() {
    updateMobileMenuUI(false);
  }

  function toggleMobileMenu() {
    var nav = document.querySelector('nav#navigation, header nav, .header-nav, .nav-menu');
    var isOpen = nav ? (nav.classList.contains('open') || nav.classList.contains('mobile-open') || nav.classList.contains('is-open')) : mobileMenuState.isOpen;
    updateMobileMenuUI(!isOpen);
  }

  function syncMenuFromDOM() {
    var nav = document.querySelector('nav#navigation, header nav, .header-nav, .nav-menu');
    if (!nav) return;
    var isOpen = nav.classList.contains('open') || nav.classList.contains('mobile-open') || nav.classList.contains('is-open');
    updateMobileMenuUI(isOpen);
  }

  function initMobileMenuPolish() {
    // Create or locate the backdrop overlay
    var backdrop = document.getElementById('kmNavBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'kmNavBackdrop';
      backdrop.className = 'km-nav-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    // Global Event Delegation for mobile menu toggles
    if (!window._kmNavDelegationBound) {
      window._kmNavDelegationBound = true;
      document.addEventListener('click', function (e) {
        // 1. Tapping backdrop closes menu
        if (e.target && (e.target.id === 'kmNavBackdrop' || e.target.classList.contains('km-nav-backdrop'))) {
          e.preventDefault();
          closeMobileMenu();
          return;
        }

        // 2. Tapping any link inside open mobile navigation closes menu
        var navLink = e.target.closest('nav#navigation a, header nav a, .header-nav a, .nav-menu a');
        if (navLink && mobileMenuState.isOpen) {
          closeMobileMenu();
          return;
        }

        // 3. Tapping the hamburger button toggles menu
        var menuBtn = e.target.closest('.menu, .mobile-nav-toggle, #menuToggle, #mobileNavToggle, [aria-controls="navigation"], .menu-toggle');
        if (menuBtn) {
          if (menuBtn.classList.contains('menu') && !menuBtn.classList.contains('mobile-nav-toggle')) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
          } else {
            setTimeout(syncMenuFromDOM, 10);
          }
        }
      });
    }

    // Keyboard navigation: Escape key closes menu
    if (!window._kmNavEscapeBound) {
      window._kmNavEscapeBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenuState.isOpen) {
          closeMobileMenu();
          var btn = document.querySelector('.menu, .mobile-nav-toggle, #menuToggle, #mobileNavToggle');
          if (btn) btn.focus();
        }
      });
    }

    // Close menu when viewport resizes above mobile breakpoint (900px)
    if (!window._kmNavResizeBound) {
      window._kmNavResizeBound = true;
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && mobileMenuState.isOpen) {
          closeMobileMenu();
        }
      }, { passive: true });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 10. STICKY HEADER ELEVATION ON SCROLL
  // ═══════════════════════════════════════════════════════════════
  function initStickyHeader() {
    var header = document.querySelector('header');
    if (!header) return;

    var isScrolled = false;
    function checkScroll() {
      var current = window.scrollY > 30;
      if (current !== isScrolled) {
        isScrolled = current;
        header.classList.toggle('is-scrolled', isScrolled);
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ═══════════════════════════════════════════════════════════════
  // 11. SUBTLE HARDWARE-ACCELERATED DESKTOP PARALLAX
  // ═══════════════════════════════════════════════════════════════
  function initDesktopParallax() {
    if (prefersReducedMotion) return;
    if (window.innerWidth < 1024 || !window.matchMedia('(hover: hover)').matches) return;

    var heroPhoto = document.querySelector('.hero-photo, .hero-img, .hero-bg-img, .km-parallax');
    if (!heroPhoto) return;

    var ticking = false;
    function updateParallax() {
      var scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        var offset = Math.round(scrollY * 0.12);
        heroPhoto.style.transform = 'translate3d(0, ' + offset + 'px, 0) scale(1.04)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 12. BUTTON & LINK DIRECTIONAL ARROW MICRO-INTERACTIONS
  // ═══════════════════════════════════════════════════════════════
  function initButtonArrows() {
    var buttons = document.querySelectorAll('.btn, .product-catalog-btn, .card .btn, a.btn');
    buttons.forEach(function (btn) {
      if (btn.querySelector('.arrow, .arrow-diagonal')) return;
      var html = btn.innerHTML;
      if (html.indexOf('↗') !== -1) {
        btn.innerHTML = html.replace('↗', '<span class="arrow-diagonal" aria-hidden="true">↗</span>');
      } else if (html.indexOf('→') !== -1) {
        btn.innerHTML = html.replace('→', '<span class="arrow" aria-hidden="true">→</span>');
      } else if (html.indexOf('&rarr;') !== -1) {
        btn.innerHTML = html.replace('&rarr;', '<span class="arrow" aria-hidden="true">&rarr;</span>');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function init() {
    initScrollProgress();
    initHeroEntrance();
    initScrollReveals();
    initCounters();
    initEcosystemFlow();
    initPageTransitions();
    initFormFeedback();
    initDownloadFeedback();
    initMobileMenuPolish();
    initStickyHeader();
    initDesktopParallax();
    initButtonArrows();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global handle for dynamic content refreshes
  window.KotwariMotion = {
    openMobileMenu: openMobileMenu,
    closeMobileMenu: closeMobileMenu,
    toggleMobileMenu: toggleMobileMenu,
    refresh: function () {
      initScrollReveals();
      initCounters();
      initHeroEntrance();
      initButtonArrows();
      initDesktopParallax();
      initMobileMenuPolish();
    }
  };
})();
