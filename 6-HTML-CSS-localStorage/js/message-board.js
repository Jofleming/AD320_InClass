"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const loginSection = document.getElementById("login-section");
    const messageBoard = document.getElementById("message-board");
    const usernameInput = document.getElementById("username");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginStatus = document.getElementById("login-status");
    const postMessageBtn = document.getElementById("post-message-btn");
    const messageInput = document.getElementById("message");
    const messagesContainer = document.getElementById("messages-container");

    // Check if user is already logged in
    const sessionUser = getCookie("sessionUser");
    if (sessionUser) {
        loginSuccess(sessionUser);
    }

    // Login button click handler
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username) {
            setCookie("sessionUser", username, 3); // Set session cookie for 3 hours
            loginSuccess(username);
        } else {
            loginStatus.textContent = "Please enter a username.";
        }
    });

    // Logout button click handler
    logoutBtn.addEventListener("click", () => {
        deleteCookie("sessionUser");
        logoutSuccess();
    });

    postMessageBtn.addEventListener("click", () => {
        const sessionUser = getCookie("sessionUser"); // Ensure we get the sessionUser each time
        const message = messageInput.value.trim();
        if (sessionUser && message) {
            const messages = getStoredMessages();
            messages.push({ user: sessionUser, message: message });
            localStorage.setItem("messages", JSON.stringify(messages));
            displayMessages(messages);
            messageInput.value = ""; // Clear the input
        } else {
            alert("You must be logged in to post a message.");
        }
    });

    // Functions
    function loginSuccess(username) {
        loginSection.style.display = "none";
        messageBoard.style.display = "block";
        logoutBtn.style.display = "block";
        loginStatus.textContent = `Logged in as ${username}`;
        usernameInput.value = ""; // Clear the input
        displayMessages(getStoredMessages());
    }

    function logoutSuccess() {
        loginSection.style.display = "block";
        messageBoard.style.display = "none";
        logoutBtn.style.display = "none";
        loginStatus.textContent = "You have logged out.";
        messagesContainer.innerHTML = ""; // Clear messages
    }

    function displayMessages(messages) {
        messagesContainer.innerHTML = messages.map(msg => `<p><strong>${msg.user}:</strong> ${msg.message}</p>`).join("");
    }

    function getStoredMessages() {
        const messages = localStorage.getItem("messages");
        return messages ? JSON.parse(messages) : [];
    }

    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function getCookie(name) {
        const cookieArr = document.cookie.split("; ");
        for (let cookie of cookieArr) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) return cookieValue;
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
});
