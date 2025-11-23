const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Campanha = sequelize.define('Campanha', {
  id: { type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  nome: { type: DataTypes.STRING, 
    allowNull: false 
  },
  descricao: { type: DataTypes.TEXT, 
    allowNull: true 
  },
  inicio: { type: DataTypes.DATE, 
    allowNull: false 
  },
  fim: { type: DataTypes.DATE,
     allowNull: false
     },
  garotoPropaganda: { type: DataTypes.STRING, 
    allowNull: true
   },
}, {
  tableName: 'campanhas',
  timestamps: true,
});

module.exports = Campanha;
