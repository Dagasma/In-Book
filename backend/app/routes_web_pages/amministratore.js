const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  response.cookie("id",request.kauth.grant.access_token.content.sub);
  response.sendFile(config.frontend_path+"amministratore.html");
});

module.exports = router;