const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FuncionarioEquipe = sequelize.define('FuncionarioEquipe', {
  id: { type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  funcionarioId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  equipeId: { type: DataTypes.INTEGER,
    allowNull: false,
  },
  inicio: { type: DataTypes.DATE,
    allowNull: false,
  },
  fim: { type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'funcionarios_equipes',
  timestamps: true,
});

module.exports = FuncionarioEquipe;
