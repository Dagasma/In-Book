const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PRENOTAZIONI', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    ID_servizio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SERVIZI',
        key: 'ID'
      }
    },
    Orario_richiesta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Orario_prenotazione_inizio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Orario_prenotazione_fine: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Stato: {
      type: DataTypes.ENUM('Attivo','Annullato','Completato'),
      allowNull: true
    },
    Numero_clienti: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'PRENOTAZIONI',
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
        name: "fk_prenotazioni_servizi",
        using: "BTREE",
        fields: [
          { name: "ID_servizio" },
        ]
      },
      {
        name: "fk_prenotazioni_utenti",
        using: "BTREE",
        fields: [
          { name: "ID_utente" },
        ]
      },
      {
        name: "fk_prenotazioni_fornitori",
        using: "BTREE",
        fields: [
          { name: "ID_fornitore" },
        ]
      },
    ]
  });
};
