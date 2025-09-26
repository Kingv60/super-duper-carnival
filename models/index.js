const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Expense = require('./Expense');
const Budget = require('./Budget');
const SharedList = require('./SharedList');
const SharedExpense = require('./SharedExpense');
const SharedListUser = require('./SharedListUser');

// Associations
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

// SharedListUser
SharedListUser.belongsTo(SharedList, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });
SharedList.hasMany(SharedListUser, { foreignKey: 'sharedListId' });

SharedListUser.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(SharedListUser, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
  Budget,
  SharedList,
  SharedExpense,
  SharedListUser,
};
