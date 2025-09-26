// controllers/sharedListController.js
const { SharedList, SharedExpense, SharedListUser } = require('../models');
const crypto = require('crypto');

// Create a new shared list
const createSharedList = async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) return res.status(400).json({ message: 'userId and name required' });

  const shareCode = crypto.randomBytes(4).toString('hex'); // Unique 8-char code

  try {
    const list = await SharedList.create({ name, ownerId: userId, shareCode });

    // Optional: add owner as joined user
    await SharedListUser.create({ userId, sharedListId: list.id });

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

// Get all lists for a user (created + joined)
const getUserSharedLists = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  try {
    // Lists owned by user
    const ownedLists = await SharedList.findAll({ where: { ownerId: userId } });

    // Lists joined by user
    const joinedLists = await SharedList.findAll({
      include: {
        model: SharedListUser,
        where: { userId },
        attributes: [], // we just need the list
      },
    });

    // Combine and remove duplicates
    const allLists = [...ownedLists, ...joinedLists];
    const uniqueLists = Array.from(new Map(allLists.map(l => [l.id, l])).values());

    res.json(uniqueLists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lists', error: error.message });
  }
};

// Delete a shared list (only owner)
const deleteSharedList = async (req, res) => {
  const { listId, userId } = req.body;
  if (!listId || !userId) return res.status(400).json({ message: 'listId and userId required' });

  try {
    const list = await SharedList.findOne({ where: { id: listId, ownerId: userId } });
    if (!list) return res.status(404).json({ message: 'List not found or not owner' });

    await list.destroy(); // deletes list and cascades to SharedListUser

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete list', error: error.message });
  }
};

module.exports = {
  createSharedList,
  addSharedExpense,
  getSharedExpenses,
  getUserSharedLists,
  deleteSharedList,
};
