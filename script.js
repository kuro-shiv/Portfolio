// Smooth Scroll
document.querySelectorAll('.sidebar a').forEach(link => {
 link.addEventListener('click', function(e){
   e.preventDefault();
   document.querySelector(this.getAttribute('href')).scrollIntoView({
     behavior: 'smooth'
   });
 });
});

// Modal Controls
function openModal(id){
 document.getElementById(id).style.display='block';
}
function closeModal(id){
 document.getElementById(id).style.display='none';
}
