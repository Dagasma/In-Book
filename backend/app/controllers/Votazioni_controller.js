const db = require("../models");
const tab_votazioni = db.models.VOTAZIONI;
const Op = db.Sequelize.Op;

// Create and Save a new votazioni
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a votazioni
    const votazioni = {
        ID_fornitore: req.body.ID_fornitore,
        ID_utente: req.body.ID_utente,
        Voto: req.body.Voto,
    };

    // Save votazioni in the database
    tab_votazioni
        .create(votazioni)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the votazioni.",
            });
        });
};

// Retrieve all votazioni from the database.
exports.findAll_utente = (req, res) => {
    const ID_utente = req.params.id;
    var condition = ID_utente ? { ID_utente: { [Op.like]: `${ID_utente}` } } : null;

    tab_votazioni
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving votazioni.",
            });
        });
};

exports.findAll_fornitore = (req, res) => {
    const ID_fornitore = req.params.id;
    
    var condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `${ID_fornitore}` } } : null;

    tab_votazioni
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving votazioni.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    tab_votazioni
        .findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find votazione with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving votazione with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const ID_utente = req.params.ID_utente;


    tab_votazioni
        .update(req.body, {
            where: { id: id, ID_utente: ID_utente},
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Votazione was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update votazione with id=${id}. Maybe votazione was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating votazione with id=" + id,
            });
        });
};

// Delete a votazione with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    tab_votazioni
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Votazione was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete votazione with id=${id}. Maybe votazione was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete votazione with id=" + id,
            });
        });
};

// Delete all votazioni from the database.
exports.deleteAll = (req, res) => {
    tab_votazioni
        .destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({
                message: `${nums} votazioni were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all votazioni.",
            });
        });
};


async function Media_voto(filtro) {
    
    // Determino la capienza massima
    const media = await db.sequelize.query('SELECT AVG(VOTO) as media FROM VOTAZIONI WHERE ID_fornitore = ?',
        {
            replacements: [filtro],
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    return media;
};


// Retrieve all slot_liberi from the database by id fornitore
exports.get_media_fornitore = (req, res) => {
    //var condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } } : null;
    var filtro = req.params.id;

    //var condition_time = db.sequelize.fn('date', sequelize.col('Orario_prenotazione_inizio'), Op.like, filtro.Data_giorno);
    Media_voto(filtro).then(data => {
        res.send(JSON.stringify(data));})
        .catch (err => {
                      res.status(500).send({
                          message:
                              err.message || "Some error occurred while retrieving Prenotazioni."
                      });
                  });
                
};

exports.get_voto = (req, res) => {
    const ID_utente = req.params.id_utente;
    const ID_fornitore = req.params.id_fornitore;

    var condition1 = ID_fornitore ? { ID_fornitore: { [Op.like]: `${ID_fornitore}` } } : false;
    var condition2 = ID_utente ? { ID_utente: { [Op.like]: `${ID_utente}` } } : false;

    tab_votazioni
        .findAll({ where: {[Op.and]: [condition1, condition2]}})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving votazioni.",
            });
        });

};
