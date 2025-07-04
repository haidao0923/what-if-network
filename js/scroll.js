let animationFrameId;
let scrollSpeed = 0.5; // Adjust scroll speed here
let isPausedByHover = false;
let isDown = false;
let startX;
let scrollLeft;
const scrollContainer = document.querySelector('.flex.overflow-x-auto');

function initHorizontalScroll() {
    if (scrollContainer) {
        scrollContainer.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
            isDown = true;
            scrollContainer.classList.add('active-drag');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            cancelAnimationFrame(animationFrameId); // Pause auto-scroll
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('active-drag');
            if (!isPausedByHover) {
                startAutoScroll(); // Resume auto-scroll
            }
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('active-drag');
            if (!isPausedByHover) {
                startAutoScroll(); // Resume auto-scroll
            }
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        scrollContainer.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
            isDown = true;
            startX = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            cancelAnimationFrame(animationFrameId); // Pause auto-scroll
        });

        scrollContainer.addEventListener('touchend', () => {
            isDown = false;
            if (!isPausedByHover) {
                startAutoScroll(); // Resume auto-scroll
            }
        });

        scrollContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        const images = scrollContainer.querySelectorAll('img');
        images.forEach(img => {
            img.ondragstart = () => false;
        });
    }
}

function animateScroll() {
    if (!scrollContainer) return;

    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
        scrollContainer.scrollLeft = 0;
    } else {
        scrollContainer.scrollLeft += scrollSpeed;
    }
    animationFrameId = requestAnimationFrame(animateScroll);
}

function startAutoScroll() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animateScroll);
}

// Pause auto-scroll on hover (for mouse users)
if (scrollContainer) {
    scrollContainer.addEventListener('mouseenter', () => {
        isPausedByHover = true;
        cancelAnimationFrame(animationFrameId);
    });
    scrollContainer.addEventListener('mouseleave', () => {
        isPausedByHover = false;
        if (!isDown) {
            startAutoScroll();
        }
    });
}

function initScrollToContact() {
    const shareStoryButton = document.getElementById('share-story-button');
    const contactSection = document.getElementById('contact-section');

    if (shareStoryButton && contactSection) {
        shareStoryButton.addEventListener('click', function() {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.error("Share story button or contact section not found!");
    }
}