document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel img');
    const dots = document.querySelectorAll('.dot');
    const menuContainer = document.querySelector('.menu-container');
    const navbar = document.getElementById('navbar');
    const totalSlides = document.querySelectorAll('.carousel img').length;
    let interval;

    function updateSlide() {
        carousel.style.transform = `translateX(${-index * 100}vw)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function moveSlide(step) {
        index = (index + step + totalSlides) % totalSlides;
        updateSlide();
        resetInterval();
    }

    function setSlide(n) {
        index = n;
        updateSlide();
        resetInterval();
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            moveSlide(1);
        }, 3000);
    }

    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Shrink Menu and Show Navbar on Click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            menuContainer.style.opacity = "0"; // Smooth fade out
            setTimeout(() => {
                menuContainer.style.display = "none"; // Hide completely
                navbar.classList.add('show-nav'); // Show navbar
            }, 500);
        });
    });

    dots[index].classList.add('active');
    startAutoSlide();
    
    window.moveSlide = moveSlide;
    window.setSlide = setSlide;
});

document.addEventListener("DOMContentLoaded", () => {
    const columns = document.querySelectorAll(".about-column");
  
    // Add a fade-in effect on page load
    columns.forEach((column, index) => {
        column.style.opacity = "0";
        column.style.transform = "translateY(50px)";
        setTimeout(() => {
            column.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            column.style.opacity = "1";
            column.style.transform = "translateY(0)";
        }, index * 200); // Staggered animation
    });
  
    // Add hover animation
    columns.forEach(column => {
        column.addEventListener("mouseover", () => {
            column.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
        });
  
        column.addEventListener("mouseout", () => {
            column.style.boxShadow = "none";
        });
    });
  });
  

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = [
        'rgba(255, 255, 255, 0.5)',  // You can adjust the colors and opacity
        'rgba(174, 194, 224, 0.5)',
        'rgba(213, 236, 242, 0.5)',
        'rgba(143, 169, 209, 0.5)'
    ];

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.5) * 1.5
        };
        this.radius = Math.random() * 5 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    Particle.prototype.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw();
    };

    function init() {
        particles = [];
        for (let i = 0; i < 200; i++) {  // You can adjust number of particles
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
        });
    }

    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});
