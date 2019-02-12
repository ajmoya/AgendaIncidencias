workbox.core.setCacheNameDetails({
    prefix: 'agendaIncidencias',
    suffix: 'v0.2',
    precache: 'install-time'
  });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['agendaIncidencias-install-time-v0.2'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(cacheName + ' => borrando caches antiguas...');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

workbox.skipWaiting();
workbox.clientsClaim();
