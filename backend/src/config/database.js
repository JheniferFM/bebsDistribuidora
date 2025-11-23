const { Sequelize } = require('sequelize');

const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';
const DB_STORAGE = process.env.DB_STORAGE || 'database.sqlite';
const DB_LOGGING = process.env.DB_LOGGING === 'true' ? console.log : false;

const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
  logging: DB_LOGGING,
});

module.exports = { sequelize };
