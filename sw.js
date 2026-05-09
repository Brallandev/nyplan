const CACHE   = 'nyc-trip-v5';
const ORIGIN  = self.location.origin;              // https://brallandev.github.io
const BASE    = ORIGIN + '/';
const INDEX   = BASE + 'index.html';

// These MUST be cached — if any fail the SW aborts install
const CRITICAL = [
  INDEX,
  BASE + 'styles.css',
  BASE + 'app.js',
  BASE + 'data.js',
  BASE + 'manifest.json',
];

// Nice-to-have — cached opportunistically, never block install
const OPTIONAL = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

// ── Install ───────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      await c.addAll(CRITICAL);                     // hard fail if any 404
      for (const url of OPTIONAL) {
        try { await c.add(url); } catch (_) {}      // ignore CDN failures
      }
    }).then(() => self.skipWaiting())
  );
});

// ── Activate ──────────────────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  // Navigation requests (home screen launch, page load, deep links)
  // → always serve the cached index.html so the app never shows 404.
  // Falls back to network if cache somehow empty.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.open(CACHE)
        .then(c => c.match(INDEX))
        .then(cached => cached || fetch(INDEX))
    );
    return;
  }

  // All other requests: cache-first, populate on miss
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            c.put(e.request, res.clone());
          }
          return res;
        });
      })
    )
  );
});

// ── Notification click ────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow(INDEX);
    })
  );
});
