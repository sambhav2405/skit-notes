const CACHE_NAME = 'notes-hub-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Only intercept navigation requests for offline fallback
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response("Offline - Check Internet Connection. Please connect to the internet to use Notes Hub.", {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        // For API calls (like Google Apps Script) and assets, just fetch normally
        // without the offline wrapper so real errors (like CORS) can be caught by the app.
        event.respondWith(fetch(event.request));
    }
});
