document.addEventListener('DOMContentLoaded', () => {
    const images = [
        "images/img (1).JPEG",
        "images/img (2).JPEG",
        "images/img (3).JPEG",
        "images/img (4).JPEG",
        "images/img (5).JPEG",
        "images/img (6).JPEG",
        "images/img (7).JPEG",
        "images/img (8).JPEG",
        "images/img (9).JPEG",
        "images/img (10).JPEG"
    ];
    let currentImageIndex = 0;
    const imgElement = document.getElementById("changeimg");

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imgElement.src = images[currentImageIndex];
    }


    imgElement.src = images[0];


    setInterval(changeImage, 5000);

    // Countdown timer
    const targetDate = new Date('March 1, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            document.getElementById('timer').innerHTML = 'The date has arrived!';
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update each span individually
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }


    updateCountdown();


    setInterval(updateCountdown, 1000);

    
    const links = document.querySelectorAll('.smooth-scroll');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    function smoothScroll(target) {
        const element = document.querySelector(target);
        const headerOffset = 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        const duration = 1000;
        const start = window.pageYOffset;
        const distance = offsetPosition - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
});

