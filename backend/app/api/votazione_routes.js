const config = require("../../config/config.js");

module.exports = app => {
    const Votazioni = require("../controllers/Votazioni_controller.js");
    var router = config.express.Router();
    
    // Create a new Fornitore
    router.post("/", Votazioni.create);
  
     //Retrieve a single User by id
    router.get("/findAll_utente/:id", Votazioni.findAll_utente);
    router.get("/findAll_fornitore/:id", Votazioni.findAll_fornitore);

    router.get("/get_media_fornitore/:id", Votazioni.get_media_fornitore);

    // Update a User with id
    router.put("/cambia_voto/:id", Votazioni.update);

    app.use('/Votazioni/api',router);
   };