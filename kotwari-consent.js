/**
 * Kotwari International Ltd. — Universal Cookie & Privacy Consent Suite (kotwari-consent.js)
 * Enterprise-grade privacy preferences manager with granular category controls.
 * Adheres to privacy-first standards; respects user autonomy and persists selections.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'kotwari_cookie_consent';

  // Read current consent state
  function getStoredConsent() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      if (val) {
        return JSON.parse(val);
      }
    } catch (e) {}
    return null;
  }

  function saveConsent(state) {
    try {
      const payload = {
        essential: true, // Always true
        analytics: Boolean(state.analytics),
        functional: Boolean(state.functional),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('kotwari-consent-updated', { detail: payload }));
    } catch (e) {}
  }

  // Ensure CSS is injected
  function ensureCSS() {
    if (!document.querySelector('link[href*="kotwari-consent.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'kotwari-consent.css';
      document.head.appendChild(link);
    }
  }

  // Create & Render Banner
  function renderBanner() {
    if (document.getElementById('kotwari-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'kotwari-consent-banner';
    banner.className = 'kotwari-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie and Privacy Consent');

    banner.innerHTML = `
      <div class="consent-banner-text">
        <strong>Privacy &amp; Cookie Preferences:</strong> We use strictly essential cookies for core functionality and privacy-first analytics to measure page visits without invasive tracking. Review our <a href="privacy.html">Privacy Policy</a> and <a href="cookie-policy.html">Cookie Policy</a>.
      </div>
      <div class="consent-btn-group">
        <button type="button" class="consent-btn consent-btn-accept" id="consentAcceptAll">Accept All</button>
        <button type="button" class="consent-btn consent-btn-decline" id="consentRejectOptional">Essential Only</button>
        <button type="button" class="consent-btn-customize" id="consentOpenCustom">Customize Settings</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Event listeners
    document.getElementById('consentAcceptAll').addEventListener('click', () => {
      saveConsent({ analytics: true, functional: true });
      dismissBanner();
    });

    document.getElementById('consentRejectOptional').addEventListener('click', () => {
      saveConsent({ analytics: false, functional: false });
      dismissBanner();
    });

    document.getElementById('consentOpenCustom').addEventListener('click', () => {
      openCustomModal();
    });

    // Animate entrance
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 400);
  }

  function dismissBanner() {
    const banner = document.getElementById('kotwari-consent-banner');
    if (banner) {
      banner.classList.remove('is-visible');
      setTimeout(() => banner.remove(), 400);
    }
  }

  // Create & Render Customization Modal
  function openCustomModal() {
    let overlay = document.getElementById('kotwari-consent-modal');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'kotwari-consent-modal';
      overlay.className = 'kotwari-consent-modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Cookie Preferences');

      overlay.innerHTML = `
        <div class="kotwari-consent-modal-dialog" onclick="event.stopPropagation()">
          <div class="consent-modal-header">
            <div>
              <h3>Cookie &amp; Privacy Preferences</h3>
              <p style="font-size:0.85rem;color:#737B83;margin:0">Manage and customize your data privacy choices across Kotwari International websites.</p>
            </div>
            <button type="button" class="consent-modal-close" id="consentModalClose" aria-label="Close preferences">✕</button>
          </div>

          <div class="consent-category-card">
            <div class="consent-category-top">
              <span class="consent-category-name">Strictly Necessary Cookies</span>
              <span class="consent-badge-locked">Always Active</span>
            </div>
            <p class="consent-category-desc">
              Essential for core site navigation, secure transactions, language preservation, and CSRF protection. Cannot be disabled.
            </p>
          </div>

          <div class="consent-category-card">
            <div class="consent-category-top">
              <span class="consent-category-name">Privacy-First Analytics</span>
              <label class="consent-switch">
                <input type="checkbox" id="consentToggleAnalytics">
                <span class="consent-slider"></span>
              </label>
            </div>
            <p class="consent-category-desc">
              Helps us aggregate page traffic metrics, popular commodity inquiries, and response speed without collecting personally identifiable information.
            </p>
          </div>

          <div class="consent-category-card">
            <div class="consent-category-top">
              <span class="consent-category-name">Functional &amp; Trade Features</span>
              <label class="consent-switch">
                <input type="checkbox" id="consentToggleFunctional">
                <span class="consent-slider"></span>
              </label>
            </div>
            <p class="consent-category-desc">
              Enables persistence of form drafts, export product selections, and customized WhatsApp direct routing settings.
            </p>
          </div>

          <div class="consent-modal-actions">
            <button type="button" class="consent-btn consent-btn-decline" id="consentRejectAllModal">Reject Optional</button>
            <button type="button" class="consent-btn consent-btn-accept" id="consentSavePreferences">Save My Preferences</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      overlay.addEventListener('click', closeCustomModal);
      document.getElementById('consentModalClose').addEventListener('click', closeCustomModal);

      document.getElementById('consentRejectAllModal').addEventListener('click', () => {
        saveConsent({ analytics: false, functional: false });
        closeCustomModal();
        dismissBanner();
      });

      document.getElementById('consentSavePreferences').addEventListener('click', () => {
        const analytics = document.getElementById('consentToggleAnalytics').checked;
        const functional = document.getElementById('consentToggleFunctional').checked;
        saveConsent({ analytics: analytics, functional: functional });
        closeCustomModal();
        dismissBanner();
      });
    }

    // Populate current state
    const current = getStoredConsent() || { analytics: false, functional: false };
    const aToggle = document.getElementById('consentToggleAnalytics');
    const fToggle = document.getElementById('consentToggleFunctional');
    if (aToggle) aToggle.checked = Boolean(current.analytics);
    if (fToggle) fToggle.checked = Boolean(current.functional);

    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomModal() {
    const overlay = document.getElementById('kotwari-consent-modal');
    if (overlay) {
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  // Wire up footer / settings triggers
  function wireSettingsLinks() {
    document.querySelectorAll('a[href="#cookie-settings"], a[href="#cookies"], [data-open-cookie-settings]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openCustomModal();
      });
    });

    // Also match links with text "Cookie Settings" or "Cookie Preferences"
    document.querySelectorAll('footer a, .footer-bottom a').forEach(a => {
      const text = a.textContent.trim().toLowerCase();
      if (text === 'cookie settings' || text === 'cookies' || text === 'cookie preferences') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          openCustomModal();
        });
      }
    });
  }

  // Initialize
  function init() {
    ensureCSS();
    wireSettingsLinks();

    const consent = getStoredConsent();
    if (!consent) {
      setTimeout(renderBanner, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.KotwariConsent = {
    openModal: openCustomModal,
    getConsent: getStoredConsent,
    setConsent: saveConsent
  };
})();
