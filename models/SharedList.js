// models/SharedList.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

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

SharedList.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
User.hasMany(SharedList, { foreignKey: 'ownerId' });

module.exports = SharedList;
