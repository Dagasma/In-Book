const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const prenotazioni = require("../controllers/Prenotazioni_controller.js");
    var router = config.express.Router();
    
    //se richiesta che arriva ha req.kauth.grant.access_token.content.sub uguale a l'id che sto cercando allora puoi fare la ricerca

    // Create a new Prenotazione
    router.post("/effettua_prenotazione", config.keycloak.protect("realm:cliente"), middleware_check.check_id_body('ID_utente'), prenotazioni.effettua_prenotazione);

    //retrieve prenotazioni by cliente
    router.get("/get_prenotazioni_utente/:ID_utente", config.keycloak.protect("realm:cliente"), middleware_check.check_id_param('ID_utente'), prenotazioni.get_prenotazioni_utente);
    //retrieve prenotazioni by fornitore
    router.get("/get_prenotazioni_fornitore/:ID_fornitore", config.keycloak.protect("realm:fornitore"), middleware_check.check_id_param('ID_fornitore'),prenotazioni.get_prenotazioni_fornitore);

    //get slot liberi
    router.get("/get_slot_liberi",config.keycloak.protect("realm:cliente"),prenotazioni.get_slot_liberi);

    router.get("/prenotazioni_filtrate_merge_fornitore/:ID_fornitore",config.keycloak.protect("realm:fornitore"), middleware_check.check_id_param('ID_fornitore'), prenotazioni.prenotazioni_filtrate_fornitore);
    
    router.get("/prenotazioni_filtrate_merge_utente/:ID_utente",config.keycloak.protect("realm:cliente"), middleware_check.check_id_param('ID_utente'),prenotazioni.prenotazioni_filtrate_utente);

    //DA RIVEDERE CHI PUO FARE COSA; altro problema -> UN UTENTE DIFFERENTE POTREBBE FARE ANNULLA PRENOTAZIONE SE SFRUTTO SOLO id_prenotazione
    //aggiorna stato prenotazione (o aggiorna prenotazione in generale) 
    router.put("/annulla_prenotazione/:id_prenotazione", config.keycloak.protect(), prenotazioni.annulla_prenotazione);

    //elimina prenotazione
    router.delete("/delete_prenotazione/:id_prenotazione", config.keycloak.protect(), prenotazioni.delete_prenotazione);
  

    app.use('/prenotazioni/api',router);
   };