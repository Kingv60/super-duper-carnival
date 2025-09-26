// controllers/sharedListController.js
const { SharedList, SharedExpense } = require('../models');
const crypto = require('crypto');

// Create a new shared list
const createSharedList = async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) return res.status(400).json({ message: 'userId and name required' });

  const shareCode = crypto.randomBytes(4).toString('hex'); // Unique 8-char code

  try {
    const list = await SharedList.create({ name, ownerId: userId, shareCode });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create shared list', error: error.message });
  }
};

// Add expense to shared list
const addSharedExpense = async (req, res) => {
  const { shareCode, userId, description, amount } = req.body;
  if (!shareCode || !userId || !amount) return res.status(400).json({ message: 'shareCode, userId, amount required' });

  try {
    const list = await SharedList.findOne({ where: { shareCode } });
    if (!list) return res.status(404).json({ message: 'Shared list not found' });

    const expense = await SharedExpense.create({
      description,
      amount,
      userId,
      sharedListId: list.id,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
};

// Get expenses for a shared list
const getSharedExpenses = async (req, res) => {
  const { shareCode } = req.query;
  if (!shareCode) return res.status(400).json({ message: 'shareCode required' });

  try {
    const list = await SharedList.findOne({ where: { shareCode }, include: SharedExpense });
    if (!list) return res.status(404).json({ message: 'Shared list not found' });

    res.json(list.SharedExpenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
};

module.exports = { createSharedList, addSharedExpense, getSharedExpenses };
