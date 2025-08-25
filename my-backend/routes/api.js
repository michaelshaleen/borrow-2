const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');

// POST endpoint to submit form data
router.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Connect to MySQL
    const connection = await connectDB();

    // Insert form data into the users table
    const [result] = await connection.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    // Close the connection
    await connection.end();

    res.status(201).json({ message: 'Form data saved successfully', data: { id: result.insertId, name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
});

module.exports = router;