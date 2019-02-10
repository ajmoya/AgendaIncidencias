workbox.core.setCacheNameDetails({
    prefix: 'agendaIncidencias',
    suffix: 'v0.1',
    precache: 'install-time'
  });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


self.addEventListener('activate', function(event) {
    let cacheActual = workbox.core.precache.prefix + '-' + workbox.core.cacheNames.precache + '-' + workbox.core.cacheNames.suffix;
    var cacheWhitelist = [cacheActual];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(cacheName + ' => borrando caches antiguas..');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('activate', function(event) {
    let cacheActual = workbox.core.precache.prefix + '-' + workbox.core.cacheNames.precache + '-' + workbox.core.cacheNames.suffix;
    var cacheWhitelist = [cacheActual];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(cacheName + ' => borrando caches antiguas..');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


workbox.skipWaiting();
workbox.clientsClaim();
