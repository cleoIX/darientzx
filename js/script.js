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
    
    if (!testimonialTrack || !testimonialContainer) return;
    
    // Store original items
    const originalItems = Array.from(testimonialTrack.children);
    
    // Function to duplicate testimonials
    function duplicateTestimonials() {
        if (originalItems.length === 0) return;
        
        // Clear and recreate with enough duplicates
        testimonialTrack.innerHTML = '';
        
        // Get item width including gap
        const itemWidth = originalItems[0].offsetWidth + 20; // 20px gap
        const screenWidth = window.innerWidth;
        const itemsPerScreen = Math.ceil(screenWidth / itemWidth);
        const totalCopies = Math.max(3, itemsPerScreen * 2);
        
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
        
        const itemWidth = items[0].offsetWidth + 20;
        const totalWidth = items.length * itemWidth;
        const speed = 60; // pixels per second
        const duration = totalWidth / speed;
        
        testimonialTrack.style.animationDuration = `${duration}s`;
        testimonialTrack.style.animationPlayState = 'running';
    }
    
    // ============ DRAG TO SCROLL FUNCTIONALITY ============
    let isDragging = false;
    let startX;
    let scrollLeft;
    let autoScrollPaused = false;
    let resumeTimeout;
    
    testimonialContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft;
        testimonialContainer.style.cursor = 'grabbing';
        testimonialTrack.style.animationPlayState = 'paused';
        autoScrollPaused = true;
        
        clearTimeout(resumeTimeout);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        if (!isDragging) {
            testimonialContainer.style.cursor = 'grab';
        }
    });
    
    testimonialContainer.addEventListener('mouseup', () => {
        isDragging = false;
        testimonialContainer.style.cursor = 'grab';
        
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            if (!isDragging && autoScrollPaused) {
                testimonialTrack.style.animationPlayState = 'running';
                autoScrollPaused = false;
            }
        }, 100);
    });
    
    testimonialContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        testimonialContainer.scrollLeft = scrollLeft - walk;
    });
    
    testimonialContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft;
        testimonialTrack.style.animationPlayState = 'paused';
        autoScrollPaused = true;
        
        clearTimeout(resumeTimeout);
    }, { passive: true });
    
    testimonialContainer.addEventListener('touchend', () => {
        isDragging = false;
        
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            if (!isDragging && autoScrollPaused) {
                testimonialTrack.style.animationPlayState = 'running';
                autoScrollPaused = false;
            }
        }, 100);
    }, { passive: true });
    
    testimonialContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const x = e.touches[0].pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        testimonialContainer.scrollLeft = scrollLeft - walk;
    }, { passive: false });
    
    testimonialContainer.addEventListener('mouseenter', () => {
        if (!isDragging) {
            testimonialTrack.style.animationPlayState = 'paused';
            autoScrollPaused = true;
        }
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        if (!isDragging && autoScrollPaused) {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                if (!isDragging && autoScrollPaused) {
                    testimonialTrack.style.animationPlayState = 'running';
                    autoScrollPaused = false;
                }
            }, 1000);
        }
    });
    
    testimonialContainer.addEventListener('wheel', (e) => {
        testimonialTrack.style.animationPlayState = 'paused';
        autoScrollPaused = true;
        
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            testimonialContainer.scrollLeft += e.deltaX;
        }
        
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            if (!isDragging && autoScrollPaused) {
                testimonialTrack.style.animationPlayState = 'running';
                autoScrollPaused = false;
            }
        }, 2000);
    }, { passive: true });
    
    testimonialTrack.addEventListener('animationiteration', () => {
        requestAnimationFrame(() => {
        });
    });
    
    duplicateTestimonials();
    setupAnimation();
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            duplicateTestimonials();
            setupAnimation();
        }, 250);
    });
    
    const scrollIndicator = document.querySelector('.testimonial-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Drag or scroll to explore testimonials';
    }
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