// Velvet Paw — Service Worker (offline cache for PWA)

const CACHE_VERSION = "v1";
const STATIC_CACHE = `velvet-static-${CACHE_VERSION}`;
const PAGE_CACHE = `velvet-pages-${CACHE_VERSION}`;

// Assets to pre-cache on install (stable paths only — not hashed chunks)
const PRECACHE_URLS = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // offline page may not exist yet — that's ok
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== STATIC_CACHE && k !== PAGE_CACHE).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // API routes — network only (don't cache AI responses)
  if (url.pathname.startsWith("/api/")) return;

  // Static assets served from _next/static, /fonts, /icons — cache first
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/manifest.json") ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        // Return cached, and update cache in background
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Navigation / HTML — network first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match("/offline") || new Response("离线中…", { status: 503 });
        })
    );
  }
});
