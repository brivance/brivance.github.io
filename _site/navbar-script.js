function loadNavbar() {
  fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));
}
window.onload = loadNavbar;

// const navToggle = document.querySelector('.navbar-toggler');
// const navLinks = document.querySelector('.navbar-nav');

// navToggle.addEventListener('click', () => {
//   navLinks.classList.toggle('active');  
// });