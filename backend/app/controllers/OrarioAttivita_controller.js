const db = require("../models");
const tab_orario = db.models.ORARI_ATTIVITA;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a User
    const orario = {
        ID_fornitore: req.body.ID_fornitore,
        Giorno_della_settimana: req.body.Giorno_della_settimana,
        Orario_apertura: req.body.Orario_apertura,
        Orario_chiusura: req.body.Orario_chiusura,
    };

    // Save User in the database
    tab_orario
        .create(orario)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the User.",
            });
        });
};

// Retrieve all hours from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    tab_orario
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    tab_orario
        .findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find hour with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving hour with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    tab_orario
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "hour was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update hour with id=${id}. Maybe hour was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating hour with id=" + id,
            });
        });
};

// Delete a hour with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    tab_orario
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "hour was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete hour with id=${id}. Maybe hour was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete hour with id=" + id,
            });
        });
};

// Delete all hours from the database.
exports.deleteAll = (req, res) => {
    tab_orario
        .destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} hours were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all tutorials.",
            });
        });
};
