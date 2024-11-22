"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

let usersOnline = ['Alice', 'Bob', 'Charlie', 'David']; // Initial users for testing
let messages = [];

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home Page Route - Lists current users online
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chat Page Route - Main chat interface
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// About Page Route - Simple about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Handle new user joining
app.post('/join', (req, res) => {
    const { username } = req.body;
    if (username && !usersOnline.includes(username)) {
      usersOnline.push(username);
    }
    res.json({ usersOnline });
  });

// Handle message submission
app.post('/send-message', (req, res) => {
  const { username, message } = req.body;
  if (username && message) {
    messages.push({ username, message });
    res.json({ success: true });
  } else {
    res.json({ success: false, error: 'Username and message are required.' });
  }
});

// Handle retrieving messages
app.get('/get-messages', (req, res) => {
  res.json(messages);
});

// Handle retrieving online users
app.get('/get-users', (req, res) => {
    console.log('Fetching users:', usersOnline); // Debugging: Log the usersOnline array
    res.json(usersOnline);
  });

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} else {
  module.exports = app; // Export app for testing
}
