const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
<<<<<<< HEAD
=======
  console.log(req.body, "req.body in server.js");
>>>>>>> bbefb12a9bdcbfb078b116cd10936f5a0cfabdfc
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






// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const apiRoutes = require('./routes/api');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Explicit /api/users route
// app.post('/api/users', (req, res) => {
//   console.log('POST /api/users received:', req.body);
//   const { name, phone } = req.body;
//   res.status(200).json({
//     message: 'Profile updated successfully',
//     data: { name, phone },
//   });
// });

// // Other API routes
// app.use('/api', apiRoutes);

// // Catch-all for debugging
// app.use((req, res) => {
//   console.log(`Unhandled request: ${req.method} ${req.url}`);
//   res.status(404).json({ message: 'Route not found' });
// });

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });