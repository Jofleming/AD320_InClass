"use strict";

/**
 * Initialize the contact form by setting up event listeners.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMcontent loaded")
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation");

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting normally
        validateForm.call(form);
    });

    // Add event listener for input focus
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.classList.remove("error");
        });
    });
});

/**
 * Validates the contact form and shows a confirmation message if valid.
 * If not valid, highlights the invalid fields.
 */
function validateForm() {
    console.log("Starting form validation");
    const name = this.querySelector("#name");
    const email = this.querySelector("#email");
    const message = this.querySelector("#message");
    let isValid = true;

    if (!name.value.trim()) {
        name.classList.add("error");
        isValid = false;
        console.log("Name validation failed"); // Check validation steps
    }

    if (!validateEmail(email.value.trim())) {
        email.classList.add("error");
        isValid = false;
    }

    if (!message.value.trim()) {
        message.classList.add("error");
        isValid = false;
    }

    if (isValid) {
        displayConfirmation();
    }
    else {
        console.log("failed");
    }
}

/**
 * Displays the confirmation message and hides the form.
 */
const displayConfirmation = () => {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation");

    form.classList.add("hidden");
    confirmationMessage.classList.remove("hidden");
    console.log("Confirmation message displayed");
};

/**
 * Validates the email format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
};
