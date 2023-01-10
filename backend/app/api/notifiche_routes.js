const config = require("../../config/config.js");

module.exports = app => {
    const notifiche = require("../controllers/Notifiche_controller.js");
    var router = config.express.Router();

    // Get notifiche per fornitore based on parameter id_fornitore
    router.get("/get_notifiche_per_fornitore:id_fornitore",config.keycloak.protect('realm:cliente'),notifiche.findAllCliente)

    // Get notifiche per cliente based on parameter id_cliente
    router.get("/get_notifiche_per_cliente:id_cliente",config.keycloak.protect('realm:fornitore'),notifiche.findAllFornitore)
    
    app.use('/notifiche/api', config.keycloak.protect(),router);
   };