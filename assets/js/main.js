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

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const modal = document.getElementById("bottom-right-modal");
  const closeModalButtons = document.querySelectorAll(".close-modal");

  if (!modal) {
    console.error("Modal element not found");
    return;
  }
  if (closeModalButtons.length === 0) {
    console.error("Close buttons not found");
    return;
  }

  // Add a small delay before showing the modal with the animation
  setTimeout(function() {
    console.log("Showing modal");
    modal.classList.remove("hidden");
    // Apply the animation only on md screens and larger
    if (window.innerWidth >= 768) {
      modal.classList.add("slide-in-md");
    }
  }, 300); // Adjust the delay as needed

  // Close the modal on click for each close button
  closeModalButtons.forEach(button => {
    button.addEventListener("click", function () {
      console.log("Closing modal");
      modal.classList.add("hidden");
    });
  });
});

// Handle uncaught promise rejections
window.addEventListener("unhandledrejection", function(event) {
  console.error("Unhandled promise rejection:", event.reason);
});
