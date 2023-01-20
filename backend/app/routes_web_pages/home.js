const config = require("../../config/config");
const router = config.express.Router();

router.get("/", function (request, response) {
    response.sendFile(config.frontend_path+"/index.html");
});

router.get("/login", config.keycloak.protect(), function (request, response) {
    var roles = request.kauth.grant.access_token.content.realm_access.roles;
    var lista_roles = ['fornitore','cliente','amministratore'];
    var role = "";
    roles.forEach((element) => 
        {
            if(lista_roles.includes(element)){ 
                role = element;
            }
        });
    console.log("ciao");
    if(role == ""){
        response.redirect("/logout"); 
    } 
    else{
        response.redirect("/"+role);
    }
});

module.exports = router;

