/* ============================================================
   INVITATION OPENING — the invitation itself is the interaction.
   One motion: click/tap → the cover opens from the center seam.
   ============================================================ */
(function () {
  const gate = document.getElementById("gate");
  const trigger = document.getElementById("invitation-trigger");
  if (!gate || !trigger) return;

  const reduced = window.prefersReducedMotion;
  const OPEN_MS = reduced ? 40 : 950;
  const CLOSE_DELAY_MS = reduced ? 20 : 550;

  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;
    trigger.setAttribute("aria-disabled", "true");

    gate.classList.add("is-card-open");

    window.setTimeout(() => {
      gate.classList.add("gate--closed");
      gate.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lock-scroll");

      document.dispatchEvent(new CustomEvent("invitation:opened"));

      // Move focus to the hero for keyboard/screen-reader users
      const hero = document.getElementById("home");
      if (hero) {
        hero.setAttribute("tabindex", "-1");
        hero.focus({ preventScroll: true });
      }
    }, OPEN_MS + CLOSE_DELAY_MS);
  }

  trigger.addEventListener("click", openInvitation);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      openInvitation();
    }
  });

  // Lock scroll until the invitation opens
  document.body.classList.add("lock-scroll");
})();
