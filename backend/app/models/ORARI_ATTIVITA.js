const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ORARI_ATTIVITA', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_fornitore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FORNITORI',
        key: 'ID_utente_fornitore'
      }
    },
    Giorno_della_settimana: {
      type: DataTypes.ENUM('Lunedi','Martedi','Mercoledi','Giovedi','Venerdi','Sabato','Domenica'),
      allowNull: false
    },
    Orario_apertura: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Orario_chiusura: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ORARI_ATTIVITA',
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
        name: "fk_orari_fornitori",
        using: "BTREE",
        fields: [
          { name: "ID_fornitore" },
        ]
      },
    ]
  });
};
