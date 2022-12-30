module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SERVIZI', {
    ID: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      primaryKey: true
    },
    ID_fornitore: {
      type: DataTypes.CHAR(16),
      allowNull: false
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
