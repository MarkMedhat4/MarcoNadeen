/* ============================================================
   CUSTOM CURSOR — desktop pointer devices only
   ============================================================ */
(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  document.body.classList.add("has-custom-cursor");

  let raf = null;
  document.addEventListener("mousemove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      raf = null;
    });
  });

  const hoverTargets = "a, button, .gallery__item, input, textarea";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add("is-active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove("is-active");
  });

  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
})();
