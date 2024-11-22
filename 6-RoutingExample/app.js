"use strict";

const express = require('express');
const multer = require('multer');
const app = express();

// Middleware for parsing URL-encoded bodies (for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none()); // For multipart/form-data

// Route for greeting with a name query parameter
app.get('/greet', (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}!`);
});

// Route for summing two numbers passed as query parameters
app.get('/sum', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        res.status(400).send("Invalid numbers provided.");
    } else {
        res.send(`The sum of ${a} and ${b} is ${a + b}.`);
    }
});

// POST route for handling contact form submissions
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    if (!name || !email || !message) {
        res.status(400).send("Please provide all required fields: name, email, and message.");
    } else {
        res.send(`Thank you, ${name}. We have received your message: "${message}"`);
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
