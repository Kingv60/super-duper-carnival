const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Expense = require('./Expense');
const Budget = require('./Budget');
const SharedList = require('./SharedList');
const SharedExpense = require('./SharedExpense');
const SharedListUser = require('./SharedListUser'); // NEW

// Define associations after all models are loaded
User.hasMany(Category, { foreignKey: 'userId', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Budget, { foreignKey: 'userId', onDelete: 'CASCADE' });
Budget.belongsTo(User, { foreignKey: 'userId' });

// Shared List & Expenses
User.hasMany(SharedList, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
SharedList.belongsTo(User, { foreignKey: 'ownerId' });

SharedList.hasMany(SharedExpense, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });
SharedExpense.belongsTo(SharedList, { foreignKey: 'sharedListId' });

User.hasMany(SharedExpense, { foreignKey: 'userId' });
SharedExpense.belongsTo(User, { foreignKey: 'userId' });

// NEW: track joined users
SharedList.hasMany(SharedListUser, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });
SharedListUser.belongsTo(SharedList, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
  Budget,
  SharedList,
  SharedExpense,
  SharedListUser, // NEW
};

// Also export individual models for direct import
module.exports.User = User;
module.exports.Category = Category;
module.exports.Expense = Expense;
module.exports.Budget = Budget;
module.exports.SharedList = SharedList;
module.exports.SharedExpense = SharedExpense;
module.exports.SharedListUser = SharedListUser; // NEW
