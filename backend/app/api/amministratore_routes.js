const config = require("../../config/config.js");


module.exports = app => {
    const users = require("../controllers/Utente_controller");
    var router = config.express.Router();
    
  
    router.get("/get_utenti/",users.findAll);
  
    router.put("/gestisci_utente/:id",users.update); //nel body metti "Bloccato" : true/false
 
    app.use('/amministratore/api', config.keycloak.protect("realm:amministratore"), router);
   };