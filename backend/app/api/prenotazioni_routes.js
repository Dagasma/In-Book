const config = require("../../config/config.js");

module.exports = app => {
    const prenotazioni = require("../controllers/Prenotazioni_controller.js");
    var router = config.express.Router();
    
    // Create a new Prenotazione
    router.post("/effettua_prenotazione", prenotazioni.effettua_prenotazione);

    //retrieve prenotazioni by cliente
    router.get("/get_prenotazioni_utente", prenotazioni.get_prenotazioni_utente);
    //retrieve prenotazioni by cliente
    router.get("/get_prenotazioni_fornitore", prenotazioni.get_prenotazioni_fornitore);

    //get slot liberi
    router.get("/get_slot_liberi",prenotazioni.get_slot_liberi)

    router.get("/prenotazioni_filtrate_fornitore/:ID_fornitore", prenotazioni.prenotazioni_filtrate_fornitore);
    router.get("/prenotazioni_filtrate_utente/:ID_utente", prenotazioni.prenotazioni_filtrate_utente);


    //aggiorna stato prenotazione (o aggiorna prenotazione in generale)
    router.put("/annulla_prenotazione/:id_prenotazione", prenotazioni.annulla_prenotazione);

    //elimina prenotazione
    router.delete("/delete_prenotazione/:id_prenotazione", prenotazioni.delete_prenotazione);
  

    app.use('/prenotazioni/api',router);
   };