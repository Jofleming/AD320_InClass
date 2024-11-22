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

    // Fetch Data with Promises
    const fetchDataBtn = document.getElementById("fetch-data-btn");
    const dataContainer = document.getElementById("data-container");

    fetchDataBtn.addEventListener("click", () => {
        fetchDataWithPromises();
        // If you want to use async/await instead, comment the above line and uncomment the line below:
        // fetchDataWithAsync();
    });

    function fetchDataWithPromises() {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                dataContainer.textContent = `Error: ${error.message}`;
            });
    }

    async function fetchDataWithAsync() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            displayData(data);
        } catch (error) {
            dataContainer.textContent = `Error: ${error.message}`;
        }
    }

    function displayData(data) {
        dataContainer.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;
    }

    // Sending a JS Object with Fetch
    async function sendData() {
        console.log("sendData");
        const data = {
            title: "foo",
            body: "bar",
            userId: 1
        };

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /// Ensure the button triggers the sendData function
    const sendDataBtn = document.getElementById("send-data-btn");
    sendDataBtn.addEventListener("click", sendData);
});
