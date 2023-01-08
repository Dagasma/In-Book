module.exports = app => {
    const prenotazioni = require("../controllers/Prenotazioni_controller.js");
    
    //dev'essere aggiornata

    var router = require("express").Router();
    
    // Create a new Prenotazione
    router.post("/effettua_prenotazione", prenotazioni.effettua_prenotazione);

    //retrieve prenotazioni by cliente
    router.get("/get_prenotazioni", prenotazioni.get_prenotazioni);
    
    //retrieve prenotazioni+clienti by fornitore
    router.get("/get_prenotazioni", prenotazioni.get_prenotazioni);
    
    //aggiorna stato prenotazione (o aggiorna prenotazione in generale)
    router.put("/annulla_prenotazione:id", prenotazioni.annulla_prenotazione);

    //elimina prenotazione
    router.delete("/annulla_prenotazione:id", prenotazioni.delete);
  

    app.use('/prenotazioni/api', router);
   };