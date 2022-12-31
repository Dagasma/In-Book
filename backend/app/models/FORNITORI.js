
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FORNITORI', {
    ID_utente_fornitore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UTENTI_VISITATORI',
        key: 'ID'
      }
    },
    Nome_Attivita: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Tipo_Attivita: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Indirizzo: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Capienza_massima: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'FORNITORI',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_utente_fornitore" },
        ]
      },
    ]
  });
};
