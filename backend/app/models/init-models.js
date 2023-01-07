var DataTypes = require("sequelize").DataTypes;
var _BLOCCATI = require("./BLOCCATI");
var _FORNITORI = require("./FORNITORI");
var _NOTIFICHE = require("./NOTIFICHE");
var _ORARI_ATTIVITA = require("./ORARI_ATTIVITA");
var _PRENOTAZIONI = require("./PRENOTAZIONI");
var _SERVIZI = require("./SERVIZI");
var _UTENTI = require("./UTENTI");
var _VOTAZIONI = require("./VOTAZIONI");

function initModels(sequelize) {
  var BLOCCATI = _BLOCCATI(sequelize, DataTypes);
  var FORNITORI = _FORNITORI(sequelize, DataTypes);
  var NOTIFICHE = _NOTIFICHE(sequelize, DataTypes);
  var ORARI_ATTIVITA = _ORARI_ATTIVITA(sequelize, DataTypes);
  var PRENOTAZIONI = _PRENOTAZIONI(sequelize, DataTypes);
  var SERVIZI = _SERVIZI(sequelize, DataTypes);
  var UTENTI = _UTENTI(sequelize, DataTypes);
  var VOTAZIONI = _VOTAZIONI(sequelize, DataTypes);

  NOTIFICHE.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(NOTIFICHE, { as: "NOTIFICHEs", foreignKey: "ID_fornitore"});
  ORARI_ATTIVITA.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(ORARI_ATTIVITA, { as: "ORARI_ATTIVITa", foreignKey: "ID_fornitore"});
  PRENOTAZIONI.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(PRENOTAZIONI, { as: "PRENOTAZIONIs", foreignKey: "ID_fornitore"});
  SERVIZI.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(SERVIZI, { as: "SERVIZIs", foreignKey: "ID_fornitore"});
  VOTAZIONI.belongsTo(FORNITORI, { as: "ID_fornitore_FORNITORI", foreignKey: "ID_fornitore"});
  FORNITORI.hasMany(VOTAZIONI, { as: "VOTAZIONIs", foreignKey: "ID_fornitore"});
  PRENOTAZIONI.belongsTo(SERVIZI, { as: "ID_servizio_SERVIZI", foreignKey: "ID_servizio"});
  SERVIZI.hasMany(PRENOTAZIONI, { as: "PRENOTAZIONIs", foreignKey: "ID_servizio"});
  BLOCCATI.belongsTo(UTENTI, { as: "ID_utente_UTENTI", foreignKey: "ID_utente"});
  UTENTI.hasOne(BLOCCATI, { as: "BLOCCATI", foreignKey: "ID_utente"});
  BLOCCATI.belongsTo(UTENTI, { as: "ID_amministratore_UTENTI", foreignKey: "ID_amministratore"});
  UTENTI.hasMany(BLOCCATI, { as: "ID_amministratore_BLOCCATIs", foreignKey: "ID_amministratore"});
  FORNITORI.belongsTo(UTENTI, { as: "ID_utente_fornitore_UTENTI", foreignKey: "ID_utente_fornitore", onDelete: 'cascade', hooks: true});
  UTENTI.hasOne(FORNITORI, { as: "FORNITORI", foreignKey: "ID_utente_fornitore"});
  NOTIFICHE.belongsTo(UTENTI, { as: "ID_utente_UTENTI", foreignKey: "ID_utente"});
  UTENTI.hasMany(NOTIFICHE, { as: "NOTIFICHEs", foreignKey: "ID_utente"});
  PRENOTAZIONI.belongsTo(UTENTI, { as: "ID_utente_UTENTI", foreignKey: "ID_utente"});
  UTENTI.hasMany(PRENOTAZIONI, { as: "PRENOTAZIONIs", foreignKey: "ID_utente"});
  VOTAZIONI.belongsTo(UTENTI, { as: "ID_utente_UTENTI", foreignKey: "ID_utente"});
  UTENTI.hasMany(VOTAZIONI, { as: "VOTAZIONIs", foreignKey: "ID_utente"});

  return {
    BLOCCATI,
    FORNITORI,
    NOTIFICHE,
    ORARI_ATTIVITA,
    PRENOTAZIONI,
    SERVIZI,
    UTENTI,
    VOTAZIONI,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
