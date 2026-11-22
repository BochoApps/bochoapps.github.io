// Caches the app's own static files so it loads fast. It never caches the game itself (rooms, cards): those always
// come from the server, and there's no playing offline.
const CACHE = "intuition-v1"
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())))
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith("/intuition/")) return
  const isStatic = /\/(assets|fonts|icons)\//.test(url.pathname)
  if (!isStatic) return // pages: always the network, so a new version shows at once
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const hit = await cache.match(e.request)
    if (hit) return hit
    const res = await fetch(e.request)
    if (res.ok) cache.put(e.request, res.clone())
    return res
  }))
})
