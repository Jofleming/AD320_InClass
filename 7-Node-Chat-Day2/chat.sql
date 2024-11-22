-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    date_last_on DATETIME NOT NULL,
    role TEXT CHECK(role IN ('admin', 'member')) NOT NULL
);

-- Insert data into the users table
INSERT INTO users (username, date_last_on, role) VALUES
('Alice', '2024-08-12 10:30:00', 'admin'),
('Bob', '2024-08-12 11:00:00', 'member'),
('Charlie', '2024-08-12 11:15:00', 'member'),
('David', '2024-08-12 11:45:00', 'member'),
('Eve', '2024-08-12 12:00:00', 'admin');

-- Create the messages table
CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    date_sent DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert data into the messages table
INSERT INTO messages (user_id, message, date_sent) VALUES
(1, 'Hello everyone!', '2024-08-12 10:31:00'),
(1, 'How''s everyone doing?', '2024-08-12 10:35:00'),
(2, 'I''m doing great, thanks!', '2024-08-12 11:01:00'),
(2, 'What about you?', '2024-08-12 11:05:00'),
(3, 'Hey Bob, I''m good too!', '2024-08-12 11:16:00'),
(3, 'Looking forward to the weekend!', '2024-08-12 11:18:00'),
(4, 'Same here! Any plans?', '2024-08-12 11:46:00'),
(4, 'Maybe a road trip?', '2024-08-12 11:50:00'),
(5, 'I might stay in and relax.', '2024-08-12 12:01:00'),
(5, 'Catch up on some reading.', '2024-08-12 12:05:00');
