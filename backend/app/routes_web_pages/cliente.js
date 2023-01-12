const config = require("../../config/config");
const router = config.express.Router();

router.get("/profilo", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});
router.get("/ricerca_fornitori_per_servizio", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});
router.get("/ricerca_fornitori", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});
router.get("/visualizza_profilo_fornitore", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});
router.get("/visualizza_prenotazioni", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});
router.get("/visualizza_notifiche", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});

module.exports = router;

