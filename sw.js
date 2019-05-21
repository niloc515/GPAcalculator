self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('gpaCalculator').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/gpawithstyle.css',
          '/js/gpa.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          '/images/favicon.ico'
        ]);
      })
    );
   });

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});