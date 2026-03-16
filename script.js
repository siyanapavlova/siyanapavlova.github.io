function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
    selectedSection.classList.add("active");
  }

  // Update active button
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
    if (button.name === sectionId) {
      button.classList.add("active");
    }
  });
}

async function generatePublicationList() {
  try {
    const response = await fetch("./publications.json");
    const publications = await response.json();
    publications.sort((a, b) => b.year - a.year);

    const publicationList = document.getElementById("publication-list");
    publicationList.innerHTML = ""; // Clear existing publications

    publicationList.innerHTML = publications
      .map(
        (p) => `
      <div class="publication-item">
        <p class="title">
          <a href="${p.url}" target="_blank">${p.title}</a>
        </p>
        <p class="author-list">${p.authors.map((author) => (author === "Siyana Pavlova" ? `<strong>${author}</strong>` : author)).join(", ")}</p>
        <p class="publication-venue">${p.venue} (${p.year})</p>
        <span class="pdf-link"><a href="${p.pdf}" target="_blank">[PDF]</a></span>
        <details>
          <summary class="abstract">Abstract</summary>
          <p class="abstract-content">${p.abstract}</p>
        </details>
      </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}

document.addEventListener("DOMContentLoaded", generatePublicationList);
