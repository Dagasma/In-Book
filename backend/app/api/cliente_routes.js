const config = require("../../config/config.js");


module.exports = app => {
    const middleware_check = require("../middleware_check");
    const users = require("../controllers/Utente_controller");
    var router = config.express.Router();
    
    // Create a new User
    router.post("/", users.create);
  
     //Retrieve a single User by id
    router.get("/get_profilo/:id", middleware_check.check_id_param("id"),users.findOne);
  
    // Update a User with id
    router.put("/aggiorna_profilo/:id", middleware_check.check_id_param("id"),users.update);

    app.use('/cliente/api', config.keycloak.protect("realm:cliente"), router);
   };