document.addEventListener("DOMContentLoaded", () => {

    if (window.matchMedia("(hover: none)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateRing(){
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = "a, button, .cta-btn, .btn, .mag-btn, .nav-cta, .contact-btn, .feature-card, .option-card, .team-card, .faculty-card";

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(hoverTargets)) {
            ring.classList.add("is-hovering");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(hoverTargets)) {
            ring.classList.remove("is-hovering");
        }
    });

    window.addEventListener("mousedown", () => {
        ring.classList.add("is-clicking");
        spawnRipple(mouseX, mouseY);
    });

    window.addEventListener("mouseup", () => {
        ring.classList.remove("is-clicking");
    });

    function spawnRipple(x, y){
        const ripple = document.createElement("div");
        ripple.className = "cursor-ripple";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        document.body.appendChild(ripple);

        if (window.gsap) {
            gsap.to(ripple, {
                width: 70,
                height: 70,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        } else {
            ripple.remove();
        }
    }

});