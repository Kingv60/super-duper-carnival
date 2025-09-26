// routes/sharedListRoutes.js
const express = require('express');
const {
  createSharedList,
  addSharedExpense,
  getSharedExpenses
} = require('../controllers/sharedListController');

const router = express.Router();

// Create a new shared list
router.post('/create', createSharedList);

// Add expense to shared list
router.post('/expense', addSharedExpense);

// Get expenses for a shared list
router.get('/expenses', getSharedExpenses);

module.exports = router;
