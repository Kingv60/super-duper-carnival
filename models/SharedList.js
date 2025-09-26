// models/SharedList.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const SharedListUser = require('./SharedListUser'); // import the new model

const SharedList = sequelize.define('SharedList', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shareCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
SharedList.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
User.hasMany(SharedList, { foreignKey: 'ownerId' });

// Associate with SharedListUser for joined users
SharedList.hasMany(SharedListUser, { foreignKey: 'sharedListId', onDelete: 'CASCADE' });

module.exports = SharedList;
