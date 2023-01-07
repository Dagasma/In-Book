const db = require("../models");
const tab_prenotazioni = db.models.PRENOTAZIONI; //da testare
const Op = db.Sequelize.Op;
// Create and Save a new Prenotazione
exports.effettua_prenotazione = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a Prenotazione
    const prenotazioni = {
        ID_utente: req.body.ID_utente,
        ID_fornitore: req.body.ID_fornitore,
        ID_servizio: req.body.ID_servizio,
        Orario_prenotazione: req.body.Orario_prenotazione,
        Stato : 'Attivo',
        Numero_clienti: req.body.Numero_clienti,
    };

    // Save Prenotazione in the database
    tab_prenotazioni.create(prenotazioni)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Prenotazione."
        });
        });
};

// Retrieve all Prenotazioni from the database by id utente o id fornitore 
exports.get_prenotazioni = (req, res) => {
    var id = null;
    var condition= null;

    if(req.query.ID_utente != null){
      id = req.query.ID_utente;
      condition = ID_utente ? { ID_utente: { [Op.like]: `%${ID_utente}%` } } : null;
    }
    else{
      id = req.query.ID_fornitore;
      condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } } : null;
    }

    tab_prenotazioni.findAll({ 
        where: condition,
        order: [[Orario_prenotazione, 'DESC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prenotazioni."
            });
        });
};

// Retrieve all slot_liberi from the database by id fornitore  
exports.get_slot_liberi = (req, res) => {
  const ID_fornitore = req.query.ID_fornitore;    
  var condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } } : null;
  
  var filtro = {
    Stato : 'Attivo',
    Data_giorno: req.body.Data_giorno
  }
  
  var condition_time = db.sequelize.fn('date', sequelize.col('Orario_prenotazione'), Op.like, filtro.Data_giorno);

  lista_tab_prenotazioni.findAll({ 
      where: {
          condition, 
          Stato : filtro.Stato,
          condition_time
        } })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving Prenotazioni."
          });
      });
  
  var lista_occupati = data;
  //completatre
    
};

exports.update = (req, res) => {
    const id = req.params.id;

    tab_prenotazioni.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prenotazioni was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prenotazioni with id=${id}. Maybe Prenotazioni was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prenotazioni with id=" + id
            });
        });
};


// Delete a tab_prenotazioni with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    tab_prenotazioni.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Prenotazioni was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Prenotazioni with id=${id}. Maybe Prenotazioni was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Prenotazioni with id=" + id
        });
      });
  };

// Delete all Prenotazioni from the database.
exports.deleteAll = (req, res) => {
    tab_prenotazioni.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Prenotazioni were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Prenotazioni."
        });
      });
  };

// Find all published Prenotazioni
exports.findAllPublished = (req, res) => {
  
};
