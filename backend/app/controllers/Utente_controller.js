const db = require("../models");
const tab_utenti = db.models.UTENTI;
const tab_fornitori = db.models.FORNITORI;
const Op = db.Sequelize.Op;

// Create and Save a new utente
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a utente
    const utente = {
        Nome: req.body.Nome,
        Cognome: req.body.Cognome,
        Email: req.body.Email,
        Password_acc: req.body.Password_acc,
        Data_di_nascita: req.body.Data_di_nascita,
        Telefono: req.body.Telefono,
        Tipo: req.body.Tipo

    };

    // Save utente in the database
    var data = {};

    tab_utenti.create(utente)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the utente."
        });
        });
    
    console.log(data);
    
    if(utente.Tipo == "Fornitore"){
        const fornitore = {
            ID_utente_fornitore: data.ID,
            Nome_Attivita: req.body.Nome_Attivita,
            Tipo_Attivita: req.body.Tipo_Attivita,
            Indirizzo: req.body.Indirizzo,
            Capienza_massima: req.body.Capienza_massima,
        };

          // Save User in the database
        tab_fornitori.create(fornitore)
            .then(data2 => {
            res.send(data2);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the User."
            });
            });
      }
}


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
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
