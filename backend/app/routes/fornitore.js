const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.sendFile(config.frontend_path+"fornitore.html");
});

module.exports = router;