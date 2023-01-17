const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const fornitori = require("../controllers/Fornitori_controller.js");
    var router = config.express.Router();
    
    // Create a new Fornitore
    router.post("/", fornitori.create);
  
     //Retrieve a single User by id
    router.get("/get_profilo/:id", fornitori.findOne);
  
    // Update a User with id
    router.put("/aggiorna_profilo/:id", fornitori.update);

    app.use('/fornitori/api', config.keycloak.protect('realm:fornitore'),router);
   };