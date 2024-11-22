document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatBox = document.getElementById('chat-box');
  const usersList = document.getElementById('users-list');

  // Function to fetch and display messages
  async function fetchMessages() {
      const response = await fetch('/get-messages');
      const messages = await response.json();
      displayMessages(messages);
  }

  // Function to display messages in the chatbox
  function displayMessages(messages) {
      chatBox.innerHTML = '';
      messages.forEach(({ username, message, date_sent }) => {
          const messageElement = document.createElement('p');
          messageElement.textContent = `${username} (${new Date(date_sent).toLocaleString()}): ${message}`;
          chatBox.appendChild(messageElement);
      });
  }

  // Function to fetch and display users
  async function fetchUsers() {
      const response = await fetch('/get-users');
      const users = await response.json();
      displayUsers(users);
  }

  function displayUsers(users) {
    usersList.innerHTML = '';
    users.forEach(username => {
        const listItem = document.createElement('li');
        listItem.textContent = username;  // Display the username
        usersList.appendChild(listItem);
    });
}


  // Handle form submission for sending a message
  chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const message = document.getElementById('message').value.trim();

      if (username && message) {
          const response = await fetch('/send-message', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, message })
          });

          if (response.ok) {
              document.getElementById('message').value = '';
              fetchMessages();  // Refresh messages after sending
              fetchUsers();     // Refresh users list after sending
          } else {
              alert('Error sending message');
          }
      } else {
          alert('Please enter both a username and a message.');
      }
  });

  // Initial fetch of messages and users
  fetchMessages();
  fetchUsers();

  // Periodically refresh messages and users
  setInterval(fetchMessages, 5000);  // Refresh messages every 5 seconds
  setInterval(fetchUsers, 10000);    // Refresh users list every 10 seconds
});
