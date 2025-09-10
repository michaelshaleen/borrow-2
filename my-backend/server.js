const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  console.log(req.body, "req.body in server.js");
  console.log("hit post /api/register");
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Basic validation for demonstration (in a real app, add proper validation and database storage)
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // Simulate saving to a database
  console.log('New user registered:', { username, email, password });

  res.status(201).json({ message: 'Registration successful' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



