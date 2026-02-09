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

dayNight.addEventListener("click", () => {
    const icon = dayNight.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
    
    document.body.classList.toggle("dark");

    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.add("fa-moon");
        dayNight.querySelector("i").classList.remove("fa-sun");
    }
});