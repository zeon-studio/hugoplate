// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest('.nav-item').classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 32,
    loop: false,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})();

// Modal
// ----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("bottom-right-modal");
  const closeModal = document.getElementById("close-modal");

  // Add a small delay before showing the modal with the animation
  setTimeout(function() {
    modal.classList.remove("hidden");
    // Apply the animation only on md screens and larger
    if (window.innerWidth >= 768) {
      modal.classList.add("slide-in-md");
    }
  }, 100); // Adjust the delay as needed

  // Close the modal on click
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
});
