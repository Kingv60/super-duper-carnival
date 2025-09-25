// models/SharedExpense.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const SharedList = require('./SharedList');

const SharedExpense = sequelize.define('SharedExpense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sharedListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

SharedExpense.belongsTo(SharedList, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });
SharedList.hasMany(SharedExpense, { foreignKey: 'sharedListId' });

module.exports = SharedExpense;
