document.addEventListener("DOMContentLoaded", () => {

    if (window.matchMedia("(hover: none)").matches) return;

    const selectors = ".feature-card, .option-card, .team-card, .faculty-card";
    const cards = document.querySelectorAll(selectors);

    cards.forEach((card) => {
        card.classList.add("tilt-card", "spotlight-zone", "beam-border");

        const glare = document.createElement("div");
        glare.className = "tilt-glare";
        card.appendChild(glare);

        const maxTilt = 8;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;

            const tiltX = (py - 0.5) * -maxTilt;
            const tiltY = (px - 0.5) * maxTilt;

            if (window.gsap) {
                gsap.to(card, {
                    rotationX: tiltX,
                    rotationY: tiltY,
                    duration: 0.4,
                    ease: "power2.out",
                    transformPerspective: 800
                });
            } else {
                card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            card.style.setProperty("--glare-x", `${px * 100}%`);
            card.style.setProperty("--glare-y", `${py * 100}%`);
            card.style.setProperty("--spot-x", `${px * 100}%`);
            card.style.setProperty("--spot-y", `${py * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
            if (window.gsap) {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.6,
                    ease: "elastic.out(1,0.5)"
                });
            } else {
                card.style.transform = "none";
            }
        });
    });

});