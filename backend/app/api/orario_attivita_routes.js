const config = require("../../config/config.js");

module.exports = app => {
    const middleware_check = require("../middleware_check");
    const OrarioAttivita = require("../controllers/OrarioAttivita_controller.js");
    var router = config.express.Router();
    

    //Creazione dell'orario
    router.post("/",config.keycloak.protect("realm:Fornitore"),middleware_check.check_id_body("ID_fornitore"), OrarioAttivita.create);
  

    //Lista orari del fornitore
    router.get("/Orario_fornitore/:ID_fornitore", OrarioAttivita.findAll);

    //Delete (NEL BODY PASSO ANCHE ID_FORNITORE)
    router.delete("/delete_orario/:id_orario",config.keycloak.protect("realm:Fornitore"),middleware_check.check_id_body("ID_fornitore"), OrarioAttivita.delete_orario);

    app.use('/OrarioAttivita/api',router);
   };