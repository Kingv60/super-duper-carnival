const { Sequelize } = require('sequelize');
const isProduction = process.env.NODE_ENV === 'production';
const dialect = 'postgres';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'minor_project_f15x',
  process.env.DB_USER || 'minor_project_f15x_user',
  process.env.DB_PASSWORD || 'lh7BH5R1RbBdtvBkPJy9GOJqTKxwQjBr',
  {
    host: process.env.DB_HOST || 'd4ikfeggjchc73enl6g0-a.oregon-postgres.render.com',
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
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;



