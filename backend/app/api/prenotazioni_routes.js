const config = require("../../config/config.js");

module.exports = app => {
    const prenotazioni = require("../controllers/Prenotazioni_controller.js");
    var router = config.express.Router();
    
    // Create a new Prenotazione
    router.post("/effettua_prenotazione",config.keycloak.protect('realm:cliente'), prenotazioni.effettua_prenotazione);

    //retrieve prenotazioni by cliente
    router.get("/get_prenotazioni",config.keycloak.protect(), prenotazioni.get_prenotazioni);
    
    router.get("/get_slot_liberi:id_fornitore",config.keycloak.protect('realm:cliente'),prenotazioni.get_slot_liberi)

    //aggiorna stato prenotazione (o aggiorna prenotazione in generale)
    router.put("/annulla_prenotazione:id_prenotazione",config.keycloak.protect(), prenotazioni.annulla_prenotazione);

    //elimina prenotazione
    router.delete("/delete_prenotazione:id_utente",config.keycloak.protect('realm:fornitore'), prenotazioni.delete);
  

    app.use('/prenotazioni/api',config.keycloak.protect(),router);
   };