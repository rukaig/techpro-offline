/* ==========================================================================
   Offline Hash Router for TechPro.
   Works seamlessly under file://, http://localhost, and PWA.
   Routes are written like "/library/:lesson" and accessed as "#/library/:lesson".
   Existing "/path" links are intercepted and mapped to "#/path".
   ========================================================================== */
import { setPageTitle } from "./ui.js";

const routes = [];
let notFound = null;
let activeCleanup = null;
let lastRenderedHash = null;
let current = { path: "/", params: {}, query: new URLSearchParams() };
let started = false;

function compile(path) {
  const keys = [];
  const pattern = path
    .replace(/\/$/, "")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:(\w+)/g, (_, key) => {
      keys.push(key);
      return "([^/]+)";
    });
  return { regex: new RegExp(`^${pattern || "/"}/?$`), keys };
}

export function route(path, render, options = {}) {
  const { regex, keys } = compile(path);
  routes.push({ path, regex, keys, render, ...options });
}

export function setNotFound(render) {
  notFound = render;
}

export function to(path) {
  if (path.startsWith("#")) return path;
  return `#${path.startsWith("/") ? path : "/" + path}`;
}

export function match(pathname) {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const clean = cleanPath === "/index.html" ? "/" : cleanPath;
  for (const item of routes) {
    const found = item.regex.exec(clean);
    if (found) {
      const params = {};
      item.keys.forEach((key, index) => {
        params[key] = decodeURIComponent(found[index + 1]);
      });
      return { route: item, params };
    }
  }
  return null;
}

function parseCurrentLocation() {
  const rawHash = window.location.hash || "";
  let virtualPath = "/";
  let inPageAnchor = "";

  if (rawHash.startsWith("#/")) {
    virtualPath = rawHash.slice(1);
  } else if (rawHash.startsWith("#") && rawHash.length > 1) {
    // Check if it looks like a path or an in-page anchor
    if (rawHash.includes("/")) {
      virtualPath = rawHash.slice(1);
    } else {
      inPageAnchor = rawHash.slice(1);
    }
  } else if (!rawHash && window.location.protocol.startsWith("http")) {
    const p = window.location.pathname;
    if (p !== "/" && !p.endsWith("index.html")) {
      virtualPath = `${p}${window.location.search}`;
      window.location.replace(`#${virtualPath}`);
    }
  }

  // Parse path, query, and anchor
  try {
    const dummy = new URL(virtualPath.startsWith("/") ? virtualPath : `/${virtualPath}`, "https://techpro.local");
    return {
      pathname: dummy.pathname || "/",
      query: dummy.searchParams,
      anchor: inPageAnchor || (dummy.hash ? dummy.hash.slice(1) : "")
    };
  } catch {
    return {
      pathname: "/",
      query: new URLSearchParams(),
      anchor: ""
    };
  }
}

export function navigate(path, { replace = false, silent = false } = {}) {
  let clean = path;
  if (clean.startsWith("#/")) clean = clean.slice(1);
  else if (clean.startsWith("#")) clean = clean.slice(1);
  if (!clean.startsWith("/")) clean = `/${clean}`;

  const targetHash = `#${clean}`;
  if (window.location.hash === targetHash) {
    if (!silent) renderCurrent();
    return;
  }

  if (replace) {
    window.location.replace(targetHash);
  } else {
    window.location.hash = targetHash;
  }

  if (!silent) renderCurrent();
}

export function currentLocation() {
  return current;
}

export function reload() {
  renderCurrent();
}

async function renderCurrent() {
  const main = document.getElementById("main");
  if (!main) return;
  // Set this synchronously so the hashchange fired by navigate() is ignored
  // without dropping a genuine back/forward or manually typed route.
  lastRenderedHash = window.location.hash || "";
  if (typeof activeCleanup === "function") {
    try { activeCleanup(); } catch (error) { console.warn("Route cleanup failed", error); }
    activeCleanup = null;
  }

  const { pathname, query, anchor } = parseCurrentLocation();
  const found = match(pathname);
  current = {
    path: pathname,
    params: found?.params || {},
    query
  };

  document.body.dataset.route = pathname;
  try {
    const view = found
      ? await found.route.render({ params: current.params, query, path: pathname })
      : await renderNotFound();
    main.innerHTML = view?.html || "";
    if (view?.title) {
      setPageTitle(view.title);
    }
    if (typeof view?.mount === "function") {
      const maybeCleanup = await view.mount(main);
      if (typeof maybeCleanup === "function") activeCleanup = maybeCleanup;
    }
  } catch (error) {
    console.error(`Could not render route: ${pathname}`, error);
    main.innerHTML = `
      <section class="page-shell section" role="alert">
        <p class="eyebrow">Page could not load</p>
        <h1>Something went wrong opening this page.</h1>
        <p class="lede">Refresh the page or return to the home page. The error was recorded in the browser console.</p>
        <div class="cluster mt-4">
          <button class="btn btn-primary" type="button" onclick="location.reload()">Refresh page</button>
          <a class="btn btn-ghost" href="#/">Home</a>
        </div>
      </section>
    `;
  }

  window.dispatchEvent(new CustomEvent("techpro:routechange", {
    detail: { pathname }
  }));

  // In-page anchors (library headings, glossary links)
  if (anchor) {
    const target = document.getElementById(decodeURIComponent(anchor));
    if (target) {
      target.scrollIntoView({
        behavior: document.documentElement.dataset.motion === "reduced" ? "auto" : "smooth",
        block: "start"
      });
      return;
    }
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  const skip = document.querySelector(".skip-link");
  if (skip && document.activeElement !== skip) {
    const heading = main.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }
}

async function renderNotFound() {
  if (notFound) {
    const view = await notFound({ params: {}, query: new URLSearchParams() });
    return view;
  }
  return {
    title: "Page not found",
    html: `<div class="page-shell section">
      <p class="eyebrow">404</p>
      <h1>That bench is empty</h1>
      <p class="lede">The page you asked for does not exist. Head back to the library or the PC Lab.</p>
      <div class="cluster mt-4"><a class="btn btn-primary" href="#/library">Open the Library</a><a class="btn btn-ghost" href="#/">Back home</a></div>
    </div>`
  };
}

export function start() {
  if (started) return;
  started = true;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (/^https?:\/\//i.test(href)) {
      // External link - let browser handle
      return;
    }

    if (href.startsWith("#") && !href.startsWith("#/")) {
      // In-page anchor on the current view
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: document.documentElement.dataset.motion === "reduced" ? "auto" : "smooth",
          block: "start"
        });
      }
      return;
    }

    event.preventDefault();
    navigate(href);
  });

  window.addEventListener("hashchange", () => {
    if (window.location.hash === lastRenderedHash) return;
    renderCurrent();
  });

  // If accessed over http without hash, redirect to hash
  if (window.location.protocol.startsWith("http")) {
    const p = window.location.pathname;
    if (p !== "/" && !p.endsWith("index.html") && !window.location.hash) {
      window.location.replace(`#${p}${window.location.search}`);
      return;
    }
  }

  renderCurrent();
}
