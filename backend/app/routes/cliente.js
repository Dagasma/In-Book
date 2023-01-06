const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.sendFile(config.frontend_path+"cliente.html");
});

module.exports = router;