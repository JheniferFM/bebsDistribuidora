// Configuração da instância do Sequelize (utilizando SQLite para facilidade)
const { Sequelize } = require('sequelize');

// Usa variáveis de ambiente se existirem, senão define defaults
const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';
const DB_STORAGE = process.env.DB_STORAGE || 'database.sqlite';
const DB_LOGGING = process.env.DB_LOGGING === 'true' ? console.log : false;

// Pode ser expandido para outros dialetos (postgres, mysql) conforme necessário
const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
  logging: DB_LOGGING,
});

module.exports = { sequelize };

