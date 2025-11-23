const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PedidoItem = sequelize.define('PedidoItem', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pedidoId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  produtoId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  precoUnitario: { type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'pedidos_itens',
  timestamps: true,
});

module.exports = PedidoItem;
