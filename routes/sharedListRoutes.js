const express = require('express');
const {
  createSharedList,
  addSharedExpense,
  getSharedExpenses,
  getUserSharedLists,
  deleteSharedList
} = require('../controllers/sharedListController');

const router = express.Router();

// Create a new shared list
router.post('/create', createSharedList);

// Add expense to shared list
router.post('/expense', addSharedExpense);

// Get expenses for a shared list
router.get('/expenses', getSharedExpenses);

// Get all shared lists for a user
router.get('/user-lists', getUserSharedLists);

// Delete a shared list (owner only)
router.delete('/delete', deleteSharedList);

module.exports = router;
