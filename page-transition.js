(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const overlay = document.createElement("div");
  overlay.className = "page-transition is-visible";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  let navigating = false;
  const hideOverlay = () => overlay.classList.remove("is-visible");

  if (reducedMotion) {
    hideOverlay();
  } else {
    window.setTimeout(hideOverlay, 80);
  }

  document.addEventListener("click", (event) => {
    if (reducedMotion || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname) return;

    event.preventDefault();
    if (navigating) return;
    navigating = true;
    overlay.classList.add("is-leaving");
    window.setTimeout(() => window.location.assign(destination.href), 520);
  });
})();