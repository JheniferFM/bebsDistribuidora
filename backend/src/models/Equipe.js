// Modelo Equipe representa equipes de venda e suas informações
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Equipe = sequelize.define('Equipe', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  regiao: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'equipes',
  timestamps: true,
});

module.exports = Equipe;
