const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BLOCCATI', {
    ID_utente: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UTENTI',
        key: 'ID'
      }
    },
    ID_amministratore: {
      type: DataTypes.STRING(36),
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
