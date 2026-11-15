const CACHE_NAME = 'kotwari-pwa-v2';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/kotwari_emblem_new.png',
  '/kotwari-pwa.js',
  '/dairy.html',
  '/water.html',
  '/eggs.html',
  '/fmcg.html',
  '/retail.html',
  '/exports.html',
  '/farmers.html',
  '/contact.html',
  '/about.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
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

// Stale-While-Revalidate caching strategy for optimal desktop & mobile performance
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip non-HTTP / browser extension requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting an HTML page, return cached index.html
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
