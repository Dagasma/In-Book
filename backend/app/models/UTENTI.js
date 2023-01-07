const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UTENTI', {
    ID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    Nome: {
      type: DataTypes.CHAR(16),
      allowNull: false
    },
    Cognome: {
      type: DataTypes.CHAR(16),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "Email"
    },
    Data_di_nascita: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "Telefono"
    },
    Tipo: {
      type: DataTypes.ENUM('Cliente','Amministratore','Fornitore'),
      allowNull: false
    },
    Bloccato: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'UTENTI',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
      {
        name: "Telefono",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Telefono" },
        ]
      },
    ]
  });
};
