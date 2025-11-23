// Modelo Embalagem representa o tipo e volume do recipiente do produto
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Embalagem = sequelize.define('Embalagem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  material: { type: DataTypes.STRING, allowNull: false },
  custo: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  volume: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  unidadeVolume: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'embalagens',
  timestamps: true,
});

module.exports = Embalagem;
