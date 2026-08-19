document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const navLinksList = document.getElementById("navLinks");
  const navCta = document.querySelector(".nav-cta");
  const navbarWrap = document.querySelector(".navbar-wrap");

  if (!toggle || !navLinksList) return;

  // Build the mobile dropdown panel once, from the same links already in the DOM.
  const panel = document.createElement("div");
  panel.className = "mobile-panel";
  panel.id = "mobilePanel";

  navLinksList.querySelectorAll("a").forEach((link) => {
    const clone = link.cloneNode(true);
    panel.appendChild(clone);
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
    const isOpen = toggle.classList.contains("is-open");
    isOpen ? closePanel() : openPanel();
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closePanel);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closePanel();
  });
});

function animateHeroTitle() {
    document.querySelectorAll(".animate-word").forEach((text) => {
        const split = new SplitType(text, {
            types: "chars"
        });

        gsap.from(split.chars, {
            opacity: 0,
            y: 80,
            rotationX: 180,
            scale: 0,
            duration: 0.9,
            stagger: 0.02,
            ease: "back.out(1.7)",
            onComplete: () => {
                split.revert();
            }
        });
    });
}


// =========================
// Hide Navbar on Scroll
// =========================

const navbar = document.querySelector(".navbar-wrap");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if (currentScroll <= 30) {

        gsap.to(navbar,{
            y:0,
            opacity:1,
            duration:0.35,
            overwrite:true
        });

    } else if (currentScroll > lastScroll) {

        gsap.to(navbar,{
            y:-140,
            opacity:0,
            duration:0.35,
            overwrite:true
        });

    } else {

        gsap.to(navbar,{
            y:0,
            opacity:1,
            duration:0.35,
            overwrite:true
        });

    }

    lastScroll = currentScroll;

});
// =========================
// Hero Floating Animation
// =========================

// Float the whole visual
gsap.to(".hero-visual", {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Make only the logo gently tilt
gsap.to(".acm-logo", {
    rotation: 3,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    transformOrigin: "50% 50%"
});

// Ring rotations
gsap.to(".ring-1", {
    rotation: 360,
    duration:40,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

gsap.to(".ring-2", {
    rotation: -360,
    duration:30,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

gsap.to(".ring-3", {
    rotation: 360,
    duration:22,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Breathing glow
gsap.to(".logo-glow", {
    scale: 1.15,
    opacity: 0.9,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


// =========================
// Magnetic Hero Button
// =========================

const heroMag = document.querySelector(".hero-mag");
const heroBtn = document.querySelector(".hero-cta");
const heroLabel = document.querySelector(".hero-label");

const strength = 0.4;
const labelStrength = 0.2;

if(heroMag){

    heroMag.addEventListener("mousemove",(e)=>{

        const rect = heroMag.getBoundingClientRect();

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

        gsap.to(heroBtn,{
            x:x*strength,
            y:y*strength,
            duration:.35,
            ease:"power3.out"
        });

        if(heroLabel){

            gsap.to(heroLabel,{
                x:x*labelStrength,
                y:y*labelStrength,
                duration:.35,
                ease:"power3.out"
            });

        }

    });

    heroMag.addEventListener("mouseleave",()=>{

        gsap.to(heroBtn,{
            x:0,
            y:0,
            duration:.8,
            ease:"elastic.out(1,0.45)"
        });

        if(heroLabel){

            gsap.to(heroLabel,{
                x:0,
                y:0,
                duration:.8,
                ease:"elastic.out(1,0.45)"
            });

        }

    });

}

// ======================================
// HERO MESH ANIMATION
// ======================================

// Rotate outer mesh
gsap.to(".outer-ring", {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 80,
    repeat: -1,
    ease: "none"
});

// Rotate inner mesh
gsap.to(".inner-ring", {
    rotation: -360,
    transformOrigin: "50% 50%",
    duration: 55,
    repeat: -1,
    ease: "none"
});

// Pulse every node independently
gsap.utils.toArray(".mesh-node").forEach((node) => {

    gsap.to(node, {

        scale: gsap.utils.random(1.2, 1.8),

        opacity: gsap.utils.random(0.4, 1),

        duration: gsap.utils.random(1.5, 3),

        repeat: -1,

        yoyo: true,

        delay: gsap.utils.random(0, 2),

        ease: "sine.inOut"

    });

});

// Rotate square nodes
gsap.utils.toArray(".mesh-square").forEach((square) => {

    gsap.to(square, {

        rotation: 360,

        transformOrigin: "50% 50%",

        duration: gsap.utils.random(8, 15),

        repeat: -1,

        ease: "none"

    });

});
gsap.set(".navbar-wrap",{
    opacity:0,
    y:-80
});

gsap.set(".hero",{
    opacity:0,
    y:40
});
const loaderPercentEl = document.getElementById("loaderPercent");
const progressObj = { val: 0 };
const tl = gsap.timeline();
tl.to(progressObj, {
    val: 100,
    duration: 2.6,
    ease: "power1.inOut",
    onUpdate: () => {
        if (loaderPercentEl) loaderPercentEl.textContent = Math.round(progressObj.val) + "%";
    }
}, 0);

tl.from(".loader-logo",{

    scale:0,

    rotation:180,

    opacity:0,

    duration:.9,

    ease:"back.out(1.7)"

})

.to(".loader-bg",{

    scale:1.4,

    duration:.8

},"<")

.to(".ring-1",{

    scale:1,

    opacity:1,

    duration:.5

})

.to(".ring-2",{

    scale:1,

    opacity:1,

    duration:.5

},"<.1")

.to(".ring-3",{

    scale:1,

    opacity:1,

    duration:.5

},"<.1")

.to(".loader-scene",{

    scale:6,

    duration:1.4,

    ease:"power4.inOut"

})

.to(".loader",{

    opacity:0,

    duration:.5

},"<.3")

.to(".navbar-wrap",{

    opacity:1,

    y:0,

    duration:.6

},"<")

.to(".hero",{

    opacity:1,

    y:0,

    duration:.7

},"<")

.call(()=>{

    document.querySelector(".loader").remove();

    animateHeroTitle();

});

gsap.to(".loader-mesh",{

    rotation:360,

    transformOrigin:"50% 50%",

    duration:30,

    repeat:-1,

    ease:"none"

});

gsap.to(".loader-node",{

    scale:1.35,

    duration:1.2,

    stagger:0.12,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});
