var DataTypes = require("sequelize").DataTypes;
var _FORNITORI = require("./FORNITORI");
var _ORARI_ATTIVITA = require("./ORARI_ATTIVITA");
var _PRENOTAZIONI = require("./PRENOTAZIONI");
var _SERVIZI = require("./SERVIZI");
var _UTENTI_VISITATORI = require("./UTENTI_VISITATORI");

function initModels(sequelize, Sequelize) {
  var FORNITORI = _FORNITORI(sequelize, DataTypes);
  var ORARI_ATTIVITA = _ORARI_ATTIVITA(sequelize, DataTypes);
  var PRENOTAZIONI = _PRENOTAZIONI(sequelize, DataTypes, Sequelize);
  var SERVIZI = _SERVIZI(sequelize, DataTypes);
  var UTENTI_VISITATORI = _UTENTI_VISITATORI(sequelize, DataTypes);


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
