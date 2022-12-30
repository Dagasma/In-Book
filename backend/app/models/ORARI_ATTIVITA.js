module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ORARI_ATTIVITA', {
    ID: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      primaryKey: true
    },
    ID_fornitore: {
      type: DataTypes.CHAR(16),
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
