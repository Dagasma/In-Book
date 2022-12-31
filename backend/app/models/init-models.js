var DataTypes = require("sequelize").DataTypes;
var _FORNITORI = require("./FORNITORI");
var _ORARI_ATTIVITA = require("./ORARI_ATTIVITA");
var _PRENOTAZIONI = require("./PRENOTAZIONI");
var _SERVIZI = require("./SERVIZI");
var _UTENTI_VISITATORI = require("./UTENTI_VISITATORI");

function initModels(sequelize) {
  var FORNITORI = _FORNITORI(sequelize, DataTypes);
  var ORARI_ATTIVITA = _ORARI_ATTIVITA(sequelize, DataTypes);
  var PRENOTAZIONI = _PRENOTAZIONI(sequelize, DataTypes);
  var SERVIZI = _SERVIZI(sequelize, DataTypes);
  var UTENTI_VISITATORI = _UTENTI_VISITATORI(sequelize, DataTypes);

  ORARI_ATTIVITA.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(ORARI_ATTIVITA, { as: "ORARI_ATTIVITa", foreignKey: "ID_fornitore"});
  SERVIZI.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(SERVIZI, { as: "SERVIZIs", foreignKey: "ID_fornitore"});
  PRENOTAZIONI.belongsTo(SERVIZI, { as: "ID_servizio_SERVIZI", foreignKey: "ID_servizio"});
  SERVIZI.hasMany(PRENOTAZIONI, { as: "PRENOTAZIONIs", foreignKey: "ID_servizio"});
  FORNITORI.belongsTo(UTENTI_VISITATORI, { as: "ID_utente_fornitore_UTENTI_VISITATORI", foreignKey: "ID_utente_fornitore"});
  UTENTI_VISITATORI.hasOne(FORNITORI, { as: "FORNITORI", foreignKey: "ID_utente_fornitore"});
  PRENOTAZIONI.belongsTo(UTENTI_VISITATORI, { as: "ID_utente_UTENTI_VISITATORI", foreignKey: "ID_utente"});
  UTENTI_VISITATORI.hasMany(PRENOTAZIONI, { as: "PRENOTAZIONIs", foreignKey: "ID_utente"});

  return {
    FORNITORI,
    ORARI_ATTIVITA,
    PRENOTAZIONI,
    SERVIZI,
    UTENTI_VISITATORI,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
