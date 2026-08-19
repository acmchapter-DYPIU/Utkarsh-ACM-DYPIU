document.addEventListener("DOMContentLoaded", () => {

    const heroSection = document.querySelector(".hero");
    const heroInner = document.querySelector(".hero-inner");
    const heroVisual = document.querySelector(".hero-visual");
    const acmLogo = document.querySelector(".acm-logo");
    const logoGlow = document.querySelector(".logo-glow");
    const meshSvg = document.querySelector(".mesh-svg");
    const outerRing = document.querySelector(".outer-ring");
    const innerRing = document.querySelector(".inner-ring");

    if (!heroSection) return;

    let mouseX = 0;
    let mouseY = 0;
    let normX = 0;
    let normY = 0;

    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        normX = (mouseX / rect.width - 0.5) * 2;
        normY = (mouseY / rect.height - 0.5) * 2;

        /* ---------- Camera Parallax ---------- */
        if (window.gsap && heroInner) {
            gsap.to(heroInner, {
                x: normX * 12,
                y: normY * 8,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        }

        /* ---------- Logo Reaction ---------- */
        if (window.gsap && acmLogo) {
            gsap.to(acmLogo, {
                rotation: normX * 8,
                x: normX * 6,
                y: normY * 6,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto"
            });
        }

        if (window.gsap && logoGlow) {
            gsap.to(logoGlow, {
                scale: 1 + Math.abs(normX) * 0.15 + Math.abs(normY) * 0.15,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto"
            });
        }

        /* ---------- Mesh Reaction ---------- */
        if (window.gsap && meshSvg) {
            gsap.to(meshSvg, {
                x: normX * 14,
                y: normY * 10,
                duration: 0.7,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    });

    heroSection.addEventListener("mouseleave", () => {
        if (!window.gsap) return;

        gsap.to(heroInner, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.5)" });
        gsap.to(acmLogo, { rotation: 0, x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.5)" });
        gsap.to(logoGlow, { scale: 1, duration: 1, ease: "elastic.out(1,0.5)" });
        gsap.to(meshSvg, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.5)" });
    });

    /* ==========================================================
       ACCELERATE RINGS ON HOVER
    ========================================================== */

    let ringTweens = [];

    function speedUpRings() {
        if (!window.gsap) return;
        ringTweens.forEach(t => t.kill());
        ringTweens = [];

        ringTweens.push(gsap.to(".ring-1", { rotation: "+=360", duration: 12, repeat: -1, ease: "none", overwrite: "auto" }));
        ringTweens.push(gsap.to(".ring-2", { rotation: "-=360", duration: 9, repeat: -1, ease: "none", overwrite: "auto" }));
        ringTweens.push(gsap.to(".ring-3", { rotation: "+=360", duration: 6, repeat: -1, ease: "none", overwrite: "auto" }));
    }

    function normalSpeedRings() {
        if (!window.gsap) return;
        ringTweens.forEach(t => t.kill());
        ringTweens = [];

        ringTweens.push(gsap.to(".ring-1", { rotation: "+=360", duration: 40, repeat: -1, ease: "none", overwrite: "auto" }));
        ringTweens.push(gsap.to(".ring-2", { rotation: "-=360", duration: 30, repeat: -1, ease: "none", overwrite: "auto" }));
        ringTweens.push(gsap.to(".ring-3", { rotation: "+=360", duration: 22, repeat: -1, ease: "none", overwrite: "auto" }));
    }

    if (heroVisual) {
        heroVisual.addEventListener("mouseenter", speedUpRings);
        heroVisual.addEventListener("mouseleave", normalSpeedRings);
    }

    /* ==========================================================
       NEURAL PULSES — travel along mesh connection lines
    ========================================================== */

    const heroMesh = document.querySelector(".hero-mesh");
    const connections = document.querySelectorAll(".mesh-connection");

    if (heroMesh && connections.length > 0 && window.gsap) {

        function spawnPulse() {
            const line = connections[Math.floor(Math.random() * connections.length)];
            const x1 = parseFloat(line.getAttribute("x1"));
            const y1 = parseFloat(line.getAttribute("y1"));
            const x2 = parseFloat(line.getAttribute("x2"));
            const y2 = parseFloat(line.getAttribute("y2"));

            const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pulse.setAttribute("r", "3.5");
            pulse.setAttribute("fill", "#ff6a00");
            pulse.setAttribute("cx", x1);
            pulse.setAttribute("cy", y1);
            pulse.style.filter = "drop-shadow(0 0 6px rgba(255,120,0,.9))";

            meshSvg.appendChild(pulse);

            gsap.to(pulse, {
                attr: { cx: x2, cy: y2 },
                duration: 1.4,
                ease: "power1.inOut",
                onComplete: () => pulse.remove()
            });

            gsap.fromTo(pulse,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 1 }
            );
        }

        setInterval(spawnPulse, 450);
    }

});