exports.createUtente = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a utente
    const utente = {
        Id : req.body.Id,
        Nome  : req.body.Nome ,
        Cognome  : req.body.Cognome ,
        Email  : req.body.Email ,
        Password_acc  : req.body.Password_acc,
        Data_di_nascita: req.body.Data_di_nascita ,
        Telefono : req.body.Telefono ,
        Tipo : req.body.Tipo ,
        published: req.body.published ? req.body.published : false
    };
  
    // Save utente in the database
    Utente.create(utente)
      .then(data => {   res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the utente."
        });
      });
  };

// il problema di modifica profilo è che non sappiamo l'id
// dalla richiesta non ci arriva l'ID
// quindi dobbiamo modificare l'DI
  exports.updateUtente = (req, res) => {
    const id = req.params.id;
  
    Utente.update(req.body, {  where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Utente was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Utente with id=${id}. Maybe Utente was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Utente with id=" + id
        });
      });
  };
