const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numeroPedido: { type: DataTypes.STRING,
    allowNull: false,
  },
  vendedorId: { type: DataTypes.INTEGER,
    allowNull: true,
  },
  clienteId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: { type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: { type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ABERTO',
  },
  total: { type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

module.exports = Pedido;
