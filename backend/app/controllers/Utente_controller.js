const db = require("../models");
const tab_utenti = db.models.UTENTI;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a user
    const utente = {
        Data_di_nascita: req.body.Data_di_nascita,
        Telefono: req.body.Telefono,
        Tipo: req.body.Tipo,
    };

    // Save user in the database
    tab_utenti
        .create(utente)
        .then((data2) => {
            res.send(data2);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the user.",
            });
        });
};

// Retrieve all users
exports.findAll = (req, res) => {
    const Tipo = req.query.Tipo;
    var condition = Tipo ? { Tipo: { [Op.like]: `%${Tipo}%` } } : null;

    tab_utenti
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

    tab_utenti
        .findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    tab_utenti
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating user with id=" + id,
            });
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    tab_utenti
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete user with id=" + id,
            });
        });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    tab_utenti
        .destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} users were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all users.",
            });
        });
};
