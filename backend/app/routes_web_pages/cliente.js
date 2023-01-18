const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.sendFile(config.frontend_path+"/index.html");
});

router.get("/profilo", function (request, response) {
  //response che invia anche l'id dell'utente
  response.sendFile(config.frontend_path+"html/cliente/profilo.html");
});
router.get("/ricerca_fornitori_per_servizio", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/ricerca.html");
});
router.get("/ricerca_fornitori", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/ricerca.html");
});
router.get("/visualizza_profilo_fornitore", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/cliente.html");
});
router.get("/visualizza_prenotazioni", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/visualizza_prenotazioni.html");
});
router.get("/visualizza_notifiche", function (request, response) {
  response.sendFile(config.frontend_path+"html/cliente/notifiche.html");
});


module.exports = router;

