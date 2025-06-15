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
        const projectDescriptions = document.querySelectorAll('.project-description');
        let currentIndex = 0;
        let autoRotateInterval;
        let userInteracted = false;
        
        // Initialize the gallery with infinite loop capability
        function initGallery() {
            updateActiveProject();
            startAutoRotation();
            
            // Add event listeners to each card
            projectCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    userInteracted = true;
                    clearInterval(autoRotateInterval);
                    currentIndex = index;
                    updateActiveProject();
                });
                
                card.addEventListener('mouseenter', () => {
                    if (!userInteracted) {
                        currentIndex = index;
                        updateActiveProject();
                    }
                });
            });
        }
        
        // Update the active project with infinite loop positioning
        function updateActiveProject() {
            projectCards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
                
                // Calculate position with infinite loop logic
                let position = index - currentIndex;
                
                // Handle wrapping for infinite effect
                if (position < -2) position += projectCards.length;
                if (position > 2) position -= projectCards.length;
                
                // Position cards with proper stacking
                if (position < 0) {
                    card.style.left = `${position * 15 + 50}%`;
                    card.style.zIndex = projectCards.length - Math.abs(position);
                } else if (position > 0) {
                    card.style.left = `${position * 15 + 50}%`;
                    card.style.zIndex = projectCards.length - position;
                } else {
                    card.style.left = '50%';
                    card.style.transform = 'translateX(-50%) scale(1.05)';
                    card.style.zIndex = projectCards.length + 1;
                }
                
                // Adjust opacity and scale for non-active cards
                if (position !== 0) {
                    card.style.opacity = '0.8';
                    card.style.transform = `translateX(-50%) scale(${1 - Math.abs(position) * 0.05})`;
                }
            });
            
            // Update descriptions
            projectDescriptions.forEach((desc, index) => {
                if (index === currentIndex) {
                    desc.classList.add('active');
                } else {
                    desc.classList.remove('active');
                }
            });
        }
        
        // Navigate between projects with infinite loop
        function navigateProject(direction) {
            userInteracted = true;
            clearInterval(autoRotateInterval);
            
            currentIndex += direction;
            
            // Infinite loop handling
            if (currentIndex < 0) {
                currentIndex = projectCards.length - 1;
            } else if (currentIndex >= projectCards.length) {
                currentIndex = 0;
            }
            
            updateActiveProject();
        }
        
        // Auto-rotate projects with infinite loop
        function startAutoRotation() {
            if (!userInteracted) {
                autoRotateInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % projectCards.length;
                    updateActiveProject();
                }, 3000);
            }
        }
        
        // Initialize the gallery when the DOM is loaded
        document.addEventListener('DOMContentLoaded', initGallery);
