const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // your DB connection

const Profile = sequelize.define('Profile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING // store URL or file path
  }
}, {
  timestamps: true
});

module.exports = Profile;
