document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const navLinksList = document.getElementById("navLinks");
  const navCta = document.querySelector(".nav-cta");
  const navbarWrap = document.querySelector(".navbar-wrap");

  if (!toggle || !navLinksList) return;

  const panel = document.createElement("div");
  panel.className = "mobile-panel";
  panel.id = "mobilePanel";

  navLinksList.querySelectorAll("a").forEach((link) => {
    panel.appendChild(link.cloneNode(true));
  });

  if (navCta) {
    const ctaClone = navCta.cloneNode(true);
    ctaClone.classList.add("mobile-cta");
    panel.appendChild(ctaClone);
  }

  document.body.appendChild(panel);

  function closePanel() {
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-visible");
    navbarWrap.classList.remove("is-open");
  }
  function openPanel() {
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-visible");
    navbarWrap.classList.add("is-open");
  }

  toggle.addEventListener("click", () => {
    toggle.classList.contains("is-open") ? closePanel() : openPanel();
  });

  panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", closePanel));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closePanel();
  });
});