const db = require("../models");
const tab_servizi = db.models.SERVIZI;
const Op = db.Sequelize.Op;

// Create and Save a new Servizio
exports.crea_servizio = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
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
    tab_servizi.create(servizi)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Servizio."
            });
        });
};

// Retrieve all Servizi
exports.get_servizi_per_fornitore = (req, res) => {
    const id_fornitore = req.query.id_fornitore;
    var condition = id_fornitore ? { id_fornitore: { [Op.like]: `%${id_fornitore}%` } } : null;

    tab_servizi.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Servizi."
            });
        });
};

//aggiorna servizio
exports.aggiorna_servizio = (req, res) => {
    const id = req.params.id;

    tab_servizi.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "servizio was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update servizio with id=${id}. Maybe servizio was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating servizio with id=" + id
            });
        });
};


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
