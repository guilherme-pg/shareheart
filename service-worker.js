var cacheName = 'pwaTeste+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        
        '.images/icons/background.png',
        '.images/icons/favicon.png',
        '.images/icons/logo.png',
        '.images/icons/16.png',
        '.images/icons/32.png',
        '.images/icons/40.png',
        '.images/icons/50.png',
        '.images/icons/60.png',
        '.images/icons/80.png',
        '.images/icons/180.png',
        '.images/icons/1024.png',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});