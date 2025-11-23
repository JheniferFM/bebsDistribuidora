const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  razaoSocial: { type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: { type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: { type: DataTypes.STRING,
    allowNull: true,
  },
  telefone: { type: DataTypes.STRING,
    allowNull: true,
  },
  contato: { type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clientes',
  timestamps: true,
});

module.exports = Cliente;
