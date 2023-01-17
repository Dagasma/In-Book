const config = require("../config/config");

async function Assign_Roles_to_users(token_sub) {
        await config.kcAdminClient.auth(config.credentials);        //401

        const roles = await config.kcAdminClient.users.listRealmRoleMappings({id: token_sub}); //403
        var lista_roles = ['fornitore','cliente','amministratore'];

        roles.forEach((element) => 
        {
            if(lista_roles.includes(element.name)){ 
                return;
            }
        });


        const user = await config.kcAdminClient.users.findOne({ id: token_sub });
        const drm = await config.kcAdminClient.roles.findOneByName({name:"default-roles-master"})
        var payload = [{id: drm.id, name: drm.name}];
        if (user.attributes.tipo[0] == "Cliente") {
            const cliente = await config.kcAdminClient.roles.findOneByName({name:"Cliente"});
            payload.push({id:cliente.id, name: "cliente"});
        } else if (user.attributes.tipo[0] == "Fornitore") {
            const fornitore = await config.kcAdminClient.roles.findOneByName({name:"Fornitore"});
            payload.push({id:fornitore.id, name: "fornitore"});
        } else if (user.attributes.tipo[0] == "Amministratore") {
            const amministratore = await config.kcAdminClient.roles.findOneByName({name:"Amministratore"});
            payload.push({id:amministratore.id, name: "amministratore"});
        }
        await config.kcAdminClient.users.addRealmRoleMappings({id:token_sub,roles:payload}).catch((err) => {
            console.log(err.message)
        })

}

delete config.keycloak['authenticated'];
 
config.keycloak.authenticated = function(req){
    Assign_Roles_to_users(req.kauth.grant.access_token.content.sub);
}
 
module.exports = config.keycloak;

module.exports.Assign_Roles_to_users = Assign_Roles_to_users;
