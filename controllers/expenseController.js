const Expense = require('../models/Expense');
const { Op } = require('sequelize');

// CREATE EXPENSE
const createExpense = async (req, res) => {
  const { userId, amount, description, date, receiptUrl } = req.body;

  if (!userId) return res.status(400).json({ message: 'userId is required' });

  try {
    const recentWindowMs = 5000;
    const cutoff = new Date(Date.now() - recentWindowMs);

    const existingRecent = await Expense.findOne({
      where: {
        userId,
        amount,
        description,
        date,
        createdAt: { [Op.gte]: cutoff },
      },
      order: [['createdAt', 'DESC']],
    });

    if (existingRecent) {
      res.set('x-deduped', 'true');
      return res.status(200).json(existingRecent);
    }

    const expense = await Expense.create({
      userId,
      amount,
      description,
      date,
      receiptUrl,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expense', error: error.message });
  }
};

// GET EXPENSES BY USER ID
const getExpenses = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId parameter is required' });

  try {
    const expenses = await Expense.findAll({ where: { userId } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const { userId, Id } = req.query; // Get both from query params
    const { amount, description, date, receiptUrl } = req.body;

    if (!userId || !Id) {
      return res.status(400).json({ message: 'userId and Id are required in query params' });
    }

    const expense = await Expense.findOne({ where: { id: Id, userId } });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.update({ amount, description, date, receiptUrl });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error: error.message });
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const { userId, Id } = req.query; // Get both from query params

    if (!userId || !Id) {
      return res.status(400).json({ message: 'userId and Id are required in query params' });
    }

    const expense = await Expense.findOne({ where: { id: Id, userId } });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
