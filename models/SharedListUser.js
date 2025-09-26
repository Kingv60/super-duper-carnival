// models/SharedListUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const SharedList = require('./SharedList');

const SharedListUser = sequelize.define('SharedListUser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sharedListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SharedList,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

SharedList.belongsToMany(User, { through: SharedListUser, foreignKey: 'sharedListId' });
User.belongsToMany(SharedList, { through: SharedListUser, foreignKey: 'userId' });

module.exports = SharedListUser;
