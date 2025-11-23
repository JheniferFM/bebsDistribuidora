const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HistoricoEquipe = sequelize.define('HistoricoEquipe', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  equipeId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  funcionarioId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  inicio: { type: DataTypes.DATE,
    allowNull: false,
  },
  fim: { type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'historico_equipes',
  timestamps: true,
});

module.exports = HistoricoEquipe;
