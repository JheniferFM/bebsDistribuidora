// Modelo Funcionario representa colaboradores, vinculados a uma equipe
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cargo: { type: DataTypes.STRING, allowNull: true },
  dataAdmissao: { type: DataTypes.DATE, allowNull: true },
  carteiraTrabalho: { type: DataTypes.STRING, allowNull: true },
  cpf: { type: DataTypes.STRING, allowNull: true },
  endereco: { type: DataTypes.STRING, allowNull: true },
  telefones: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'funcionarios',
  timestamps: true,
});

module.exports = Funcionario;
