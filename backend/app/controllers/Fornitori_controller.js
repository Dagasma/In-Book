const db = require("../models");
const tab_fornitori = db.models.FORNITORI;
const tab_utenti = db.models.UTENTI;
const Op = db.Sequelize.Op;

// Create and Save a new fornitore
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a fornitore
    const fornitore = {
        ID_utente_fornitore: req.body.ID_utente_fornitore,
        Nome_Attivita: req.body.Nome_Attivita,
        Tipo_Attivita: req.body.Tipo_Attivita,
        Indirizzo: req.body.Indirizzo,
        Capienza_massima: req.body.Capienza_massima,
    };

    // Save fornitore in the database
    tab_fornitori
        .create(fornitore)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the fornitore.",
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    tab_fornitori
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving fornitori.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    tab_fornitori
    .findOne( {
        where: {ID_utente_fornitore: id},
        include: [{
            model: tab_utenti,
            as: "ID_utente_fornitore_UTENTI",
            required : true,
        }]
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find fornitore with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving fornitore with id=" + id,
            });
        });
};

exports.findFornitorebyCliente = (req, res) => {
    const id = req.params.id;

    tab_fornitori
        .findOne( {
            where: {ID_utente_fornitore: id},
            include: [{
                model: tab_utenti,
                as: "ID_utente_fornitore_UTENTI",
                attributes: [ "Email", "Telefono"],
                required : true,
            }]
        })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find fornitore with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving fornitore with id=" + id,
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    tab_fornitori
        .update(req.body, {
            where: { ID_utente_fornitore: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Fornitore was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update fornitore with id=${id}. Maybe fornitore was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating fornitore with id=" + id,
            });
        });
};

// Delete a fornitore with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    tab_fornitori
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Fornitore was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete fornitore with id=${id}. Maybe fornitore was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete fornitore with id=" + id,
            });
        });
};

// Delete all fornitori from the database.
exports.deleteAll = (req, res) => {
    tab_fornitori
        .destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({
                message: `${nums} fornitori were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all fornitori.",
            });
        });
};
