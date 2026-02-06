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
/* =============== Testimonial grabbing (scrolling)) ==================== */
document.addEventListener("DOMContentLoaded", function () {
  const testimonialRow = document.querySelector(".testimonial-row");

  let isMouseDown = false;
  let startX;
  let scrollLeft;

  testimonialRow.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.pageX - testimonialRow.offsetLeft;
    scrollLeft = testimonialRow.scrollLeft; 
    testimonialRow.style.cursor = "grabbing";
  });

  testimonialRow.addEventListener("mouseleave", () => {
    isMouseDown = false;
    testimonialRow.style.cursor = "grab";
  });

  testimonialRow.addEventListener("mouseup", () => {
    isMouseDown = false;
    testimonialRow.style.cursor = "grab";
  });

  testimonialRow.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    e.preventDefault();
    const x = e.pageX - testimonialRow.offsetLeft;
    const walk = (x - startX) * 10;
    testimonialRow.scrollLeft = scrollLeft - walk;
  });
});
/* =============== scrolling animations ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  // Check if the sections are in the viewport and apply animation
  function checkVisibility() {
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('visible'); // Trigger animation
      } else {
        section.classList.remove('visible'); // Reset if not in view
      }
    });
  }

  // Listen for the scroll event
  window.addEventListener('scroll', checkVisibility);

  // Initial check in case the user starts on a section that's already in view
  checkVisibility();
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