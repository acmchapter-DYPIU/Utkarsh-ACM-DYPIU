// ---------------------------------------------------------
// Team data
// ---------------------------------------------------------
// `image` should point to a photo in an /images folder, e.g. "images/samratth.jpg".
// Leave it as null to show an initials placeholder instead.
// `linkedin` set to null means "no profile available" — the icon renders
// disabled instead of linking out.

const team = [
  {
  name: "Samratth Singh",
  role: "Chair",
  image: "images/chair.jpg",
  linkedin: "https://www.linkedin.com/in/samratth-singh-0b9b29279/"
},
{
  name: "Lakshit Saini",
  role: "Vice Chair",
  image: "images/vicechair.jpg",
  imagePosition: "center 15%",
  linkedin: "https://www.linkedin.com/in/lakshit-saini1306/"
},
{
  name: "Faiza Bagban",
  role: "Treasurer",
  image: "images/treasurer.jpg",
  linkedin: "https://www.linkedin.com/in/faiza-bagban-624a42297/"
},
{
  name: "Lubdha Desale",
  role: "Design Team Head",
  image: "images/design.jpg",
  linkedin: "https://www.linkedin.com/in/lubdha-desale-44a85730b/"
},
{
  name: "Sakshi Singh",
  role: "Content Writing Head",
  image: "images/content.jpg",
  linkedin: "https://www.linkedin.com/in/sakshi-singh-a4465b219/"
},
{
  name: "Saloni Bhandari",
  role: "Social Media Head",
  image: "images/social.jpg",
  linkedin: "https://www.linkedin.com/in/saloni-bhandari-aiml/"
},
{
  name: "Avani Patil",
  role: "Technical Team Head",
  image: "images/tech.jpg",
  linkedin: "https://www.linkedin.com/in/avanipatil30/"
},
{
  name: "Sakshi Kolhe",
  role: "Logistic Team Head",
  image: "images/logistics.jpg",
  linkedin: "https://www.linkedin.com/in/sakshikolhe309/"
},
{
  name: "Premla Mishra",
  role: "Documentation Head",
  image: "images/documentation.jpg",
  linkedin: "https://www.linkedin.com/in/premlamishra/"
},
{
  name: "Nirmitee Pawar",
  role: "Organization Head",
  image: "images/organization.jpg",
  linkedin: "https://www.linkedin.com/in/nirmitee-p-ab9235306/"
},
];

// ---------------------------------------------------------
// Faculty data
// ---------------------------------------------------------
const faculty = [
  { name: "Ms. Hetal Thaker",       role: "Faculty Sponsor",         image: "images/faculty1.jpg", linkedin: "https://www.linkedin.com/in/mrshetalthaker/" },
  { name: "Dr. Maheshwari Biradar", role: "Faculty Incharge, SoCSEA",             image: "images/faculty2.jpg", linkedin: "https://www.linkedin.com/in/dr-maheshwari-biradar-82b89419b/" },
  { name: "Dr. Rahul Sharma",       role: "Director, SoCSEA",        image: "images/faculty3.jpg", linkedin: null },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter((part) => part && !part.includes("."))
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

function linkedInIconSVG() {
  return `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.6"/>
      <path d="M7.5 10.2V16.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="7.5" cy="7.2" r="0.3" fill="currentColor"/>
      <path d="M11 16.8V12.9C11 11.4 11.9 10.2 13.3 10.2C14.6 10.2 15.5 11.1 15.5 12.7V16.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 10.4V16.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;
}

function renderLinkedInIcon(person) {
  if (person.linkedin) {
    return `
      <a class="linkedin-icon" href="${person.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${person.name} on LinkedIn">
        ${linkedInIconSVG()}
      </a>`;
  }
  return `
    <span class="linkedin-icon is-disabled" aria-label="LinkedIn not available" title="LinkedIn not available">
      ${linkedInIconSVG()}
    </span>`;
}

function renderTeam() {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;

  const cards = team.map((member) => {
    const posStyle = member.imagePosition ? ` style="object-position:${member.imagePosition}"` : "";
    const avatarContent = member.image
      ? `<img src="${member.image}" alt="${member.name}"${posStyle}>`
      : `<span class="avatar-initials">${getInitials(member.name)}</span>`;

    return `
      <article class="team-card">
        <div class="avatar">${avatarContent}</div>
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <div class="card-footer">
          ${renderLinkedInIcon(member)}
        </div>
      </article>`;
  });

  grid.innerHTML = cards.join("");
}

function renderFaculty() {
  const grid = document.getElementById("facultyGrid");
  if (!grid) return;

  const cards = faculty.map((person) => {
    const avatarContent = person.image
      ? `<img src="${person.image}" alt="${person.name}">`
      : `<span class="faculty-avatar-initials">${getInitials(person.name)}</span>`;

    return `
      <article class="faculty-card">
        <div class="faculty-avatar">${avatarContent}</div>
        <div class="faculty-info">
          <h3 class="faculty-name">${person.name}</h3>
          <p class="faculty-role">${person.role}</p>
        </div>
        ${renderLinkedInIcon(person)}
      </article>`;
  });

  grid.innerHTML = cards.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  renderFaculty();
});

// =====================================================
// FREE SCRAMBLE TITLES
// =====================================================

gsap.registerPlugin(ScrollTrigger);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

document.querySelectorAll(".scramble-title").forEach((el) => {

    const original = el.textContent.trim();
    let interval;

    function scramble() {

        clearInterval(interval);

        let iteration = 0;

        interval = setInterval(() => {

            el.textContent = original
                .split("")
                .map((letter, index) => {

                    if (letter === " ") return " ";

                    if (index < iteration) return original[index];

                    return chars[Math.floor(Math.random() * chars.length)];

                })
                .join("");

            iteration += 0.35;

            if (iteration >= original.length) {
                clearInterval(interval);
                el.textContent = original;
            }

        }, 35);

    }

    ScrollTrigger.create({
        trigger: el,
        start: "top 80%",

        onEnter: () => {
            el.textContent = "";
            scramble();
        },

        onEnterBack: () => {
            el.textContent = "";
            scramble();
        }
    });

});
gsap.registerPlugin(ScrollTrigger);

const teamGrid = document.querySelector("#teamGrid");

gsap.to(teamGrid, {
  x: () => -(teamGrid.scrollWidth - window.innerWidth + 220),
  ease: "none",

  scrollTrigger: {
    trigger: ".team-wrapper",
    pin: true,
    scrub: 1,
    start: "top 10%",
    end: () => "+=" + (teamGrid.scrollWidth - window.innerWidth+120),
    invalidateOnRefresh: true
  }
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

gsap.utils.toArray(".faculty-card").forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".faculty-grid",
                start: "top 85%"
            }
        }
    );
});
gsap.utils.toArray(".contact-btn").forEach((btn, i) => {
    gsap.fromTo(btn,
        { opacity: 0, y: 25 },
        {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contact-buttons",
                start: "top 90%"
            }
        }
    );

    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.45)" });
    });
});

gsap.utils.toArray(".cta-panel").forEach((panel) => {
    gsap.fromTo(panel,
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: panel,
                start: "top 88%"
            }
        }
    );
});