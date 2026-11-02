/* ==========================================================================
   Tiny history-API router.
   Routes look like "/library/:lesson" and render into #main.
   Every render returns { html, mount?, title?, cleanup? } where mount receives
   the rendered <main> element.
   ========================================================================== */

const routes = [];
let notFound = null;
let activeCleanup = null;
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
  const url = new URL(path, window.location.origin);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function match(pathname) {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const clean = cleanPath === "/index.html" ? "/" : cleanPath;
  for (const item of routes) {
    const found = item.regex.exec(clean);
    if (found) {
      const params = {};
      item.keys.forEach((key, index) => { params[key] = decodeURIComponent(found[index + 1]); });
      return { route: item, params };
    }
  }
  return null;
}

export function navigate(path, { replace = false, silent = false } = {}) {
  const target = to(path);
  if (target === `${window.location.pathname}${window.location.search}${window.location.hash}`) return;
  if (replace) window.history.replaceState({ techpro: true }, "", target);
  else window.history.pushState({ techpro: true }, "", target);
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
  if (typeof activeCleanup === "function") {
    try { activeCleanup(); } catch (error) { console.warn("Route cleanup failed", error); }
    activeCleanup = null;
  }
  const url = new URL(window.location.href);
  const found = match(url.pathname);
  const query = url.searchParams;
  current = {
    path: url.pathname,
    params: found?.params || {},
    query
  };

  document.body.dataset.route = url.pathname;
  try {
    const view = found ? await found.route.render({ params: current.params, query, path: url.pathname }) : await renderNotFound();
    main.innerHTML = view?.html || "";
    if (view?.title) {
      const { setPageTitle } = await import("./ui.js");
      setPageTitle(view.title);
    }
    if (typeof view?.mount === "function") {
      const maybeCleanup = await view.mount(main);
      if (typeof maybeCleanup === "function") activeCleanup = maybeCleanup;
    }
  } catch (error) {
    console.error(`Could not render route: ${url.pathname}`, error);
    main.innerHTML = `
      <section class="page-shell section" role="alert">
        <p class="eyebrow">Page could not load</p>
        <h1>Something went wrong opening this page.</h1>
        <p class="lede">Refresh the page or return to the home page. The error was recorded in the browser console.</p>
        <div class="cluster mt-4">
          <a class="btn btn-primary" href="${url.pathname}${url.search}">Refresh page</a>
          <a class="btn btn-ghost" href="/">Home</a>
        </div>
      </section>
    `;
  }

  window.dispatchEvent(new CustomEvent("techpro:routechange", {
    detail: { pathname: url.pathname }
  }));

  // In-page anchors (library headings, glossary links) should still work.
  if (url.hash) {
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (target) {
      target.scrollIntoView({ behavior: document.documentElement.dataset.motion === "reduced" ? "auto" : "smooth", block: "start" });
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
      <div class="cluster mt-4"><a class="btn btn-primary" href="/library">Open the Library</a><a class="btn btn-ghost" href="/">Back home</a></div>
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
    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;
    if (url.pathname.startsWith("/api/")) return;
    event.preventDefault();
    navigate(`${url.pathname}${url.search}${url.hash}`);
  });

  window.addEventListener("popstate", () => renderCurrent());
  renderCurrent();
}
