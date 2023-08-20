const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/add-user', (req, res) => {
  // Process data received in req.body
  const userData = req.body;
  // Perform database operations to add the user
  // Return a response indicating success or failure
  res.json({ message: 'User added successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const response = await fetch('/add-user', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      alert('Failed to add user');
    }
  });
  