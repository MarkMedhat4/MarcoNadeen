/* ============================================================
   SCROLL REVEAL — used strategically: section headers and a
   handful of key blocks only, not every element on the page.
   ============================================================ */
(function () {
  const selector =
    ".section__head, .dress-code__block, .venue__media, .venue__copy, .rsvp__card";
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  targets.forEach((el) => el.classList.add("reveal"));

  if (window.prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
})();
