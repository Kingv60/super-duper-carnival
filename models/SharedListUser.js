// models/SharedListUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const SharedList = require('./SharedList');
const User = require('./User');

const SharedListUser = sequelize.define('SharedListUser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sharedListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
SharedListUser.belongsTo(SharedList, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });
SharedList.hasMany(SharedListUser, { foreignKey: 'sharedListId' });

SharedListUser.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(SharedListUser, { foreignKey: 'userId' });

module.exports = SharedListUser;
