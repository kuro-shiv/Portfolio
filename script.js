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
