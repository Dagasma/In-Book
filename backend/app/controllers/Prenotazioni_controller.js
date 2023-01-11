const db = require("../models");
const SERVIZI = require("../models/SERVIZI");
const tab_prenotazioni = db.models.PRENOTAZIONI; //da testare
const Op = db.Sequelize.Op;

var moment = require('moment'); // require

// HH:MM to sum minutes
function minutesFromTime(duration) {
    var parts = duration.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return (hours * 60) + minutes;
}

// somma tra HH:MM e numero di minuti da sommare
function addtime(orario, durata_minima_minutes) {
    var momento = moment(orario, "HH:mm");
    momento.add(durata_minima_minutes, "minutes");
    var orario_nuovo = momento.format("HH:mm");
    return orario_nuovo;
}

async function calcolo_slot_liberi(filtro) {
    var output = {};

    // ritorno il giorno della settimana
    const data_target = new Date(filtro.Data_giorno);
    const giorni = [
        "Lunedi",
        "Martedi",
        "Mercoledi",
        "Giovedi",
        "Venerdi",
        "Sabato",
        "Domenica",
    ];
    const giorno_scelto = giorni[data_target.getDay()];

    // Determino la capienza massima
    const Query_capienza = await db.sequelize.query('SELECT Capienza_massima FROM FORNITORI WHERE ID_utente_fornitore = ?',
        {
            replacements: [filtro.ID_fornitore],
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    // Determino l'orario in cui apre e chiude quel giorno
    const Orari_fornitori = await db.sequelize.query('SELECT Orario_apertura , Orario_chiusura ' +
        'FROM ORARI_ATTIVITA ' +
        'WHERE Giorno_della_settimana=? and ID_fornitore=?',
        {
            replacements: [giorno_scelto, filtro.ID_fornitore],
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    // mi torna una tabella con ORARIO - DURATA - SUM(PERSONE)
    const Query_prenotazioni = await db.sequelize.query('SELECT Orario_prenotazione_inizio ,Durata , SUM(Numero_clienti) ' +
        'FROM `SERVIZI` INNER JOIN `PRENOTAZIONI` ON`SERVIZI`.`ID` = `PRENOTAZIONI`.`ID_servizio` ' +
        'WHERE DATE(Orario_prenotazione_inizio) = ? ' +
        'GROUP BY `PRENOTAZIONI`.`Orario_prenotazione_inizio` ,`SERVIZI`.`Durata` ' +
        'ORDER BY `PRENOTAZIONI`.`Orario_prenotazione_inizio` ASC;',
        {
            replacements: [filtro.Data_giorno],
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    //Calcolo il numero di SLOT
    durata_minima = '00:30:00';
    durata_minima_minutes = minutesFromTime(durata_minima);
    var orari_00 = minutesFromTime((Orari_fornitori[0]).Orario_apertura);
    var orari_01 = minutesFromTime((Orari_fornitori[0]).Orario_chiusura);

    var orari_10 = minutesFromTime((Orari_fornitori[1]).Orario_apertura);
    var orari_11 = minutesFromTime((Orari_fornitori[1]).Orario_chiusura);

    const Number_slot_mattina = (orari_01 - orari_00) / (durata_minima_minutes);
    const Number_slot_pomeriggio = (orari_11 - orari_10) / (durata_minima_minutes);
    const Number_slot = Number_slot_mattina + Number_slot_pomeriggio;

    Capienza_max = Query_capienza[0].Capienza_massima;
    let Array_disponibilita = new Array();

    //Inserisco nella prima colonna l'ora di inizio mentre nella seconda la capienza massima
    for (var i = 0; i < Number_slot; i++) {
        if (i == 0) {
            Array_disponibilita.push({ "Orario_inizio": addtime(Orari_fornitori[0].Orario_apertura.substring(0, 5), 0), "Posti_disponibili": Capienza_max });
        }
        else if (i == Number_slot_mattina) {
            Array_disponibilita.push({ "Orario_inizio": addtime(Orari_fornitori[1].Orario_apertura.substring(0, 5), 0), "Posti_disponibili": Capienza_max });
        }
        else {
            Array_disponibilita.push({ "Orario_inizio": addtime(Array_disponibilita[i - 1]['Orario_inizio'], durata_minima_minutes), "Posti_disponibili": Capienza_max })

        }
    }
    //Inserisco nella prima colonna l'ora di inizio mentre nella seconda la capienza massima
    for (var i = 0; i < Query_prenotazioni.length; i++) {  // per ogni prenotazione
        let orar_table = addtime(String(Query_prenotazioni[i].Orario_prenotazione_inizio).substring(16, 21), -60);
        let index = Array_disponibilita.findIndex(function (element) { return element["Orario_inizio"] == orar_table; });
        if (Query_prenotazioni[i].Durata == durata_minima) {
            Array_disponibilita[index]["Posti_disponibili"] -= Query_prenotazioni[i]['SUM(Numero_clienti)'];
        }
        else {
            for (var j = 0; j < minutesFromTime(Query_prenotazioni[i].Durata) / minutesFromTime(durata_minima); j++) {
                Array_disponibilita[index + j]["Posti_disponibili"] -= Query_prenotazioni[i]['SUM(Numero_clienti)'];
            }
        }
    }
    return Array_disponibilita;
};


// Create and Save a new Prenotazione
exports.effettua_prenotazione = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    
    // Create a Prenotazione
    const prenotazioni = {
        ID_utente: req.body.ID_utente,
        ID_fornitore: req.body.ID_fornitore,
        ID_servizio: req.body.ID_servizio,
        Orario_prenotazione_inizio: req.body.Orario_prenotazione_inzio,
        Orario_prenotazione_fine: req.body.Orario_prenotazione_fine,
        Stato: "Attivo",
        Numero_clienti: req.body.Numero_clienti,
    };

    // Save Prenotazione in the database
    tab_prenotazioni
        .create(prenotazioni)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Prenotazione.",
            });
        });
};

// Retrieve all Prenotazioni from the database by id utente o id fornitore
exports.get_prenotazioni_utente = (req, res) => {
    var id = null;
    var condition = null;

        id = req.query.ID_utente;

        condition = id ? { ID_utente: { [Op.like]: `%${id}%` } } : null;

        tab_prenotazioni.findAll({
            where: condition,
            order: [['Orario_prenotazione_inizio', 'ASC']]
        }
        )
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Prenotazioni."
                });
            });

};

