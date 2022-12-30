module.exports = function(sequelize, DataTypes, Sequelize) {
  return sequelize.define('PRENOTAZIONI', {
    ID: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      primaryKey: true
    },
    ID_utente: {
      type: DataTypes.CHAR(16),
      allowNull: false
    },
    ID_servizio: {
      type: DataTypes.CHAR(16),
      allowNull: false
    },
    Orario_richiesta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Orario_prenotazione: {
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
        name: "ID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
