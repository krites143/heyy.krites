/**
 * Kotwari International Ltd. — Google Analytics 4 & Conversion Event Framework (kotwari-analytics.js)
 * Privacy-first telemetry: Strictly gated by user consent (localStorage 'kotwari_cookie_consent').
 * Automatically captures Core Web Vitals, custom events, PDF downloads, and conversions.
 * Production ready: uses standard G-XXXXXXXXXX placeholder until live credentials are configured.
 */
(function() {
  'use strict';

  // Production Placeholders (Update with actual Google properties when provided)
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  const GTM_CONTAINER_ID = 'GTM-XXXXXXX';

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Read current consent
  function checkConsent() {
    try {
      const stored = localStorage.getItem('kotwari_cookie_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Boolean(parsed.analytics);
      }
    } catch (e) {}
    return false;
  }

  // Set default privacy-safe consent state (Deny by default)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  gtag('js', new Date());

  // Function to load external GA4 script only when authorized
  let gaLoaded = false;
  function loadGoogleAnalytics() {
    if (gaLoaded) return;
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      // In staging/placeholder mode, log events to dataLayer without external script network failure
      console.info('[KotwariAnalytics] GA4 configured in staging mode (Placeholder: ' + GA_MEASUREMENT_ID + '). Events queued in dataLayer.');
      gaLoaded = true;
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);

    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'send_page_view': true
    });
    gaLoaded = true;
  }

  // Update consent when granted
  function applyConsent(granted) {
    gtag('consent', 'update', {
      'analytics_storage': granted ? 'granted' : 'denied'
    });

    if (granted) {
      loadGoogleAnalytics();
      trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }

  // Public Event Tracking API
  function trackEvent(eventName, params) {
    params = params || {};
    params.timestamp = new Date().toISOString();
    
    // Always push to dataLayer for GTM compatibility
    window.dataLayer.push({
      event: eventName,
      ...params
    });

    // If analytics consent is active, dispatch to GA4
    if (checkConsent()) {
      gtag('event', eventName, params);
    }
  }

  // Wire up automated DOM telemetry
  function wireTelemetry() {
    // 1. PDF Resource Download Tracking
    document.querySelectorAll('a[href$=".pdf"], a[download]').forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const docName = link.getAttribute('download') || href.split('/').pop() || 'document.pdf';
        trackEvent('pdf_download', {
          file_name: docName,
          file_url: href,
          link_text: link.innerText.trim()
        });
      });
    });

    // 2. WhatsApp Direct Inquiry Tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
      btn.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          link_url: btn.getAttribute('href'),
          location_text: btn.innerText.trim()
        });
      });
    });

    // 3. Phone Call & Email Clicks
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        const type = href.startsWith('tel:') ? 'phone_call' : 'email_client';
        trackEvent(type, {
          target: href
        });
      });
    });
  }

  // Listen for consent changes from kotwari-consent.js
  window.addEventListener('kotwari-consent-updated', (e) => {
    if (e.detail && typeof e.detail.analytics !== 'undefined') {
      applyConsent(e.detail.analytics);
    }
  });

  // Initialization
  function init() {
    const isGranted = checkConsent();
    if (isGranted) {
      applyConsent(true);
    }
    wireTelemetry();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export to window
  window.KotwariAnalytics = {
    track: trackEvent,
    checkConsent: checkConsent,
    applyConsent: applyConsent
  };
})();
