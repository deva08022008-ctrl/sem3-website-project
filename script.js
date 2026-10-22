const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector("#themeToggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

function applyTheme(darkMode) {
  document.body.classList.toggle("dark", darkMode);
  themeToggle.textContent = darkMode ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", darkMode ? "Switch to light theme" : "Switch to dark theme");
  try {
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  } catch (error) {
    // The theme still works for this visit if browser storage is unavailable.
  }
}

try {
  applyTheme(localStorage.getItem("portfolio-theme") === "dark");
} catch (error) {
  applyTheme(false);
}

themeToggle.addEventListener("click", () => {
  applyTheme(!document.body.classList.contains("dark"));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  const name = document.querySelector("#visitorName").value.trim();
  formFeedback.textContent = `Thanks, ${name}! The form is valid, but this demo does not send or store your message.`;
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.focus();
  }
});


