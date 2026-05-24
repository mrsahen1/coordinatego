const CACHE_CLEANER_NAME = 'coordinate-go-cache-cleaner';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await self.registration.unregister();
    clientsList.forEach(client => {
      if (client.url) client.navigate(client.url);
    });
  })());
});
