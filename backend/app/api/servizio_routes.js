const config = require("../../config/config.js");

module.exports = app => {
    const servizi = require("../controllers/Servizi_controller.js");
    var router = config.express.Router();
    
    // Retrive all servizi from a id_fornitore
    router.get("get_servizi_per_fornitore:id_fornitore",servizi.get_servizi_per_fornitore)

    // Create a new servizio
    router.post("/crea_servizio",config.keycloak.protect('realm:fornitore'), servizi.crea_servizio);
  
    // Update servizio
    router.put("/aggiorna_servizio",config.keycloak.protect('realm:fornitore'),servizi.aggiorna_servizio)

    // Delete servizio based on id_servizio
    router.delete("/delete_servizio:id_servizio",config.keycloak.protect('realm:fornitore'),servizi.delete_servizio)

    // Delete all servizi created by an id_fornitore
    router.delete("/delete_all_servizi:id_fornitore",config.keycloak.protect('realm:fornitore'),servizi.delete_all_servizi)

    app.use('/servizi/api', config.keycloak.protect(),router);
   };