import { loadNavbar } from '../navbar/navbar.mjs';

loadNavbar();

// project-section.mjs
export function loadProjectSection() {
  document.addEventListener("DOMContentLoaded", function () {
    // Load the projects overview section
    fetch('./projects/projects-overview-section.html')
      .then((response) => response.text())
      .then((data) => {
        const placeholder = document.getElementById("projects-overview-section-placeholder");
        placeholder.innerHTML = data;

        // Check if the stylesheet link exists in the projects-overview-section.html content
        const tempDiv = document.createElement("div");
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

        // After loading the HTML, setup the accordion
        setupAccordion();
      })
      .catch((error) =>
        console.error("Error loading the projects-overview-section.html:", error)
      );

    // Load the description of the router app
    fetch('./projects/utils/description.router.app.html')
      .then((response) => response.text())
      .then((data) => {
        const descriptionPanel = document.getElementById("descriptionPanel");
        descriptionPanel.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error fetching description.router.app.html:", error);
      });
  });
}

function setupAccordion() {
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      const techDivRouterApp = document.querySelector(".techDivRouterApp");
      if (panel.classList.contains("show")) {
        panel.classList.remove("show");
        techDivRouterApp.classList.add("show");
        // Change the chevron to down when closing the accordion
        this.querySelector("svg").classList.remove("rotate");
      } else {
        panel.classList.add("show");
        techDivRouterApp.classList.remove("show");
        // Change the chevron to up when opening the accordion
        this.querySelector("svg").classList.add("rotate");
      }
    });
  }
}
