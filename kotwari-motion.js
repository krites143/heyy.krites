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
  // 2. HERO SECTION CHOREOGRAPHY
  // ═══════════════════════════════════════════════════════════════
  function initHeroEntrance() {
    var hero = document.querySelector('.hero, .hero-section, #home, header + main > section:first-of-type');
    if (!hero) return;

    if (prefersReducedMotion) {
      hero.classList.add('km-hero-active');
      return;
    }

    // Auto-tag hero children with stagger classes if not set
    var targets = hero.querySelectorAll('.eyebrow, .hero-badge, h1, .lead, p.lead, p.muted, .actions, .cta-group, .hero-card, .brand-emblem-img, .emblem-badge');
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
  // 9. MOBILE NAVIGATION SMOOTH POLISH
  // ═══════════════════════════════════════════════════════════════
  function initMobileMenuPolish() {
    var menuBtn = document.querySelector('.menu, button[aria-controls="navigation"], .menu-toggle');
    var nav = document.querySelector('nav#navigation, header nav, .nav-menu');
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', function () {
      var isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('open', !isExpanded);
      document.body.classList.toggle('nav-locked', !isExpanded);
    });

    // Close on navigation link click
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.classList.remove('nav-locked');
      });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global handle for dynamic content refreshes
  window.KotwariMotion = {
    refresh: function () {
      initScrollReveals();
      initCounters();
      initHeroEntrance();
    }
  };
})();
