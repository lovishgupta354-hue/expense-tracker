/**
 * Transaction Model - Handles all database operations for transactions
 */
const pool = require('../config/db');

/**
 * Get all transactions from the database
 */
const getAllTransactions = async () => {
  const result = await pool.query(
    'SELECT id, title, amount, category, type, date FROM transactions ORDER BY date DESC'
  );
  return result.rows;
};

/**
 * Create a new transaction
 * @param {Object} transaction - { title, amount, category, type, date }
 */
const createTransaction = async (transaction) => {
  const { title, amount, category, type, date } = transaction;
  const result = await pool.query(
    `INSERT INTO transactions (title, amount, category, type, date) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, title, amount, category, type, date`,
    [title, parseFloat(amount), category, type, date || new Date().toISOString().split('T')[0]]
  );
  return result.rows[0];
};

/**
 * Delete a transaction by id
 * @param {number|string} id - Transaction id
 */
const deleteTransaction = async (id) => {
  const result = await pool.query(
    'DELETE FROM transactions WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
};
