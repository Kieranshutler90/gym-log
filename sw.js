// Simple offline support: network first, fall back to the last cached copy.
var CACHE = "gym-log-v60";
var CORE = ["./", "index.html", "manifest.webmanifest", "firebase-config.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url);
  // Never touch Firebase data or auth traffic. The Firebase SDK handles its own offline storage.
  if ((u.host.endsWith(".googleapis.com") && u.host !== "fonts.googleapis.com") || u.host.endsWith("firebaseio.com") ||
      u.pathname.indexOf("/recaptcha/") >= 0) return;
  e.respondWith(
    fetch(r).then(function (res) {
      if (res && (res.ok || res.type === "opaque")) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(r).then(function (m) { return m || caches.match("index.html"); });
    })
  );
});
