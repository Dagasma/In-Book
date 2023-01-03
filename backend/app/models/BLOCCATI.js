const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BLOCCATI', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_utente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UTENTI',
        key: 'ID'
      }
    },
    ID_amministratore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UTENTI',
        key: 'ID'
      }
    },
    Descrizione_notifica: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BLOCCATI',
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
        name: "fk_bloccati_utenti",
        using: "BTREE",
        fields: [
          { name: "ID_utente" },
        ]
      },
      {
        name: "fk_bloccati_amministratori",
        using: "BTREE",
        fields: [
          { name: "ID_amministratore" },
        ]
      },
    ]
  });
};
