const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const OrarioAttivita = require("../controllers/OrarioAttivita_controller.js");
    var router = config.express.Router();
    

    //Creazione dell'orario
    router.post("/", OrarioAttivita.create);
  
    //Lista orari del fornitore
    router.get("/Orario_fornitore/:ID_fornitore", config.keycloak.protect("realm:fornitore"), OrarioAttivita.findAll);

    //Delete (NEL BODY PASSO ANCHE ID_FORNITORE)
    router.delete("/delete_orario/:id_orario/:ID_fornitore", config.keycloak.protect("realm:fornitore"), OrarioAttivita.delete_orario);

    app.use('/OrarioAttivita/api',router);
   };