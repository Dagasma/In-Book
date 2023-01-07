const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NOTIFICHE', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_prenotazione: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_utente: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'UTENTI',
        key: 'ID'
      }
    },
    ID_fornitore: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'FORNITORI',
        key: 'ID_utente_fornitore'
      }
    },
    Descrizione_notifica: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'NOTIFICHE',
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
        name: "fk_notifiche_fornitori",
        using: "BTREE",
        fields: [
          { name: "ID_fornitore" },
        ]
      },
      {
        name: "fk_notifiche_utenti",
        using: "BTREE",
        fields: [
          { name: "ID_utente" },
        ]
      },
    ]
  });
};
