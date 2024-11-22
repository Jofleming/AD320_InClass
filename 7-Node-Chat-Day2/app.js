'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();
const port = 3005;

// Middleware to parse JSON bodies and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Function to get a database connection
async function getDBConnection() {
    const db = await sqlite.open({
        filename: './chat.db',  // Your SQLite database file
        driver: sqlite3.Database
    });
    return db;
}

// Initialize the database (create tables if they don't exist)
async function initializeDatabase() {
    const db = await getDBConnection();
    
    // Create users table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            date_last_on DATETIME NOT NULL,
            role TEXT CHECK(role IN ('admin', 'member')) NOT NULL
        );
    `);

    // Create messages table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            message_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            date_sent DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `);

    await db.close();
}

// Initialize the database when the server starts
initializeDatabase();

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the chat page
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Route to serve the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route to serve the queries page
app.get('/queries', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'queries.html'));
});

// Route to handle sending messages
app.post('/send-message', async (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ error: 'Username and message are required' });
    }

    try {
        const db = await getDBConnection();

        // Check if the user already exists
        let user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            // Insert the new user into the users table if not exists
            await db.run('INSERT INTO users (username, date_last_on, role) VALUES (?, ?, ?)', 
                [username, new Date().toISOString(), 'member']);
            // Fetch the user again to get the newly generated user_id
            user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        } else {
            // Update the date_last_on for existing users
            await db.run('UPDATE users SET date_last_on = ? WHERE user_id = ?', 
                [new Date().toISOString(), user.user_id]);
        }

        // Insert the message into the messages table
        await db.run('INSERT INTO messages (user_id, message, date_sent) VALUES (?, ?, ?)', 
            [user.user_id, message, new Date().toISOString()]);

        await db.close();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

// Route to fetch chat messages
app.get('/get-messages', async (req, res) => {
    try {
        const db = await getDBConnection();
        const messages = await db.all(
            'SELECT u.username, m.message, m.date_sent FROM messages m JOIN users u ON m.user_id = u.user_id ORDER BY m.date_sent ASC'
        );
        await db.close();

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Route to fetch online users
app.get('/get-users', async (req, res) => {
  try {
      const db = await getDBConnection();
      const users = await db.all('SELECT username FROM users ORDER BY date_last_on DESC');
      await db.close();

      // Extract the usernames from the user objects
      const usernames = users.map(user => user.username);

      res.json(usernames);  // Return an array of usernames
  } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
  }
});

// Route to get the list of admins
app.get('/query-admins', async (req, res) => {
    try {
        const db = await getDBConnection();
        const admins = await db.all('SELECT * FROM users WHERE role = "admin"');
        await db.close();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
});

// Route to get the last 3 users online
app.get('/query-recent-users', async (req, res) => {
    try {
        const db = await getDBConnection();
        const recentUsers = await db.all('SELECT * FROM users ORDER BY date_last_on DESC LIMIT 3');
        await db.close();
        res.json(recentUsers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recent users' });
    }
});

// Route to get the last 5 messages
app.get('/query-recent-messages', async (req, res) => {
    try {
        const db = await getDBConnection();
        const recentMessages = await db.all('SELECT * FROM messages ORDER BY date_sent DESC LIMIT 5');
        await db.close();
        res.json(recentMessages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recent messages' });
    }
});

// Start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} else {
    module.exports = app; // Export the app for testing
}
