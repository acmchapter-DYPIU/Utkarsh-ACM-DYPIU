/* =========================================
   EVENT DETAILS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const heading = document.querySelector(".event-details-heading");
  const cards = document.querySelectorAll(".event-info-card");
  const bottomButton = document.querySelector(".event-page-bottom");


  /* =========================================
     PAGE ENTRANCE ANIMATION
  ========================================= */

  if (heading) {
    heading.animate(
      [
        {
          opacity: 0,
          transform: "translateY(28px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 700,
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }
    );
  }


  cards.forEach((card, index) => {

    card.animate(
      [
        {
          opacity: 0,
          transform: "translateY(35px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 700,
        delay: 150 + (index * 130),
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }
    );

  });


  if (bottomButton) {

    bottomButton.animate(
      [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],
      {
        duration: 600,
        delay: 450,
        easing: "ease-out",
        fill: "forwards"
      }
    );

  }


  /* =========================================
     SMOOTH BACK BUTTON BEHAVIOUR
  ========================================= */

  const backButtons = document.querySelectorAll(
    ".event-back-btn, .event-page-back"
  );

  backButtons.forEach(button => {

    button.addEventListener("click", () => {

      document.body.classList.add("page-exit");

    });

  });

});
