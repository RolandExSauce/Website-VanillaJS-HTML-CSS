// navbar.mjs
export  function loadNavbar() {
    document.addEventListener("DOMContentLoaded", function() {
      fetch('./navbar/navbar.html')  // Adjusted path if necessary
        .then(response => response.text())
        .then(data => {
          const placeholder = document.getElementById('navbar-placeholder');
          placeholder.innerHTML = data;
  
          // Check if the stylesheet link exists in the navbar.html content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;
          const linkElement = tempDiv.querySelector('link[rel="stylesheet"]');
  
          if (linkElement) {
            // Remove the link tag from the temporary div to avoid duplication
            tempDiv.removeChild(linkElement);
            // Append the link tag to the document head if not already appended
            if (!document.querySelector(`link[href="${linkElement.href}"]`)) {
              document.head.appendChild(linkElement);
            }
          }
  
          // Setup the event listener for the menu button after the navbar is loaded
          const menuButton = document.querySelector(".menu-btn-nav");
          if (menuButton) {
            menuButton.addEventListener("click", () => {
              document.querySelector(".nav-menu-items").classList.toggle("show");
            });
          }
        })
        .catch(error => console.error('Error loading the navbar:', error));
    });
  }
  