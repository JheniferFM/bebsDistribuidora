const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CampanhaProduto = sequelize.define('CampanhaProduto', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campanhaId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  produtoId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  precoPromocional: { type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'campanhas_produtos',
  timestamps: true,
});

module.exports = CampanhaProduto;
