const CACHE_NAME = 'sunnesia-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './img 5.png',
  './0.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Use catch to avoid failing the whole install if one file fails
        return Promise.all(urlsToCache.map(url => {
          return cache.add(url).catch(err => console.log('Failed to cache', url, err));
        }));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Update cache quietly in the background if fetch is successful
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // If offline or network fails, use cache
        return caches.match(event.request);
      })
  );
});
