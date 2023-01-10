const db = require("../models");
const SERVIZI = require("../models/SERVIZI");
const tab_prenotazioni = db.models.PRENOTAZIONI; //da testare
const Op = db.Sequelize.Op;

function calcolo_slot_liberi(prenotazioni_presenti, Data_giorno, ID_servizio) {
    var output = {};

    const data_target = new Date(Data_giorno);

    const giorni = [
        "Lunedi",
        "Martedi",
        "Mercoledi",
        "Giovedi",
        "Venerdi",
        "Sabato",
        "Domenica",
    ];
    var dt = new Date(prenotazioni_presenti.Data_giorno);
    const giorno_scelto = giorni[dt.getDay()];

    const data_view = db.sequelize.query(
        "SELECT * FROM VISTA_CAPIENZA_ATTIVITA_ORARIO_ATTIVITA WHERE ID_fornitore = ? and Giorno_della_settimana = ? ORDER BY ?",
        {
            replacements: [
                prenotazioni_presenti.ID_fornitore,
                giorno_scelto,
                "Orario_apertura",
                "ASC",
            ],
            type: db.sequelize.QueryTypes.SELECT,
        }
    );

    const durata_servizio = db.sequelize.query(
        "SELECT Durata FROM SERVIZI WHERE ID = ?",
        { replacements: [ID_servizio] }
    );
    const capienza = data_view.capienza;

    var query_buggata = [
        "SELECT *",
        "FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore",
        "WHERE TIME(p.Orario_prenotazione) BETWEEN o.orario_apertura AND o.orario_chiusura AND TIME(Date_add(p.Orario_prenotazione) BETWEEN o.orario_apertura AND o.orario_chiusura",
        "AND Date(p.Orario_prenotazione) = ? and o.giorno_della_settimana = ? and p.Stato = 'Attivo';",
    ];

    const slot_occupati = db.sequelize.query(query_buggata, {
        replacements: [Data_giorno, giorno_scelto],
    });

    for (let slot in slot_occupati) {
    }

    return output;
}

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
        Orario_prenotazione: req.body.Orario_prenotazione,
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
exports.get_prenotazioni = (req, res) => {
    var id = null;
    var condition = null;
    if ("ID_utente" in req.query) {
        //se nella ricerca ho ID_utente
        id = req.query.ID_utente;
        condition = id ? { ID_utente: { [Op.like]: `%${id}%` } } : null;
        
        tab_prenotazioni
            .findAll({
                where: condition,
                order: [["Orario_prenotazione", "ASC"]],
            })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving Prenotazioni.",
                });
            });
    } else {
        //se nella ricerca ho ID_fornitore restituisco prenotazioni+clienti associati
        id = req.query.ID_fornitore;
        db.sequelize
            .query(
                "SELECT * FROM VISTA_PRENOTAZIONI_CLIENTI_PER_FORNITORE WHERE ID_fornitore = ? ORDER BY ? ?",
                {
                    replacements: [id, "Orario_prenotazione", "ASC"],
                    type: db.sequelize.QueryTypes.SELECT,
                }
            )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving Prenotazioni.",
                });
            });
    }
};

// Retrieve all slot_liberi from the database by id fornitore
exports.get_slot_liberi = (req, res) => {
    const ID_fornitore = req.query.ID_fornitore;
    var condition = ID_fornitore
        ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } }
        : null;

    var filtro = {
        Stato: "Attivo",
        Data_giorno: req.body.Data_giorno,
        ID_servizio: req.body.ID_servizio,
    };

    var condition_time = db.sequelize.fn(
        "date",
        sequelize.col("Orario_prenotazione"),
        Op.like,
        filtro.Data_giorno
    );

    lista_tab_prenotazioni
        .findAll({
            include: [
                {
                    model: SERVIZI,
                    required: true,
                },
            ],
            where: {
                condition,
                Stato: filtro.Stato,
                condition_time,
                order: [["Orario_prenotazione", "ASC"]],
            },
        })
        .then((data) => {
            var dati_buoni = calcolo_slot_liberi(
                data,
                filtro.Data_giorno,
                ID_servizio
            );
            res.send(dati_buoni);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Prenotazioni.",
            });
        });
};

exports.annulla_prenotazione = (req, res) => {
    const id = req.params.id;

    //bisogna mettere che si usa solo lo stato nel body

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
exports.delete = (req, res) => {
    const id = req.params.id;

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
