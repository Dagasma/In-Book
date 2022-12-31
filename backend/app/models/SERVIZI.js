module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SERVIZI', {
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
    Tipologia: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    Descrizione: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    Durata: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'SERVIZI',
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
        name: "fk_servizi_fornitori",
        using: "BTREE",
        fields: [
          { name: "ID_fornitore" },
        ]
      },
    ]
  });
};
