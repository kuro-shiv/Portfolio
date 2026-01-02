/* ===========================
 DOM Selectors
=========================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll("section");
const themeToggle = document.getElementById("themeToggle");
const fadeElements = document.querySelectorAll(".fade-in");
const typingText = document.getElementById("typing");

/* ===========================
 Theme Toggle
=========================== */
let currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

themeToggle.innerHTML =
  currentTheme === "light"
    ? '<i class="fa fa-moon-o"></i>'
    : '<i class="fa fa-sun-o"></i>';

themeToggle.addEventListener("click", () => {
  const newTheme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeToggle.innerHTML =
    newTheme === "light"
      ? '<i class="fa fa-moon-o"></i>'
      : '<i class="fa fa-sun-o"></i>';
});

/* ===========================
 Mobile Sidebar Toggle
=========================== */
function updateSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("hidden");
  } else {
    sidebar.classList.remove("hidden");
  }
}
updateSidebar();
window.addEventListener("resize", updateSidebar);

mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

/* Hide sidebar on mobile when clicking links */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) sidebar.classList.add("hidden");
  });
});

/* ===========================
 Smooth Scroll
=========================== */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ===========================
 Active Nav Highlight On Scroll
=========================== */
function setActiveLink() {
  let scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(el => el.classList.remove("active"));
      document
        .querySelector(`.sidebar a[href="#${section.id}"]`)
        ?.classList.add("active");
    }
  });
}
setActiveLink();
window.addEventListener("scroll", setActiveLink);

/* ===========================
 Scroll Reveal Animation
=========================== */
function revealOnScroll() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      el.classList.add("visible");
    }
  });
}
revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

/* ===========================
 Typing Animation
=========================== */
const roles = [
  "Automation Engineer",
  "Full Stack Developer",
  "Tech Creator",
  "Storytelling Engineer",
  "QA + Frontend Enthusiast"
];

let wordIndex = 0,
  charIndex = 0;

function type() {
  if (!typingText) return;
  if (charIndex < roles[wordIndex].length) {
    typingText.textContent += roles[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    setTimeout(erase, 900);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = roles[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    wordIndex = (wordIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

/* ===========================
 Modal Handling
=========================== */
window.openModal = function (id) {
  document.getElementById(id).style.display = "grid";
  document.body.style.overflow = "hidden";
};
window.closeModal = function (id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "";
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(m => {
      m.style.display = "none";
    });
    document.body.style.overflow = "";
  }
});
