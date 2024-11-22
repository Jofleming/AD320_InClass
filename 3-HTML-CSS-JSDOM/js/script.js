"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    const revealButton = document.getElementById("reveal-btn");
    const extraText = document.getElementById("extra-text");
    const techImage = document.getElementById("tech-image");

    // Event Listener to reveal extra text
    revealButton.addEventListener("click", function() {
      if (extraText.classList.contains("hidden")) {
        extraText.classList.remove("hidden");
        revealButton.textContent = "Hide Details";
      } else {
        extraText.classList.add("hidden");
        revealButton.textContent = "Reveal More";
      }
    });

    // Event Listener to change the image on hover
    techImage.addEventListener("mouseover", function() {
      techImage.src = "images/tech2.jpg"; // Change to another image
    });

    techImage.addEventListener("mouseout", function() {
      techImage.src = "images/tech.jpg"; // Revert back to the original image
    });
  }
})();
