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

  const initHomeSlider = () => {
    const swiper = new Swiper(".home-photos-slider", {
      spaceBetween: 24,
      loop: true,
      pagination: {
        el: ".photos-slider-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  };

  // Testimonial Slider
  // ----------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      initHomeSlider();
    }, 100);
  });
})();
