const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const fornitori = require("../controllers/Fornitori_controller.js");
    var router = config.express.Router();
    
    // Create a new Fornitore
    router.post("/", config.keycloak.protect("realm:fornitore"),fornitori.create);
  
    //Cliente vede solo una parte del fornitore
    router.get("/cliente_get_profilo_fornitore/:id", config.keycloak.protect("realm:cliente"), fornitori.findFornitorebyCliente);

     //Retrieve a single User by id
    router.get("/get_profilo/:id",config.keycloak.protect("realm:fornitore"), middleware_check.check_id_param,fornitori.findOne);
  
    // Update a User with id
    router.put("/aggiorna_profilo/:id", config.keycloak.protect("realm:fornitore"), middleware_check.check_id_param,fornitori.update);

    app.use('/fornitori/api',router);
   };