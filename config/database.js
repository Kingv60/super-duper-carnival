const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';
const dialect = 'postgres';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'minordb_12il',
  process.env.DB_USER || 'vishal',
  process.env.DB_PASSWORD || 'lGqS47qiKHeG8hYA0F35ERNwJGcNqcIH',
  {
    host: process.env.DB_HOST || 'dpg-d3809c1r0fns73fc8jgg-a',
    dialect: dialect,
    logging: false,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: isProduction ? { require: true, rejectUnauthorized: false } : false
    }
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
