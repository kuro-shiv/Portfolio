/**
 * SKD_OS v2.0 - Core Execution Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initScrollReveal();
});

/**
 * Terminal Typewriter Effect for Hero Section
 */
function initTypewriter() {
  const roles = [
    "Software_Developer",
    "Backend_Engineer",
    "API_Engineer",
    "Research_Author",
    "AI_Product_Builder"
  ];
  
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Remove character
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Add character
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150; // Slower when typing
    }

    // Determine next state
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of the word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing effect
  setTimeout(type, 1000);
}

/**
 * Scroll Reveal Animations using Intersection Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed to only animate once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}
