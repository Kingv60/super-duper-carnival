const express = require('express');
const {
  createSharedList,
  joinSharedList,
  addSharedExpense,
  getSharedExpenses,
  deleteSharedList,
  getUserLists
} = require('../controllers/sharedListController');

const router = express.Router();

// Create a new shared list
router.post('/create', createSharedList);

// Join a shared list
router.post('/join', joinSharedList);

// Add expense to shared list
router.post('/expense', addSharedExpense);

// Get expenses for a shared list
router.get('/expenses', getSharedExpenses);

// Delete a shared list by id
router.delete('/:id', deleteSharedList);

// Get all lists for a user (created and joined)
router.get('/user/:userId', getUserLists);

module.exports = router;
