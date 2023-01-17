const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const OrarioAttivita = require("../controllers/OrarioAttivita_controller.js");
    var router = config.express.Router();
    
    // Create a new Fornitore
    router.post("/",middleware_check.check_id_body, OrarioAttivita.create);
  
     //Retrieve a single User by id
    router.get("/Orario_fornitore/:ID_fornitore",middleware_check.check_id_param, OrarioAttivita.findAll);
  
    // Update a User with id
    router.put("/cambia_ora/:id",middleware_check.check_id_param, OrarioAttivita.update);

    app.use('/OrarioAttivita/api', config.keycloak.protect("realm:Fornitore"),router);
   };