const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VOTAZIONI', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_fornitore: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'FORNITORI',
        key: 'ID_utente_fornitore'
      }
    },
    ID_utente: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'UTENTI',
        key: 'ID'
      }
    },
    Voto: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VOTAZIONI',
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
        name: "fk_votazioni_fornitori",
        using: "BTREE",
        fields: [
          { name: "ID_fornitore" },
        ]
      },
      {
        name: "fk_votazioni_utenti",
        using: "BTREE",
        fields: [
          { name: "ID_utente" },
        ]
      },
    ]
  });
};
