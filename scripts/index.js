// script.js
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = dots.length;



// Function to update the slider position and dot styles
function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Auto-slide functionality
function startAutoSlide() {
  return setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
  }, 3000);
}

// Event listeners for dots
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    clearInterval(autoSlideInterval); // Pause auto-slide
    currentIndex = parseInt(e.target.dataset.index, 10);
    updateSlider(currentIndex);
    autoSlideInterval = startAutoSlide(); // Restart auto-slide
  });
});

// Start the slider
let autoSlideInterval = startAutoSlide();

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    console.log(navLinks.classList); // Toggle the 'show' class to show/hide the menu
});



document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.service-item');
    const dotsContainer = document.querySelector('.pagination-dots');
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    let currentIndex = 0;
    let autoScrollInterval;

    if (isSmallScreen) {
        // Create dots dynamically
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); // Mark the first dot as active
            dot.addEventListener('click', () => {
                navigateToService(index);
                resetAutoScroll(); // Reset the timer on manual navigation
            });
            dotsContainer.appendChild(dot);
        });

        // Function to navigate to a specific service item
        function navigateToService(index) {
            items[currentIndex].classList.remove('active');
            dotsContainer.children[currentIndex].classList.remove('active');

            currentIndex = index;

            items[currentIndex].classList.add('active');
            dotsContainer.children[currentIndex].classList.add('active');
        }

        // Function to auto-scroll through items
        function autoScroll() {
            const nextIndex = (currentIndex + 1) % items.length; // Cycle through items
            navigateToService(nextIndex);
        }

        // Reset the auto-scroll interval
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(autoScroll, 1500);
        }

        // Initialize the first item as active
        if (items.length > 0) {
            items[0].classList.add('active');
            resetAutoScroll(); // Start the auto-scroll
        }
    }
});