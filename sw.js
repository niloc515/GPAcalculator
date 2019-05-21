let APP_PREFIX = 'GPAcalculator'     // Identifier for this app (this needs to be consistent across every cache update)
let VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
let CACHE_NAME = APP_PREFIX + VERSION
let URLS = [                            // URLs to be cached
'/{repository}/',                     
'/{repository}/index.html'            
]

self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('gpaCalculator').then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          './css/gpawithstyle.css',
          './js/gpa.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          './images/favicon.ico'
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