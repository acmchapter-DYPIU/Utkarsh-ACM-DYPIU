// ======================================
// Universal Text Reveal
// ======================================

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".split-reveal").forEach((heading) => {

    const split = new SplitType(heading, {
        types: "chars"
    });

    gsap.set(split.chars, {
        yPercent: 110,
        opacity: 0
    });

    ScrollTrigger.create({
        trigger: heading,
        start: "top 85%",

        onEnter: () => reveal(split),
        onEnterBack: () => reveal(split)
    });

    function reveal(splitInstance) {

        gsap.killTweensOf(splitInstance.chars);

        gsap.set(splitInstance.chars, {
            yPercent: 110,
            opacity: 0
        });

        gsap.to(splitInstance.chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power4.out"
        });

    }

});