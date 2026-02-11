/* =============== navbar ================== */
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav .nav-link");
    
    function updateActiveNav() {
        let current = "";
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }
    
    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav(); // Initial call
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
/* =============== Testimonial infinite (scrolling) ==================== */
document.addEventListener("DOMContentLoaded", function() {
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialContainer = document.querySelector('.testimonial-container');
    
    if (!testimonialTrack || !testimonialContainer) return;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 767;
    
    // Store original items
    const originalItems = Array.from(testimonialTrack.children);
    
    // Function to duplicate testimonials
    function duplicateTestimonials() {
        if (originalItems.length === 0) return;
        
        // Clear and recreate with enough duplicates
        testimonialTrack.innerHTML = '';
        
        // For mobile: fewer duplicates to prevent performance issues
        const totalCopies = isMobile ? 2 : 4;
        
        // Add multiple copies
        for (let i = 0; i < totalCopies; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                testimonialTrack.appendChild(clone);
            });
        }
    }
    
    // Set up animation
    function setupAnimation() {
        const items = testimonialTrack.children;
        if (items.length === 0) return;
        
        // Slower animation on mobile
        const speed = isMobile ? 400 : 450;
        const itemWidth = items[0]?.offsetWidth + 20 || 320;
        const totalWidth = items.length * itemWidth;
        const duration = totalWidth / speed;
        
        testimonialTrack.style.animationDuration = `${duration}s`;
        testimonialTrack.style.animationPlayState = 'running';
    }
    
    // ============ SIMPLIFIED DRAG TO SCROLL ============
    let isDragging = false;
    let startX;
    let scrollLeft;
    let resumeTimeout;
    
    // Only add drag handlers on non-mobile
    if (!isMobile) {
        // Mouse events (desktop only)
        testimonialContainer.addEventListener('mousedown', handleDragStart);
        testimonialContainer.addEventListener('mouseleave', handleDragEnd);
        testimonialContainer.addEventListener('mouseup', handleDragEnd);
        testimonialContainer.addEventListener('mousemove', handleDragMove);
        testimonialContainer.addEventListener('mouseenter', () => {
            testimonialTrack.style.animationPlayState = 'paused';
        });
        testimonialContainer.addEventListener('mouseleave', () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                testimonialTrack.style.animationPlayState = 'running';
            }, 1000);
        });
        testimonialContainer.addEventListener('wheel', handleWheel);
    }
    
    // Touch events
    testimonialContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    testimonialContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    testimonialContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    function handleDragStart(e) {
        isDragging = true;
        startX = e.pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft;
        testimonialContainer.style.cursor = 'grabbing';
        testimonialTrack.style.animationPlayState = 'paused';
        clearTimeout(resumeTimeout);
        e.preventDefault();
    }
    
    function handleDragEnd() {
        if (isDragging) {
            isDragging = false;
            testimonialContainer.style.cursor = 'grab';
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                testimonialTrack.style.animationPlayState = 'running';
            }, 2000);
        }
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        testimonialContainer.scrollLeft = scrollLeft - walk;
    }
    
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft || 0;
        testimonialTrack.style.animationPlayState = 'paused';
        clearTimeout(resumeTimeout);
    }
    
    function handleTouchEnd() {
        isDragging = false;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            testimonialTrack.style.animationPlayState = 'running';
        }, 2000);
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.touches[0].pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        testimonialContainer.scrollLeft = scrollLeft - walk;
    }
    
    function handleWheel(e) {
        testimonialTrack.style.animationPlayState = 'paused';
        
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            testimonialContainer.scrollLeft += e.deltaX;
        } else {
            testimonialContainer.scrollLeft += e.deltaY * 0.5;
        }
        
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            testimonialTrack.style.animationPlayState = 'running';
        }, 2000);
        
        e.preventDefault();
    }
    
    // Initialize
    duplicateTestimonials();
    setupAnimation();
    
    // FIXED: Remove the reload on resize - just re-initialize without reloading
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Check if mobile state changed
            const wasMobile = isMobile;
            const nowMobile = window.innerWidth <= 767;
            
            // Only re-initialize if we crossed the mobile threshold
            if (wasMobile !== nowMobile) {
                // Just update the animation, don't reload
                testimonialTrack.style.animation = 'none';
                testimonialTrack.offsetHeight; // Trigger reflow
                setupAnimation();
            }
        }, 250);
    });
    
    // Add scroll indicator
    const scrollIndicator = document.querySelector('.testimonial-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.innerHTML = isMobile 
            ? '<i class="fas fa-arrows-alt-h"></i> Swipe to explore' 
            : '<i class="fas fa-arrows-alt-h"></i> Drag or scroll to explore';
    }
});

