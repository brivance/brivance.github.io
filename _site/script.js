function loadNavbar() {
  fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));
}
window.onload = loadNavbar;