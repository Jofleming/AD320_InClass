"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Reveal button and extra text handling
    const revealButton = document.getElementById("reveal-btn");
    const extraText = document.getElementById("extra-text");
    const techImage = document.getElementById("tech-image");

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

    // Slideshow implementation
    const slideshowImages = [
        "images/jasper1.jpg",
        "images/eric3.jpg",
        "images/eric2.jpg"
    ];
    let currentImageIndex = 0;
    const slideshowImageElement = document.getElementById("slideshow-image");

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        slideshowImageElement.src = slideshowImages[currentImageIndex];
    }

    let slideshowInterval = setInterval(changeImage, 3000);// Change image every 3 seconds

    // Toggle Slideshow Visibility
    const toggleSlideshowBtn = document.getElementById("toggle-slideshow-btn");
    const slideshowSection = document.getElementById("slideshow");

    toggleSlideshowBtn.addEventListener("click", function() {
        if (slideshowSection.classList.contains("hidden")) {
            slideshowSection.classList.remove("hidden");
            toggleSlideshowBtn.textContent = "Hide Slideshow";
            setInterval(changeImage, 3000); // Restart the slideshow
        } else {
            console.log("in hidden");
            slideshowSection.classList.add("hidden");
            toggleSlideshowBtn.textContent = "Show Slideshow";
            clearInterval(slideshowInterval); // Stop the slideshow
        }
    });

});
