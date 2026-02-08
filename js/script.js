/* =============== navbar ================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
/* =============== Testimonial infinite (scrolling)) ==================== */
document.addEventListener("DOMContentLoaded", function() {
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialContainer = document.querySelector('.testimonial-container');
    
    if (!testimonialTrack) return;
    
    // Store original items
    const originalItems = Array.from(testimonialTrack.children);
    function duplicateTestimonials() {
        // Clear and recreate with enough duplicates
        testimonialTrack.innerHTML = '';
        
        // Create enough duplicates to fill at least 2 screens
        const itemWidth = originalItems[0]?.offsetWidth + 25; // width + gap
        const screenWidth = window.innerWidth;
        const itemsPerScreen = Math.ceil(screenWidth / itemWidth);
        const totalCopies = Math.max(3, Math.ceil(2 * screenWidth / (itemWidth * originalItems.length)));
        
        // Add multiple copies
        for (let i = 0; i < totalCopies; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                testimonialTrack.appendChild(clone);
            });
        }
    }
    
    // Create seamless loop function
    function setupSeamlessLoop() {
        const items = Array.from(testimonialTrack.children);
        const itemWidth = items[0]?.offsetWidth + 25;
        const totalWidth = items.length * itemWidth;
        const visibleWidth = testimonialContainer.clientWidth;
        
        // Reset animation
        testimonialTrack.style.animation = 'none';
        testimonialTrack.offsetHeight;
        testimonialTrack.style.animation = '';
        
        const duration = (totalWidth / 100) * 2; // Adjust speed
        testimonialTrack.style.animationDuration = `${duration}s`;
        
        testimonialTrack.addEventListener('animationiteration', function() {
            requestAnimationFrame(() => {});
        });
    }
    
    // Calculate animation duration
    function setAnimationDuration() {
        const items = testimonialTrack.children;
        if (items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth + 25;
        const totalWidth = items.length * itemWidth;
        const speed = 50;
        const duration = totalWidth / speed;
        
        testimonialTrack.style.animationDuration = `${duration}s`;
    }
    
    // Enable/disable auto-scroll based on user interaction
    function setupUserInteractions() {
        let autoScrollEnabled = true;
        let userHasScrolled = false;
        let scrollTimeout;

        testimonialContainer.addEventListener('scroll', function() {
            userHasScrolled = true;
            testimonialTrack.style.animationPlayState = 'paused';
            
            // Re-enable auto-scroll after 3 seconds of inactivity
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (userHasScrolled) {
                    userHasScrolled = false;
                    testimonialTrack.style.animationPlayState = 'running';
                }
            }, 1000);
        });
        
        // Pause on hover
        testimonialContainer.addEventListener('mouseenter', function() {
            testimonialTrack.style.animationPlayState = 'paused';
        });
        
        testimonialContainer.addEventListener('mouseleave', function() {
            if (!userHasScrolled) {
                testimonialTrack.style.animationPlayState = 'running';
            }
        });
        
        // Touch
        let touchStartX = 0;
        
        testimonialContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            testimonialTrack.style.animationPlayState = 'paused';
            userHasScrolled = true;
        }, {passive: true});
        
        testimonialContainer.addEventListener('touchend', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                userHasScrolled = false;
                testimonialTrack.style.animationPlayState = 'running';
            }, 3000);
        }, {passive: true});

        testimonialTrack.addEventListener('animationstart', function() {
            userHasScrolled = false;
        });
    }
    
    duplicateTestimonials();
    setupSeamlessLoop();
    setAnimationDuration();
    setupUserInteractions();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            duplicateTestimonials();
            setupSeamlessLoop();
            setAnimationDuration();
        }, 250);
    });
    
    // Alternative: JavaScript-based seamless loop
    function setupJSSeamlessLoop() {
        const items = Array.from(testimonialTrack.children);
        if (items.length === 0) return;
        
        let position = 0;
        let animationId;
        const speed = 0.3; 
        
        function animate() {
            const itemWidth = items[0].offsetWidth + 25;
            const totalWidth = items.length * itemWidth;
            const resetPoint = totalWidth / 2; 
            
            position -= speed;
            
            if (Math.abs(position) >= resetPoint) {
                position = 0;
            }
            
            testimonialTrack.style.transform = `translateX(${position}px)`;
            testimonialTrack.style.animation = 'none';
            animationId = requestAnimationFrame(animate);
        }
        
        testimonialTrack.style.animation = 'none';
        
        animate();
        
        let isPaused = false;
        
        testimonialContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        const originalAnimate = animate;
        animate = function() {
            if (!isPaused) {
                originalAnimate();
            } else {
                animationId = requestAnimationFrame(animate);
            }
        };
        
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
        });
    }
    
    // Uncomment if CSS animation still has issues:
    // setupJSSeamlessLoop();
});
/* =============== page scrolling animations ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  function checkVisibility() {
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
  const slideElements = document.querySelectorAll('.slide-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  slideElements.forEach(element => {
    observer.observe(element);
  });
});
/* =============== contact (email) ==================== */
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("KfUQ7H9rObvt-rPFa");

    const form = document.getElementById("contact-form");
    const confirmation = document.querySelector(".confirmation");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            emailjs.sendForm("service_r6r5xxj", "template_bazxd1v", this)
                .then(() => {
                    confirmation.textContent = "Message sent successfully!";
                    confirmation.style.color = "green";
                    form.reset();
                })
                .catch((error) => {
                    confirmation.textContent = "Failed to send message. Please try again.";
                    confirmation.style.color = "red";
                    console.error("EmailJS error:", error);
                });
        });
    }
});