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
    // Wait up to 30 seconds for the Swiper to load as it loads asynchronously
    let counter = 0;
    const interval = setInterval(() => {
      if (typeof Swiper !== "undefined") {
        clearInterval(interval);

        new Swiper(".home-photos-slider", {
          spaceBetween: 24,
          loop: true,
          pagination: {
            el: ".photos-slider-pagination",
            type: "bullets",
            clickable: true,
          },
        });
      } else {
        counter++;
        if (counter >= 300) {
          clearInterval(interval);
        }
      }
    }, 100);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHomeSlider();
  });
})();
