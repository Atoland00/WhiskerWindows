const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    // Add login logic here (e.g., AJAX request to a server)
});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    // Add signup logic here (e.g., AJAX request to a server)
});
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