// Retrieve all Prenotazioni from the database by id utente o id fornitore
exports.get_prenotazioni_fornitore = (req, res) => {
    var id = null;
    var condition = null;
        id = req.query.ID_fornitore;

        condition = id ? { ID_fornitore: { [Op.like]: `%${id}%` } } : null;

        tab_prenotazioni.findAll({
            where: condition,
            order: [['Orario_prenotazione_inizio', 'ASC']]
        }
        )
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Prenotazioni."
                });
            });

};

// Retrieve all slot_liberi from the database by id fornitore
exports.get_slot_liberi = (req, res) => {
    //var condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } } : null;
    var filtro = {
        Stato: 'Attivo',
        Data_giorno: req.body.Data_giorno,
        ID_servizio: req.body.ID_servizio,
        ID_fornitore: req.body.ID_fornitore
    };

    //var condition_time = db.sequelize.fn('date', sequelize.col('Orario_prenotazione_inizio'), Op.like, filtro.Data_giorno);
    calcolo_slot_liberi(filtro).then(data => {
        res.send(JSON.stringify(data));})
        .catch (err => {
                      res.status(500).send({
                          message:
                              err.message || "Some error occurred while retrieving Prenotazioni."
                      });
                  });
                

    //   tab_prenotazioni.findAll({ 
    //       include:[{
    //         model: SERVIZI,
    //         required: true
    //       }],
    //       where: {
    //           condition, 
    //           Stato : filtro.Stato,
    //           order: [['Orario_prenotazione', 'ASC']]
    //         } })
    //       .then(data => {
    //           var dati_buoni = calcolo_slot_liberi(data, filtro.Data_giorno, ID_servizio);
    //           res.send(dati_buoni);
    //       })
    //       .catch(err => {
    //           res.status(500).send({
    //               message:
    //                   err.message || "Some error occurred while retrieving Prenotazioni."
    //           });
    //       });

};

exports.annulla_prenotazione = (req, res) => {
    const id = req.params.id_prenotazione;
    const nuovo_Stato = req.params.nuovo_Stato;
 
    tab_prenotazioni
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Prenotazioni was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Prenotazioni with id=${id}. Maybe Prenotazioni was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Prenotazioni with id=" + id,
            });
        });
};

// Delete a tab_prenotazioni with the specified id in the request
exports.delete_prenotazione = (req, res) => {
    const id = req.params.id_prenotazione;

    tab_prenotazioni
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Prenotazioni was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Prenotazioni with id=${id}. Maybe Prenotazioni was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Prenotazioni with id=" + id,
            });
        });
};
