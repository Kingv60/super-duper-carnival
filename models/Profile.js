const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // your Sequelize instance

const Profile = sequelize.define('Profile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING, // store filename
    allowNull: true
  }
}, {
  tableName: 'profiles',
  timestamps: true
});

module.exports = Profile;
