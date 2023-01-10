const db = require("../models");
const SERVIZI = require("../models/SERVIZI");
const tab_prenotazioni = db.models.PRENOTAZIONI; //da testare
const Op = db.Sequelize.Op;

function calcolo_slot_liberi(prenotazioni_presenti,Data_giorno, ID_servizio){
  var output = {};

  const data_target = new Date(Data_giorno);

  const giorni = ['Lunedi','Martedi','Mercoledi','Giovedi','Venerdi','Sabato','Domenica'];
  var dt = new Date(prenotazioni_presenti.Data_giorno);
  const giorno_scelto = giorni[dt.getDay()];

  console.log(giorno_scelto, data_target)

  const capienza = db.sequelize.query('SELECT Capienza FROM FORNITORI WHERE ID_fornitore = ?',
  {
    replacements: [ prenotazioni_presenti.ID_fornitore],
    type: db.sequelize.QueryTypes.SELECT
  }
  );

  var query_buggata = ['SELECT *',
                        'FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore',
                        'WHERE ? >= TIME(p.Orario_prenotazione_inizio) AND ? <= TIME(p.Orario_prenotazione_fine)',
                        'AND Date(p.Orario_prenotazione_inizio) = ? and o.giorno_della_settimana = ? and p.Stato = \'Attivo\';',]

  const slot_occupati = db.sequelize.query(query_buggata, {replacements: [Data_giorno,giorno_scelto]})                      

  //Per ogni slot di ORARI_ATTIVITA del fornitore nel giorno della settimana scelto per la prenotazione, 
    //creo un vettore A che rappresenta gli slot temporali del servizio scelto interno al range dello slot di ORARIO ATTIVITA
    // es range slot ORARI_ATTIVITA("9:00,12:00","14:00,18:00"), A = ["9,9:30", "9:30,10" ecc] con durata servizio = 00:30
    //(la durata di ogni slot è fissata tramite il servizio scelto)
    //per ogni slot temporale del servizio K in A
      //verifico se esistono una o piu prenotazioni attive nello slot temporale corrente K (tali da saturare la capacità) -> valuto la somma(Numero_clienti)
      //Se capacita_attivita - somma(num_clienti) - num_clienti_richiesti > 0
        //aggiungi a insieme di slot temporali utilizzabili

  //in uscita ho un insieme di slot temporali usabili per il giorno della settimana scelto
  
  //se ad esempio ho prenotazioni "9.00:9.15" (tali da saturare capacita) e provo ad inserirmi tra le "9.00,9:30" non posso


  //Per ogni slot di ORARI_ATTIVITA del fornitore nel giorno della settimana scelto per la prenotazione, 
    //creo un vettore A che rappresenta gli slot temporali del servizio scelto interno al range dello slot di ORARIO ATTIVITA
    // es range slot ORARI_ATTIVITA("9:00,12:00","14:00,18:00"), A = ["9,9:15", "9:15,9:30",""9:30,9;45" ecc] con durata servizio = durata_servizio_minimo_fornitore
    //per ogni K slot temporale del servizio in A
      //verifico se esistono una o piu prenotazioni attive nello slot temporale corrente K (tali da saturare la capacità) -> valuto la somma(Numero_clienti)
      //Se capacita_attivita - somma(num_clienti) - num_clienti_richiesti > 0
        //aggiungi a insieme di slot temporali utilizzabili

  //in uscita ho un insieme di slot temporali usabili della durata minima per il giorno della settimana scelto
  //effettuo un check per vedere se esistono slot contigui in modo da averli pari alla durata del servizio richiesto
  
  //se ad esempio ho prenotazioni "9.00:9.15" (tali da saturare capacita) e provo ad inserirmi tra le "9.00,9:30" non posso

  for(let slot in slot_occupati){
    




  } 







  return output
}


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
        Orario_prenotazione_inizio: req.body.Orario_prenotazione_inzio,
        Orario_prenotazione_fine: req.body.Orario_prenotazione_fine,
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
    if( "ID_utente" in req.query){  //se nella ricerca ho ID_utente
      id = req.query.ID_utente;
      
      condition = id ? { ID_utente: { [Op.like]: `%${id}%` } } : null;
      console.log(condition)

      tab_prenotazioni.findAll({ 
        where: condition,
        order: [['Orario_prenotazione_inizio', 'ASC']]
      }
        )
        .then(data => {
            res.send(data);
        })
        .catch(err => { 
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prenotazioni."
            });
        });

    }

    else{   //se nella ricerca ho ID_fornitore restituisco prenotazioni+clienti associati
      id = req.query.ID_fornitore;
      db.sequelize.query('SELECT * FROM VISTA_PRENOTAZIONI_CLIENTI_PER_FORNITORE WHERE ID_fornitore = ? ORDER BY ? ?',
      {
        replacements: [ id,'Orario_prenotazione_inizio', 'ASC'],
        type: db.sequelize.QueryTypes.SELECT
      }
      ).then(data => {
        res.send(data);
      })
      .catch(err => { 
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving Prenotazioni."
          });
      });
    }

};

// Retrieve all slot_liberi from the database by id fornitore  
exports.get_slot_liberi = (req, res) => {
  const ID_fornitore = req.query.ID_fornitore;    
  var condition = ID_fornitore ? { ID_fornitore: { [Op.like]: `%${ID_fornitore}%` } } : null;
  
  var filtro = {
    Stato : 'Attivo',
    Data_giorno: req.body.Data_giorno,
    ID_servizio: req.body.ID_servizio
  }
  
  //var condition_time = db.sequelize.fn('date', sequelize.col('Orario_prenotazione_inizio'), Op.like, filtro.Data_giorno);
  var dati_buoni = calcolo_slot_liberi(data, filtro.Data_giorno, ID_servizio);
  res.send(dati_buoni);


  // lista_tab_prenotazioni.findAll({ 
  //     include:[{
  //       model: SERVIZI,
  //       required: true
  //     }],
  //     where: {
  //         condition, 
  //         Stato : filtro.Stato,
  //         condition_time,
  //         order: [['Orario_prenotazione', 'ASC']]
  //       } })
  //     .then(data => {
  //         var dati_buoni = calcolo_slot_liberi(data, filtro.Data_giorno, ID_servizio);
  //         res.send(dati_buoni);
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message:
  //                 err.message || "Some error occurred while retrieving Prenotazioni."
  //         });
  //     });
  
};

exports.annulla_prenotazione = (req, res) => {
    const id = req.params.id;

    //bisogna mettere che si usa solo lo stato nel body

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
