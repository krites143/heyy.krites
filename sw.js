// Kotwari Service Worker (PWA)
// Safe network-first strategy for HTML pages ensuring page navigation is never hijacked
const CACHE_NAME = 'kotwari-pwa-v3';

// Only precache immutable static branding assets
const PRECACHE_STATIC_ASSETS = [
  './site.webmanifest',
  './favicon.svg',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './kotwari_emblem_new.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_STATIC_ASSETS).catch((err) => {
        console.warn('Precache partial fallback:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip non-HTTP schemes (chrome-extension, data, blob, file)
  if (!url.protocol.startsWith('http')) return;

  // 1. FOR HTML PAGES / NAVIGATION REQUESTS:
  // ALWAYS NETWORK-FIRST! Never redirect to index.html or intercept subpages!
  if (event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network succeeded, optionally cache this specific page
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: try to serve the EXACT requested page from cache if previously visited
          return caches.match(event.request);
        })
    );
    return;
  }

  // 2. FOR STATIC IMAGES, ICONS, FONTS, CSS, JS:
  // Stale-While-Revalidate for fast loading and offline resilience
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, nothing to do if not in cache
        });

      return cachedResponse || fetchPromise;
    })
  );
});
