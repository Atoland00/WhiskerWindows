const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Mock user data (replace with actual database interaction)
const users = [
  { id: 1, username: 'user1', password: '$2b$10$H/wbv9j2aPvYX/BeMT5KXukPbhx/G4/JJZzi7SC8kj3mX9rFTLifS' } // Hashed password: "password"
];

// Define a secret key for JWT
const JWT_SECRET = 'your_secret_key_here';

// Define the login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username (replace with database query)
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the frontend
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5023, () => {
  console.log('Server is running on port 5023');
});

});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
app.use(express.json());

const db = new sqlite3.Database('your-database.db'); // Connect to your database

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to register user' });
        }
        res.json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5023, () => {
  console.log('Server is running on port 5023');
});

});
