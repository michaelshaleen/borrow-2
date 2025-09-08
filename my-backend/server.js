require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Move /api/users to apiRoutes to avoid conflicts
app.post('http://localhost:8081/api/users', (req, res) => {
  console.log('POST /api/users received:', req.body);
  const { name, phone } = req.body;
  res.status(200).json({
    message: 'Profile updated successfully',
    data: { name, phone },
  });
});

const PORT = process.env.PORT || 8081; // Avoid 3306 (MySQL)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const apiRoutes = require('./routes/api');

// const app = express();

// // Middleware
// app.use(cors()); // Allow requests from React Native app
// app.use(express.json()); // Parse JSON bodies

// // Routes
// app.use('/api', apiRoutes);

// app.post('http://localhost:5000/api/users', (req, res) => {
//   res.send('API is running...');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });