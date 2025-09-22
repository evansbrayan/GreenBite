// Service worker for PWA
// sw.js - simple service worker

const CACHE_NAME = "greenbite-cache-v1";
const FILES_TO_CACHE = [
  "/",                   // root
  "/index.html",
  "/recipes.html",
  "/calculator.html",
  "/workouts.html",
  "/mindfulness.html",
  "/contact.html",
  "/styles.css",
  "/main.js",
  "/image/pexels-karlsolano-2729899.jpg",
  "/logo.png",
  "/offline.html"        // you should create this page
];

// Install: cache all core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first with offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // fallback to offline.html if request is for a page
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
