const CACHE_NAME = "purchasepilot-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match("./index.html"))
  );
});
