document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentAngle = 0;
    const totalItems = items.length;
    const angleIncrement = 360 / totalItems;

    function positionItems() {
        items.forEach((item, index) => {
            const angle = index * angleIncrement;
            const radius = 300; // Adjust this value to change the carousel size
            const x = Math.sin(angle * Math.PI / 180) * radius;
            const z = Math.cos(angle * Math.PI / 180) * radius;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
    }

    function rotateCarousel(direction) {
        currentAngle += direction * angleIncrement;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }

    positionItems();

    prevBtn.addEventListener('click', () => rotateCarousel(1));
    nextBtn.addEventListener('click', () => rotateCarousel(-1));
});
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll function
    function smoothScroll(target, duration) {
        var targetElement = document.querySelector(target);
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add click event listeners to navigation links
    var navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('href');
            smoothScroll(target, 1000); // 1000ms for the scroll duration

            // Close mobile menu if open
            var navList = document.querySelector('.nav-list');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
});

