/**
 * Kotwari Universal PWA Install Prompt System
 * Works across Android Chrome, Desktop Chrome/Edge, and iOS/Safari
 * Fully decoupled from page routing; never interferes with link navigation.
 */
(function() {
  // If running in standalone (already installed), register SW and exit
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    registerSW();
    return;
  }

  // Check if dismissed within the last 3 days
  var dismissedTime = localStorage.getItem('kotwari_pwa_dismissed');
  if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10)) < (3 * 24 * 60 * 60 * 1000)) {
    registerSW();
    return;
  }

  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt(true);
  });

  function registerSW() {
    if ('serviceWorker' in navigator && window.location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function(err) {
        console.warn('SW registration info:', err);
      });
    }
  }

  function showInstallPrompt(isNativeCapable) {
    if (document.getElementById('kotwariInstallBanner')) return;

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    var banner = document.createElement('div');
    banner.id = 'kotwariInstallBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Install Kotwari App');

    var descText = isIOS
      ? 'Tap Share (⎋) and select "Add to Home Screen" for instant offline access.'
      : 'Install Kotwari on your desktop or home screen for fast access.';

    var installBtnText = isIOS ? 'How to Add ↗' : 'Install App &rarr;';

    banner.innerHTML = [
      '<div class="kotwari-install-content">',
      '  <img src="android-chrome-192x192.png" alt="Kotwari App Icon" class="kotwari-install-icon">',
      '  <div class="kotwari-install-text">',
      '    <div class="kotwari-install-title">Install Kotwari App</div>',
      '    <div class="kotwari-install-desc">' + descText + '</div>',
      '  </div>',
      '  <div class="kotwari-install-actions">',
      '    <button type="button" class="btn-install-dismiss" id="btnKotwariDismiss" aria-label="Not now">Later</button>',
      '    <button type="button" class="btn-install-accept" id="btnKotwariInstall">' + installBtnText + '</button>',
      '  </div>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.id = 'kotwariInstallBannerStyle';
    style.textContent = [
      '#kotwariInstallBanner {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  left: 50%;',
      '  transform: translateX(-50%) translateY(20px);',
      '  opacity: 0;',
      '  z-index: 100000;',
      '  width: min(540px, calc(100% - 32px));',
      '  background: #092840;',
      '  color: #ffffff;',
      '  border: 1.5px solid #bc944f;',
      '  border-radius: 16px;',
      '  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);',
      '  padding: 16px 20px;',
      '  font-family: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;',
      '  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;',
      '  backdrop-filter: blur(10px);',
      '  -webkit-backdrop-filter: blur(10px);',
      '}',
      '#kotwariInstallBanner.show {',
      '  transform: translateX(-50%) translateY(0);',
      '  opacity: 1;',
      '}',
      '.kotwari-install-content {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 16px;',
      '}',
      '.kotwari-install-icon {',
      '  width: 48px;',
      '  height: 48px;',
      '  border-radius: 12px;',
      '  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);',
      '  flex-shrink: 0;',
      '  background: #ffffff;',
      '}',
      '.kotwari-install-text {',
      '  flex: 1;',
      '  min-width: 0;',
      '}',
      '.kotwari-install-title {',
      '  font-weight: 700;',
      '  font-size: 0.98rem;',
      '  color: #ffffff;',
      '  margin-bottom: 2px;',
      '}',
      '.kotwari-install-desc {',
      '  font-size: 0.8rem;',
      '  color: #c2d4e0;',
      '  line-height: 1.4;',
      '}',
      '.kotwari-install-actions {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '  flex-shrink: 0;',
      '}',
      '.btn-install-dismiss {',
      '  background: transparent;',
      '  border: 1px solid rgba(255, 255, 255, 0.2);',
      '  color: #dfbf83;',
      '  padding: 8px 14px;',
      '  border-radius: 8px;',
      '  font-size: 0.82rem;',
      '  font-weight: 600;',
      '  cursor: pointer;',
      '  transition: background 0.2s;',
      '}',
      '.btn-install-dismiss:hover {',
      '  background: rgba(255, 255, 255, 0.08);',
      '}',
      '.btn-install-accept {',
      '  background: linear-gradient(135deg, #bc944f 0%, #dfbf83 100%);',
      '  border: none;',
      '  color: #092840;',
      '  padding: 8px 16px;',
      '  border-radius: 8px;',
      '  font-size: 0.82rem;',
      '  font-weight: 700;',
      '  cursor: pointer;',
      '  box-shadow: 0 4px 12px rgba(188, 148, 79, 0.35);',
      '  transition: transform 0.2s, box-shadow 0.2s;',
      '}',
      '.btn-install-accept:hover {',
      '  transform: translateY(-1px);',
      '  box-shadow: 0 6px 18px rgba(188, 148, 79, 0.5);',
      '}',
      '@media (max-width: 600px) {',
      '  #kotwariInstallBanner {',
      '    bottom: 16px;',
      '    padding: 14px 16px;',
      '  }',
      '  .kotwari-install-content {',
      '    flex-wrap: wrap;',
      '    gap: 12px;',
      '  }',
      '  .kotwari-install-actions {',
      '    width: 100%;',
      '    justify-content: flex-end;',
      '  }',
      '}'
    ].join('\n');

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Fade banner in smoothly after 1.8 seconds
    setTimeout(function() {
      banner.classList.add('show');
    }, 1800);

    var dismissBtn = document.getElementById('btnKotwariDismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function() {
        banner.classList.remove('show');
        setTimeout(function() { banner.remove(); }, 400);
        localStorage.setItem('kotwari_pwa_dismissed', Date.now().toString());
      });
    }

    var installBtn = document.getElementById('btnKotwariInstall');
    if (installBtn) {
      installBtn.addEventListener('click', function() {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function(choice) {
            if (choice.outcome === 'accepted') {
              localStorage.setItem('kotwari_pwa_dismissed', (Date.now() + 30 * 86400000).toString());
            }
            deferredPrompt = null;
          });
        } else {
          alert('To install Kotwari on your device:\n\n• On Chrome/Edge (Desktop): Click the install button (⊕) in your browser address bar.\n• On Android: Tap browser menu (⋮) and select "Add to Home screen" or "Install App".\n• On iPhone/iPad (Safari): Tap the Share button (⎋) and select "Add to Home Screen".');
        }
        banner.classList.remove('show');
        setTimeout(function() { banner.remove(); }, 400);
      });
    }
  }

  // Fallback trigger after 3.5 seconds if native beforeinstallprompt has not fired
  setTimeout(function() {
    if (!deferredPrompt && !document.getElementById('kotwariInstallBanner')) {
      showInstallPrompt(false);
    }
  }, 3500);

  registerSW();
})();
