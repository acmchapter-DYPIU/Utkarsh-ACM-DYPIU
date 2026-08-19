
// =========================
// Magnetic Buttons
// =========================

const zones = document.querySelectorAll(".mag-zone");

const eventsMagStrength = 0.35;
const eventsLabelStrength = 0.18;

zones.forEach(zone=>{

    const btn = zone.querySelector(".mag-btn");
    const label = btn.querySelector(".label");

    zone.addEventListener("mousemove",(e)=>{

        const rect = zone.getBoundingClientRect();

        const x = gsap.utils.mapRange(
            rect.left,
            rect.right,
            -rect.width/2,
            rect.width/2,
            e.clientX
        );

        const y = gsap.utils.mapRange(
            rect.top,
            rect.bottom,
            -rect.height/2,
            rect.height/2,
            e.clientY
        );

        gsap.to(btn,{
            x:x*eventsMagStrength,
            y:y*eventsMagStrength,
            duration:.35,
            ease:"power3.out",
            overwrite:"auto"
        });

        gsap.to(label,{
            x:x*eventsLabelStrength,
            y:y*eventsLabelStrength,
            duration:.35,
            ease:"power3.out",
            overwrite:"auto"
        });

    });

    zone.addEventListener("mouseleave",()=>{

        gsap.to(btn,{
            x:0,
            y:0,
            duration:.8,
            ease:"elastic.out(1,0.45)"
        });

        gsap.to(label,{
            x:0,
            y:0,
            duration:.8,
            ease:"elastic.out(1,0.45)"
        });

    });

});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".option-card").forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
            opacity: 1, x: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".options-grid",
                start: "top 85%"
            }
        }
    );
});

/* ==========================================================
   PHASE 4 — OPTION CARD GLOW LAYER
========================================================== */

document.querySelectorAll(".option-card").forEach((card) => {
    const glow = document.createElement("div");
    glow.className = "option-glow-layer";
    card.insertBefore(glow, card.firstChild);
});

/* ==========================================================
   PHASE 4 — EVENT META STAGGER ON SCROLL
========================================================== */

if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".event-meta").forEach((meta) => {
        const items = meta.querySelectorAll(".event-meta-item");

        gsap.fromTo(items,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: meta,
                    start: "top 88%"
                }
            }
        );
    });
}

/* ==========================================================
   PHASE 4 — EMPTY STATE HOLOGRAM SCAN
========================================================== */

document.querySelectorAll(".event-visual").forEach((visual) => {

    const scanLabel = document.createElement("div");
    scanLabel.className = "hologram-scan";
    scanLabel.innerHTML = `<span class="scan-text">Scanning</span><span class="hologram-dots"><span></span><span></span><span></span></span>`;
    visual.appendChild(scanLabel);

    const beam = document.createElement("div");
    beam.className = "scan-beam";
    visual.appendChild(beam);

    if (window.gsap) {
        gsap.to(beam, {
            top: "100%",
            duration: 2.4,
            repeat: -1,
            ease: "sine.inOut",
            yoyo: true
        });

        gsap.to(".hologram-dots span", {
            opacity: 1,
            stagger: {
                each: 0.25,
                repeat: -1,
                yoyo: true
            },
            duration: 0.4
        });
    }

    let scanState = 0;
    const scanTextEl = scanLabel.querySelector(".scan-text");


    setInterval(() => {
        scanState = (scanState + 1) % states.length;
        scanTextEl.textContent = states[scanState];
    }, 2200);

});
