/* Blue Ridge Farmhouse Retreat — site script */

/* ============ SEASONAL HERO PHOTO ============
   The hero photo changes automatically by month.
   To change a season's photo: replace the file in /images/hero/
   with a new photo using the SAME file name (spring.jpg, summer.jpg,
   fall.jpg, winter.jpg), then re-upload the site.
   To change which months count as which season, edit the month
   numbers below (1 = January ... 12 = December).
   Preview any season by adding ?season=winter (or spring/summer/fall)
   to the end of the web address.                                     */
var SEASONS = {
  spring: { months: [3, 4, 5],    image: "images/hero/spring.jpg", position: "center 60%", label: "Spring at the farmhouse" },
  summer: { months: [6, 7, 8],    image: "images/hero/summer.jpg", position: "center 55%", label: "Summer by the pool" },
  fall:   { months: [9, 10, 11],  image: "images/hero/fall.jpg",   position: "center 45%", label: "Fall on the porch" },
  winter: { months: [12, 1, 2],   image: "images/hero/winter.jpg", position: "center 75%", label: "Winter in the valley" }
};

function currentSeason() {
  var q = new URLSearchParams(window.location.search).get("season");
  if (q && SEASONS[q]) return q;
  var m = new Date().getMonth() + 1;
  for (var k in SEASONS) { if (SEASONS[k].months.indexOf(m) !== -1) return k; }
  return "summer";
}

(function applySeason() {
  var s = currentSeason(), cfg = SEASONS[s];
  document.documentElement.setAttribute("data-season", s);
  document.querySelectorAll("[data-season-bg]").forEach(function (el) {
    el.style.backgroundImage = "url('" + cfg.image + "')";
    el.style.backgroundPosition = cfg.position;
  });
  document.querySelectorAll("[data-season-label]").forEach(function (el) { el.textContent = cfg.label; });
  // Preload so the swap is instant
  var img = new Image(); img.src = cfg.image;
})();

/* ============ HEADER ============ */
(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      header.classList.toggle("solid", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); header.classList.remove("solid"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }
})();

/* ============ PHOTO LIGHTBOX ============ */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
  var lb = document.querySelector(".lightbox");
  if (!items.length || !lb) return;
  var img = lb.querySelector("img"), cap = lb.querySelector(".lb-cap"), i = 0;
  function show(n) {
    i = (n + items.length) % items.length;
    var src = items[i].querySelector("img");
    img.src = src.getAttribute("src"); img.alt = src.alt; cap.textContent = src.alt;
  }
  items.forEach(function (b, n) { b.addEventListener("click", function () { show(n); lb.classList.add("open"); }); });
  lb.querySelector(".lb-close").addEventListener("click", function () { lb.classList.remove("open"); });
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(i - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(i + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.classList.remove("open"); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lb.classList.remove("open");
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
})();

/* ============ FOOTER YEAR ============ */
document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
