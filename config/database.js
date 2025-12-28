const { Sequelize } = require('sequelize');
const isProduction = process.env.NODE_ENV === 'production';
const dialect = 'postgres';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'safe_spend_database',
  process.env.DB_USER || 'safe_spend_database_user',
  process.env.DB_PASSWORD || 'YoRnUda6wwWMvIOHwBIexgJ1IuXNwkcZ',
  {
    host: process.env.DB_HOST || 'dpg-d58c31buibrs73aki0k0-a.oregon-postgres.render.com',
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






