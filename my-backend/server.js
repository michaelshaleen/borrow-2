require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors()); // Allow requests from React Native app
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', apiRoutes);

app.post('/api/users', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});