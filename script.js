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



// project gallery
        const projectCards = document.querySelectorAll('.project-card');
        let currentIndex = 0;
        let autoRotateInterval;
        
        // Initialize the first project as visible
        function initProjects() {
            updateActiveProject();
            startAutoRotation();
        }
        
        // Update the active project
        function updateActiveProject() {
            projectCards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === currentIndex) {
                    card.classList.add('active');
                }
            });
        }
        
        // Navigate between projects
        function navigateProject(direction) {
            // Calculate new index with wrap-around
            currentIndex = (currentIndex + direction + projectCards.length) % projectCards.length;
            
            // Update display
            updateActiveProject();
            
            // Reset auto-rotation timer
            resetAutoRotation();
        }
        
        // Auto-rotate projects
        function startAutoRotation() {
            autoRotateInterval = setInterval(() => {
                navigateProject(1);
            }, 5000); // Change project every 5 seconds
        }
        
        // Reset auto-rotation timer
        function resetAutoRotation() {
            clearInterval(autoRotateInterval);
            startAutoRotation();
        }
        
        // Initialize the projects when the DOM is loaded
        document.addEventListener('DOMContentLoaded', initProjects);
