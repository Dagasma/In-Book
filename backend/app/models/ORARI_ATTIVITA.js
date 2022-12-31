
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
