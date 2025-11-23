const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProdutoEmbalagem = sequelize.define('ProdutoEmbalagem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  produtoId: { type: DataTypes.INTEGER, allowNull: false },
  embalagemId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'produtos_embalagens', timestamps: true });

module.exports = ProdutoEmbalagem;

