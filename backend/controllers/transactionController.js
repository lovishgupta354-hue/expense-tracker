/**
 * Transaction Controller - Handles request/response for transaction endpoints
 */
const Transaction = require('../models/Transaction');

/**
 * GET /transactions - Fetch all transactions
 */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

/**
 * POST /transactions - Create a new transaction
 * Body: { title, amount, category, type, date? }
 */
const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    // Basic validation
    if (!title || amount === undefined || amount === null || !category || !type) {
      return res.status(400).json({
        error: 'Missing required fields: title, amount, category, and type are required',
      });
    }
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'type must be "income" or "expense"' });
    }

    const transaction = await Transaction.createTransaction({
      title,
      amount,
      category,
      type,
      date,
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

/**
 * DELETE /transactions/:id - Delete a transaction by id
 */
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.deleteTransaction(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted', id: deleted.id });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};
