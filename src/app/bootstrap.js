const app = document.getElementById("app");

import("/src/app/main.js").catch((error) => {
  console.error("TechPro could not start.", error);
  if (!app) return;
  app.innerHTML = `
    <main class="page-shell section" role="alert">
      <p class="eyebrow">TechPro could not start</p>
      <h1>We could not load the workbench.</h1>
      <p class="lede">Refresh the page. If the problem continues, ask your teacher or site administrator for help.</p>
      <a class="btn btn-primary mt-4" href="">Refresh page</a>
    </main>
  `;
});
