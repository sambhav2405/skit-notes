const CACHE_NAME = 'notes-hub-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic pass-through for now, just to satisfy PWA install requirements
    event.respondWith(fetch(event.request).catch(() => {
        return new Response("Offline - Check Internet Connection");
    }));
});