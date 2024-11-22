"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // NASA APOD API
    const fetchNasaBtn = document.getElementById("fetch-nasa-btn");
    const nasaResult = document.getElementById("nasa-result");

    fetchNasaBtn.addEventListener("click", () => {
        const nasaApiKey = "DEMO_KEY"; // Replace with your actual API key if you have one
        const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

        fetch(nasaUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                nasaResult.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.date}</p>
                    <img src="${data.url}" alt="${data.title}">
                    <p>${data.explanation}</p>
                `;
            })
            .catch(error => {
                nasaResult.textContent = `Error: ${error.message}`;
            });
    });

    // Datamuse API
    const fetchDatamuseBtn = document.getElementById("fetch-datamuse-btn");
    const wordInput = document.getElementById("word-input");
    const datamuseResult = document.getElementById("datamuse-result");

    fetchDatamuseBtn.addEventListener("click", async () => {
        const word = wordInput.value.trim();
        const datamuseUrl = `https://api.datamuse.com/words?ml=${word}`;

        try {
            const response = await fetch(datamuseUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            datamuseResult.innerHTML = data.map(item => `<p>${item.word}</p>`).join("");
        } catch (error) {
            datamuseResult.textContent = `Error: ${error.message}`;
        }
    });



    // Form Validation
    const exampleForm = document.getElementById("example-form");
    const formResult = document.getElementById("form-result");

    exampleForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        formResult.textContent = "Form submitted successfully!";
    });
});
