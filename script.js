// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

// Hide sidebar by default on mobile
function hideSidebarOnMobile() {
  if (window.innerWidth <= 768) {
    sidebar.style.display = 'none';
  } else {
    sidebar.style.display = 'flex';
  }
}

// Initial check on page load
hideSidebarOnMobile();

// Check on window resize
window.addEventListener('resize', hideSidebarOnMobile);

// Toggle sidebar on mobile menu button click
mobileMenuBtn?.addEventListener('click', function(e) {
  e.stopPropagation();
  if (window.innerWidth <= 768) {
    sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
  }
});

// Close mobile menu when link is clicked
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      sidebar.style.display = 'none';
    }
  });
});

// Smooth Scroll for Sidebar Navigation
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Modal Handling
function openModal(id) {
  let modal = document.getElementById(id);
  if (modal) modal.style.display = 'block';
}

function closeModal(id) {
  let modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Close modal ONLY if background clicked (not inside content box)
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// ESC key closes modals
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    document.querySelectorAll('.modal').forEach(mod => mod.style.display = 'none');
  }
});
