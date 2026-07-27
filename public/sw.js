const SCRIPT_PATH = new URL(self.location.href).pathname;
const BASE_PATH = SCRIPT_PATH.replace(/\/sw\.js$/, "");
const CACHE_NAMESPACE = `build-loop:${BASE_PATH || "/"}:`;
const CACHE_NAME = `${CACHE_NAMESPACE}v7`;
const withBasePath = (path) => `${BASE_PATH}${path}`;
const isWithinBasePath = (pathname) =>
  BASE_PATH === "" ||
  pathname === BASE_PATH ||
  pathname.startsWith(`${BASE_PATH}/`);
const CORE = ["/", "/overview/", "/start/", "/join/", "/day/1/"].map(withBasePath);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith(CACHE_NAMESPACE) && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !isWithinBasePath(url.pathname) ||
    url.pathname.startsWith(withBasePath("/api/"))
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((cached) => cached || caches.match(withBasePath("/"))),
      ),
  );
});
