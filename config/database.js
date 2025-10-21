const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';
const dialect = 'postgres';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'minor_app_db',
  process.env.DB_USER || 'minor_app_db_user',
  process.env.DB_PASSWORD || 'IVQazKvYjLLIpytFndjVjTaDzMO5f5QQ',
  {
    host: process.env.DB_HOST || 'dpg-d3rpje0dl3ps73fkk2rg-a.oregon-postgres.render.com',
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



