/**
 * Transaction Routes - Define API endpoints for transactions
 */
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// GET all transactions
router.get('/', transactionController.getTransactions);

// POST create new transaction
router.post('/', transactionController.createTransaction);

// DELETE transaction by id
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
