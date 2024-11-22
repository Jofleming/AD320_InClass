document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
  
    // Function to set a cookie
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `; expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }
  
    // Function to get a cookie
    function getCookie(name) {
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    // Function to join a user
    async function joinUser(username) {
      const response = await fetch('/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      console.log('Join response:', data); // Debugging: Log the response from /join
    }
  
    // Load messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    displayMessages(storedMessages);
  
    // Retrieve username from cookie if it exists
    const savedUsername = getCookie('username');
    if (savedUsername) {
      document.getElementById('username').value = savedUsername;
    }
  
    async function fetchMessages() {
      const response = await fetch('/get-messages');
      const messages = await response.json();
      displayMessages(messages);
      // Save messages to local storage
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  
    // Function to display messages
    function displayMessages(messages) {
      chatBox.innerHTML = '';
      messages.forEach(({ username, message }) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${username}: ${message}`;
        chatBox.appendChild(messageElement);
      });
    }
  
    setInterval(fetchMessages, 2000);
  
    chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const message = document.getElementById('message').value.trim();
  
      if (username && message) {
        // Save the username in a cookie
        setCookie('username', username, 7); // The username will be stored for 7 days
  
        // Join the user before sending a message
        await joinUser(username);
  
        // Send the message
        const response = await fetch('/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, message }),
        });
        const result = await response.json();
        if (result.success) {
          document.getElementById('message').value = '';
          fetchMessages();
        } else {
          alert(result.error);
        }
      } else {
        alert('Please enter both a username and a message.');
      }
    });
  });
  