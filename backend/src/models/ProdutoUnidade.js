const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProdutoUnidade = sequelize.define('ProdutoUnidade', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  produtoId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  unidadeProducaoId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'produtos_unidades',
  timestamps: true,
});

module.exports = ProdutoUnidade;
