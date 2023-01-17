const db = require("../models"); //DA TESTARE
const tab_servizi = db.models.SERVIZI;
const Op = db.Sequelize.Op;

// Create and Save a new Servizio
exports.crea_servizio = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Servizio
    const servizi = {
        ID_fornitore: req.kauth.grant.access_token.content.sub,
        Tipologia: req.body.Tipologia,
        Descrizione: req.body.Descrizione,
        Durata: req.body.Durata,
    };

    // Save Servizio in the database
    tab_servizi
        .create(servizi)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Servizio.",
            });
        });
};

// Retrieve all Servizi
exports.get_servizi_per_fornitore = (req, res) => {
    const id_fornitore = req.query.id_fornitore;
    var condition = id_fornitore
        ? { ID_fornitore: { [Op.like]: `%${id_fornitore}%` } }
        : null;

    tab_servizi
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Servizi.",
            });
        });
};

// Retrieve all Servizi
exports.get_servizio = (req, res) => {
    const id_servizio = req.params.id_servizio;
    console.log(req.query)
    var condition = id_servizio    ? { ID: { [Op.like]: `%${id_servizio}%` } }       : null;

    tab_servizi
        .findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Servizi.",
            });
        });
};

//aggiorna servizio by id
exports.aggiorna_servizio = (req, res) => {
    const id = req.params.id;

    tab_servizi
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "servizio was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update servizio with id=${id}. Maybe servizio was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating servizio with id=" + id,
            });
        });
};

// Delete a servizio with the specified id in the request
exports.delete_servizio = (req, res) => {
    const id = req.params.id;

    tab_servizi
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "servizio was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete servizio with id=${id}. Maybe servizio was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete servizio with id=" + id,
            });
        });
};

// Delete all servizi with that id_fornitore from the database.
exports.delete_all_servizi = (req, res) => {
    const id_fornitore = req.query.id_fornitore;
    var condition = id_fornitore
        ? { ID_fornitore: { [Op.like]: `%${id_fornitore}%` } }
        : null;
    tab_servizi
        .destroy({
            where: condition,
            truncate: false,
        })
        .then((nums) => {
            res.send({ message: `${nums} servizi were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all servizi.",
            });
        });
};

exports.get_Servizi_e_fornitori = (req, res) => {
    tab_servizi
        .findAll({
            include: [{
                model: tab_fornitori,
                as: 'ID_fornitore_FORNITORI',
                required: true
            }]
        })
        .then((data) => {
             res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving prenttab_prenotazioni.",
            });
        });
};