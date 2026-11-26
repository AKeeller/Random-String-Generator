// Increment this cache version whenever a release changes an offline asset.
const CACHE_NAME = 'random-string-v20';
const APP_FILES = [
  './',
  './index.html',
  './styles.css?v=19',
  './app.js',
  './manifest.webmanifest',
  './icon.svg',
  './apple-touch-icon-167.png',
  './apple-touch-icon.png',
  './pwa-icon-192.png',
  './pwa-icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)),
      self.skipWaiting()
    ])
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
