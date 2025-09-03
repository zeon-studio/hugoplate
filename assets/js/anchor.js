document.addEventListener('DOMContentLoaded', function () {
    const toc = document.getElementById('TableOfContents');
    const navbar = document.querySelector('.navbar');
    if (toc && navbar) {
        toc.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = decodeURIComponent(this.getAttribute('href').substring(1));
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 70;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                }
            });
        });
    }
});
