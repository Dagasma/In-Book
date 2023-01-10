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
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

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

    tab_votazioni
        .update(req.body, {
            where: { id: id },
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
