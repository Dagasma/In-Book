const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
    response.sendFile(config.frontend_path+"/index.html");
});

router.get("/login", config.keycloak.protect(), async function (request, response) {
    var roles = request.kauth.grant.access_token.content.realm_access.roles;
    var lista_roles = ['fornitore','cliente','amministratore'];
    var role = "";
    roles.forEach((element) => 
        {
            if(lista_roles.includes(element)){ 
                role = element;
            }
        });
    if(role == ""){
        response.redirect("/"); //come minchia si cancellano i cookie? perchè l'utente appena registrato deve aspettare un po' prima di entrare (si deve cancellare l'access token)
    } 
    else{
        response.redirect("/"+role);
    }
});

module.exports = router;

