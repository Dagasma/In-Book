const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/home.html");
});

router.get("/profilo", function (request, response) {
  //response che invia anche l'id dell'utente
  response.sendFile(config.frontend_path+"html/fornitore/profilo.html");
});
router.get("/crea_servizio", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/crea_servizio.html");
});

router.get("/modifica_servizi", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/modifica_servizi.html");
});

router.get("/notifiche", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/notifiche.html");
});
router.get("/visualizza_servizi", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/visualizza_servizi.html");
});
router.get("/visualizza_prenotazioni", function (request, response) {
  response.sendFile(config.frontend_path+"html/fornitore/visualizza_prenotazioni.html");
});


module.exports = router;