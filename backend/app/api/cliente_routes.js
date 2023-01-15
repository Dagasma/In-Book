const config = require("../../config/config.js");

module.exports = app => {
    const users = require("../controllers/Utente_controller.js");
    var router = config.express.Router();
    
    // Create a new User
    router.post("/", users.create);
  
     //Retrieve a single User by id
    router.get("/get_profilo/:id", users.findOne);
  
    // Update a User with id
    router.put("/aggiorna_profilo/:id", users.update);

    app.use('/cliente/api', router);
   };