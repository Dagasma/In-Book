const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/home.html");
});

router.get("/profilo", function (request, response) {
  //response che invia anche l'id dell'utente
  response.sendFile(config.frontend_path+"html/cliente/profilo.html");
});
router.get("/cerca", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/cerca.html");
});
router.get("/notifiche", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/notifiche.html");
});
router.get("/visualizza_fornitore", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/visualizza_fornitore.html");
});
router.get("/visualizza_prenotazioni", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/visualizza_prenotazioni.html");
});

module.exports = router;

