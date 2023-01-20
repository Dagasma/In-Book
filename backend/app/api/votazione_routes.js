const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const Votazioni = require("../controllers/Votazioni_controller.js");
    var router = config.express.Router();
    
    // Create a new Votazione
    router.post("/",config.keycloak.protect("realm:cliente"),middleware_check.check_id_body("ID_utente"),Votazioni.create);
  
    router.get("/findAll_utente/:id", Votazioni.findAll_utente);
    router.get("/findAll_fornitore/:id", Votazioni.findAll_fornitore);

    router.get("/get_media_fornitore/:id", Votazioni.get_media_fornitore);
    router.get("/get_voto/:id_utente/:id_fornitore", Votazioni.get_voto);

    router.put("/cambia_voto/:id/:ID_utente",config.keycloak.protect("realm:cliente"), middleware_check.check_id_param("ID_utente"), Votazioni.update);

    app.use('/Votazioni/api', config.keycloak.protect(),router);
   };