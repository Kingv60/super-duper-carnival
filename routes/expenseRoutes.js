
const express = require('express');
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all expense routes
router.use(authMiddleware);

// Expense routes
router.post('/', createExpense);       // Create expense
router.get('/', getExpenses);          // Get all expenses
router.put('/', updateExpense);    // use query params
router.delete('/', deleteExpense); // use query params

module.exports = router;


