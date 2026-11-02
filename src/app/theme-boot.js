/* Runs before first paint so a saved theme never flashes. */
(function () {
  var darkFirst = ["neon", "blueprint", "pixel", "lofi", "contrast"];
  var themes = ["editorial", "marshmallow", "candy", "neon", "blueprint", "pixel", "lofi", "mint", "contrast"];
  var darkColors = {
    editorial: "#2b1d16", marshmallow: "#ffe1e9", candy: "#8a0a58",
    neon: "#040a17", blueprint: "#0d3358", pixel: "#141625", lofi: "#211b17",
    mint: "#0f3d39", contrast: "#000000"
  };
  var lightColors = {
    editorial: "#f2eee5", marshmallow: "#fdf1f4", candy: "#fff2fa",
    neon: "#eefbff", blueprint: "#eef6fd", pixel: "#f7f0dc", lofi: "#f8f0e4",
    mint: "#f5fcfa", contrast: "#ffffff"
  };
  function read(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (error) { return fallback; }
  }
  function resolve(choice) {
    if (choice === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return choice === "dark" ? "dark" : "light";
  }
  try {
    var theme = read("tp:theme", "editorial");
    if (themes.indexOf(theme) < 0) theme = "editorial";
    var choice = read("tp:mode", darkFirst.indexOf(theme) >= 0 ? "dark" : "light");
    var mode = resolve(choice);
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.mode = mode;
    root.dataset.modeChoice = choice;
    root.dataset.motion = read("tp:motion", "full") === "reduced" ? "reduced" : "full";
    root.dataset.fontscale = read("tp:fontscale", "1");
    var color = (mode === "dark" ? darkColors[theme] : lightColors[theme]) || lightColors[theme];
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", color);
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", function () {
        if ((localStorage.getItem("tp:mode") || "light") === "system") {
          var next = resolve("system");
          root.dataset.mode = next;
          var nextColor = (next === "dark" ? darkColors[theme] : lightColors[theme]) || lightColors[theme];
          if (meta) meta.setAttribute("content", nextColor);
        }
      });
    }
  } catch (error) {
    document.documentElement.dataset.theme = "editorial";
    document.documentElement.dataset.mode = "light";
  }
})();
