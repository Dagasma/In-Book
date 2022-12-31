const db = require("../models");
const utenti_visitatori = db.models.UTENTI_VISITATORI;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        Nome: req.body.Nome,
        Cognome: req.body.Cognome,
        Email: req.body.Email,
        Password_acc: req.body.Password_acc,
        Data_di_nascita: req.body.Data_di_nascita,
        Telefono: req.body.Telefono,
        Tipo: req.body.Tipo
    };

    // Save User in the database
    utenti_visitatori.create(user)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
