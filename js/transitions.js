document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href$=".html"], a[href^="index.html"]');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (link.target === "_blank" || href.startsWith("#")) return;

            e.preventDefault();
            gsap.to("body", {
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
});