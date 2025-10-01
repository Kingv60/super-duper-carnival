const express = require('express');
const {
  createSharedList,
  joinSharedList,
  addSharedExpense,
  getSharedExpenses,
  deleteSharedList,
  getUserLists,
  updateSharedExpense,   // 👈 add this
  deleteSharedExpense    // 👈 add this
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

// Update expense in shared list
router.put('/expense', updateSharedExpense);   // 👈

// Delete expense from shared list
router.delete('/expense', deleteSharedExpense); // 👈

// Delete a shared list by id
router.delete('/', deleteSharedList);

// Get all lists for a user (created and joined)
router.get('/user', getUserLists);

module.exports = router;
