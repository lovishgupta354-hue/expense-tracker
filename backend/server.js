/**
 * Expense Tracker - Backend Server
 * Node.js + Express REST API
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - parse JSON body and allow frontend origin
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Expense Tracker API is running' });
});

// Create transactions table if it doesn't exist (beginner-friendly setup)
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
        date DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `);
    console.log('Database table ready');
  } catch (err) {
    console.error('Database init error:', err.message);
    process.exit(1);
  }
}

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
