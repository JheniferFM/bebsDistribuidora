const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: { type: DataTypes.STRING,
    allowNull: false,
  },
  quantidadeEstoque: { type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  preco: { type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  percentualComissao: { type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0,
  },
  formulaProducao: { type: DataTypes.TEXT,
    allowNull: true,
  },
  descricao: { type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

module.exports = Produto;
