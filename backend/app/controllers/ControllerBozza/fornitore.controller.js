exports.createfornitore = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a fornitore
    const fornitore = {
        ID_utente_fornitore : req.body.Id,
        Nome_Attivita  : req.body.Nome_Attivita ,
        Tipo_Attivita  : req.body.Tipo_Attivita ,
        Indirizzo  : req.body.Indirizzo,
        Capienza_massima: req.body.Capienza_massima ,
        published: req.body.published ? req.body.published : false
    };
  
    // Save fornitore in the database
    Fornitore.create(fornitore)
      .then(data => {   res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the fornitore."
        });
      });
  };

  exports.updateUtente = (req, res) => {
    const id = req.params.id;
  
    Fornitore.update(req.body, {  where: { id: id }
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