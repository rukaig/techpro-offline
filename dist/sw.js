const CACHE_NAME = "techpro-v2-offline";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/styles.css",
  "./assets/techpro-mark.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/games/pc-lab.js",
  "./assets/fonts/atkinson-400.woff2",
  "./assets/fonts/atkinson-700.woff2",
  "./assets/fonts/baloo2-500.woff2",
  "./assets/fonts/baloo2-800.woff2",
  "./assets/fonts/fonts.css",
  "./assets/fonts/jetbrains-mono-400.woff2",
  "./assets/fonts/jetbrains-mono-700.woff2",
  "./assets/fonts/nunito-400.woff2",
  "./assets/fonts/nunito-700.woff2",
  "./assets/fonts/nunito-800.woff2",
  "./assets/fonts/press-start-400.woff2",
  "./assets/fonts/roboto-condensed-400.woff2",
  "./assets/fonts/roboto-condensed-700.woff2",
  "./assets/fonts/source-serif-400-italic.woff2",
  "./assets/fonts/source-serif-400.woff2",
  "./assets/fonts/source-serif-600.woff2",
  "./assets/module/application-software.webp",
  "./assets/module/cooling-system.webp",
  "./assets/module/deped-cavite.webp",
  "./assets/module/desktop-computer.webp",
  "./assets/module/device-driver.webp",
  "./assets/module/expansion-card.webp",
  "./assets/module/firmware.webp",
  "./assets/module/hardware-and-software.webp",
  "./assets/module/laptop-computer.webp",
  "./assets/module/motherboard.webp",
  "./assets/module/operating-system.webp",
  "./assets/module/power-supply-unit.webp",
  "./assets/module/processor.webp",
  "./assets/module/ram-module.webp",
  "./assets/module/safety-reminder.webp",
  "./assets/module/server-computer.webp",
  "./assets/module/solid-state-drive.webp",
  "./assets/module/storage-drive.webp",
  "./assets/module/tablet-computer.webp",
  "./assets/module/technician-reminder.webp",
  "./assets/module/utility-software.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
