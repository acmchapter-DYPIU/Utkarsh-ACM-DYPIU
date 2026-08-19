/* ======================================================
   FLOATING PARTICLES
====================================================== */

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 345; i++) {

for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("span");

    const size = Math.random() * 5 + 2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        Math.random() * 18 + 12 + "s";

    particle.style.animationDelay =
        Math.random() * 15 + "s";

    particle.style.opacity =
        Math.random() * .35 + .05;

    particleContainer.appendChild(particle);

}


/* ======================================================
   NODE NETWORK
====================================================== */

const canvas = document.getElementById("networkCanvas");

const ctx = canvas.getContext("2d");

let width;
let height;

const NODE_COUNT = 40;
const MAX_DISTANCE = 170;

let nodes = [];

function resizeCanvas(){

    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;

    canvas.width = width;
    canvas.height = height;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


/* ======================================================
   CREATE NODES
====================================================== */

class Node{

    constructor(){

        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.radius = Math.random() * 2 + 2;

        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;

    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0 || this.x > width)
            this.vx *= -1;

        if(this.y < 0 || this.y > height)
            this.vy *= -1;

    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ff6a00";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff6a00";

        ctx.fill();

    }

}


/* ======================================================
   GENERATE
====================================================== */

function generateNodes(){

    nodes = [];

    for(let i=0;i<NODE_COUNT;i++){

        nodes.push(new Node());

    }

}

generateNodes();


/* ======================================================
   CONNECT
====================================================== */

function connectNodes(){

    for(let a=0;a<nodes.length;a++){

        for(let b=a+1;b<nodes.length;b++){

            const dx = nodes[a].x - nodes[b].x;
            const dy = nodes[a].y - nodes[b].y;

            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < MAX_DISTANCE){

                ctx.beginPath();

                ctx.moveTo(nodes[a].x,nodes[a].y);

                ctx.lineTo(nodes[b].x,nodes[b].y);

                ctx.strokeStyle =
                `rgba(255,106,0,${
                    1-distance/MAX_DISTANCE
                })`;

                ctx.lineWidth = .8;

                ctx.stroke();

            }

        }

    }

}


/* ======================================================
   ANIMATION
====================================================== */

function animate(){

    ctx.clearRect(0,0,width,height);

    connectNodes();

    nodes.forEach(node=>{

        node.update();

        node.draw();

    });

    requestAnimationFrame(animate);

}

animate();


/*======================================================
        PREMIUM MOUSE GLOW
======================================================*/

const glow=document.querySelector(".mouse-glow");

let mouseX=window.innerWidth/2;
let mouseY=window.innerHeight/2;

let currentX=mouseX;
let currentY=mouseY;

window.addEventListener("mousemove",(e)=>{

    mouseX=e.clientX;
    mouseY=e.clientY;

});

function glowAnimation(){

    currentX+=(mouseX-currentX)*0.08;
    currentY+=(mouseY-currentY)*0.08;

    glow.style.left=currentX+"px";
    glow.style.top=currentY+"px";

    requestAnimationFrame(glowAnimation);

}

glowAnimation();


/* ======================================================
   SUBTLE NODE REACTION
====================================================== */

setInterval(()=>{

    nodes.forEach(node=>{

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;

        const dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < 120){

            node.x -= dx * .005;
            node.y -= dy * .005;

        }

    });

},16);
/*======================================================
    ABOUT TEXT REVEAL
======================================================*/
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".reveal-text").forEach((text) => {

    const split = new SplitType(text, {
        types: "chars"
    });

    gsap.fromTo(
        split.chars,
        {
            opacity: 0,
            y: 25,
            filter: "blur(8px)"
        },
        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.015,
            ease: "none",

            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                end: "bottom 45%",
                scrub: true
            }
        }
    );

});


/*======================================================
    HERO TITLE REVEAL
======================================================*/

const hero = document.querySelector(".hero-title");

if (hero) {

    const split = new SplitType(hero, {
        types: "lines"
    });

    gsap.fromTo(
        split.lines,
        {
            rotationX: -90,
            opacity: 0,
            y: 80,
            transformOrigin: "50% 50% -120px"
        },
        {
            rotationX: 0,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.18,

            scrollTrigger: {
                trigger: hero,
                start: "top 80%",
                end: "bottom 35%",
                scrub: true
            }
        }
    );

}
/*======================================================
        MAGNETIC FEATURE CARDS
======================================================*/

gsap.utils.toArray(".feature-card").forEach((card)=>{

    const text = card.querySelector("span");

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        gsap.to(card,{

            x:x*0.18,
            y:y*0.18,

            duration:.45,

            ease:"power3.out",

            overwrite:"auto"

        });

        gsap.to(text,{

            x:x*0.28,
            y:y*0.28,

            duration:.45,

            ease:"power3.out",

            overwrite:"auto"

        });

    });

    card.addEventListener("mouseleave",()=>{

        gsap.to(card,{

            x:0,
            y:0,

            duration:.9,

            ease:"elastic.out(1,.4)"

        });

        gsap.to(text,{

            x:0,
            y:0,

            duration:.9,

            ease:"elastic.out(1,.4)"

        });

    });

});

gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.9 },
        {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".feature-grid",
                start: "top 85%"
            }
        }
    );
});

/* ==========================================================
   PHASE 3 — FLOATING PARTICLES INSIDE FEATURE CARDS
========================================================== */

document.querySelectorAll(".feature-card").forEach((card) => {

    const noise = document.createElement("div");
    noise.className = "card-noise";
    card.appendChild(noise);

    const particleLayer = document.createElement("div");
    particleLayer.className = "card-particles";
    card.appendChild(particleLayer);

    const particleCount = 6;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("span");
        p.className = "card-particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";
        particleLayer.appendChild(p);
        particles.push(p);
    }

    card.addEventListener("mouseenter", () => {
        if (!window.gsap) return;
        particles.forEach((p) => {
            gsap.to(p, {
                opacity: 0.7,
                y: -30 - Math.random() * 20,
                x: (Math.random() - 0.5) * 30,
                duration: 1.4 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                overwrite: "auto"
            });
        });
    });

    card.addEventListener("mouseleave", () => {
        if (!window.gsap) return;
        particles.forEach((p) => {
            gsap.to(p, { opacity: 0, duration: 0.5, overwrite: "auto" });
            gsap.killTweensOf(p);
        });
    });

});

/* ==========================================================
   PHASE 3 — SCROLL MORPH TRANSITION (About -> Events)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.querySelector(".about");
    const eventsSection = document.querySelector(".events");

    if (!aboutSection || !eventsSection || !window.gsap) return;

    const divider = document.createElement("div");
    divider.className = "morph-divider";
    aboutSection.after(divider);

    gsap.timeline({
        scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            end: "top 40%",
            scrub: true
        }
    })
    .to(divider, {
        width: "60%",
        ease: "none"
    })
    .to(aboutSection, {
        opacity: 0.4,
        scale: 0.98,
        ease: "none"
    }, "<");

});
