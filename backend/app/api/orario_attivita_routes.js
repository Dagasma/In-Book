const config = require("../../config/config.js");

module.exports = app => {
    const OrarioAttivita = require("../controllers/OrarioAttivita_controller.js");
    var router = config.express.Router();
    
    // Create a new Fornitore
    router.post("/", OrarioAttivita.create);
  
     //Retrieve a single User by id
    router.get("/Orario_fornitore/:ID_fornitore", OrarioAttivita.findAll);
  
    // Update a User with id
    router.put("/cambia_ora/:id", OrarioAttivita.update);
    router.delete("/delete_orario/:id_orario", OrarioAttivita.delete_orario);

    app.use('/OrarioAttivita/api',router);
   };