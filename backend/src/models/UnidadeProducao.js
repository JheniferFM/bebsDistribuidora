// Modelo UnidadeProducao representa a fábrica/unidade onde produtos são produzidos
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UnidadeProducao = sequelize.define('UnidadeProducao', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  areaConstruida: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'unidades_producao',
  timestamps: true,
});

module.exports = UnidadeProducao;
