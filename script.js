document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        fadeInElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Add swipe-up class if scrolling down
                if (scrollTop > lastScrollTop) {
                    element.classList.add('swipe-up');
                    element.classList.remove('swipe-down');
                }
                // Add swipe-down class if scrolling up
                else {
                    element.classList.add('swipe-down');
                    element.classList.remove('swipe-up');
                }
            } else {
                // Remove all classes if the element is out of view
                element.classList.remove('swipe-up', 'swipe-down');
            }
        });

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }

    // Initial check
    handleScroll();

    // Check on scroll
    window.addEventListener('scroll', handleScroll);
});
