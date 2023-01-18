const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const notifiche = require("../controllers/Notifiche_controller.js");
    var router = config.express.Router();

    // Get notifiche per fornitore based on parameter id_fornitore, DA TESTARE DA WEB perche mi da l'access token
    router.get("/get_notifiche_per_fornitore/:id_fornitore",config.keycloak.protect('realm:fornitore'), middleware_check.check_id_param("id_fornitore"),notifiche.findAllFornitore)

    // Get notifiche per cliente based on parameter id_cliente
    router.get("/get_notifiche_per_cliente/:id_cliente",config.keycloak.protect('realm:cliente'),middleware_check.check_id_param("id_cliente"),notifiche.findAllCliente)
    
    app.use('/notifiche/api',router);
   };