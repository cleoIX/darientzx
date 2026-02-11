/* ========== toggle style switcher ========= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open")
    }
})
/* ========== theme colors ========= */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

/* ========== light n dark mode ========= */
const dayNight = document.querySelector(".day-night");

// Only set up theme switcher if element exists and not on mobile
if (dayNight && window.innerWidth > 767) {
    
    dayNight.addEventListener("click", () => {
        const icon = dayNight.querySelector("i");
        if (!icon) return; // Safety check
        
        // Toggle icon
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
        
        // Toggle dark mode
        document.body.classList.toggle("dark");
        
        // Save preference
        const isDarkMode = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        
        console.log(`Theme switched to: ${isDarkMode ? 'dark' : 'light'}`);
    });
    
    // Initialize theme on page load
    window.addEventListener("load", () => {
        const savedTheme = localStorage.getItem("theme");
        
        // Default to light theme
        let isDarkMode = false;
        
        if (savedTheme === "dark") {
            isDarkMode = true;
            document.body.classList.add("dark");
        } else {
            // Ensure light mode is set (default)
            document.body.classList.remove("dark");
            // Set light theme in localStorage if not set
            if (!savedTheme) {
                localStorage.setItem("theme", "light");
            }
        }
        
        // Update icon
        const icon = dayNight.querySelector("i");
        if (icon) {
            if (isDarkMode) {
                icon.classList.add("fa-sun");
                icon.classList.remove("fa-moon");
            } else {
                icon.classList.add("fa-moon");
                icon.classList.remove("fa-sun");
            }
        }
    });
    
} else {
    // On mobile or if dayNight element doesn't exist
    // Force light theme and hide switcher
    if (dayNight && window.innerWidth <= 767) {
        dayNight.style.display = 'none';
    }
    
    // Ensure light theme on mobile
    window.addEventListener("load", () => {
        document.body.classList.remove("dark");
        // Don't save theme preference from mobile
    });
}
