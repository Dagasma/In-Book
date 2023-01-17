const db = require("../models");
const tab_notifiche = db.models.NOTIFICHE;
const Op = db.Sequelize.Op;

// Create and Save a new notifica
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a notifica
    const notifiche = {
        ID_fornitore: req.body.ID_fornitore,
        ID_utente: req.body.ID_utente,
        ID_prenotazione: req.body.ID_prenotazione,
        Descrizione_notifica: req.body.Descrizione_notifica,
    };

    // Save notifica in the database
    tab_notifiche
        .create(notifiche)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the notifiche.",
            });
        });
};

// Retrieve all notifiche from the database.
exports.findAllFornitore = (req, res) => {
    const id = req.params.id_fornitore
    var condition = id ? { ID_fornitore: { [Op.like]: `%${id}%` } } : null;
    tab_notifiche
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving notifiche.",
            });
        });
};

exports.findAllCliente = (req, res) => {
    const id = req.params.id_cliente
    var condition = id ? { ID_utente: { [Op.like]: `%${id}%` } } : null;
    tab_notifiche
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving notifiche.",
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    tab_notifiche
        .findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find notifiche with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving notifiche with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    tab_notifiche
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Notifica was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update notifica with id=${id}. Maybe notifica was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating notifica with id=" + id,
            });
        });
};

// Delete a notifica with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    tab_notifiche
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Notifica was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete notifica with id=${id}. Maybe tab_notifiche was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete notifica with id=" + id,
            });
        });
};

// Delete all notifiche from the database.
exports.deleteAll = (req, res) => {
    tab_notifiche
        .destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({
                message: `${nums} notifiche were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all notifiche.",
            });
        });
};
