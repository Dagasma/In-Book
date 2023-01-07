const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
  console.log(request.kauth.grant.access_token.content.sub)
  response.sendFile(config.frontend_path+"cliente.html");
});

module.exports = router;