const express = require('express');
const { register, login } = require('../controllers/authController');
const { createExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/expenses', createExpense);

module.exports = router;
