const { request } = require("express");
const config = require("../config/config");

async function Assign_Roles_to_users(token_sub) {
  await config.kcAdminClient.auth(config.credentials);

  const roles = await config.kcAdminClient.users.listRealmRoleMappings({
    id: token_sub,
  });
  var lista_roles = ["fornitore", "cliente"];

  roles.forEach((element) => {
    if (lista_roles.includes(element.name)) {
      return false;
    }
  });

  const user = await config.kcAdminClient.users.findOne({ id: token_sub });
  const drm = await config.kcAdminClient.roles.findOneByName({
    name: "default-roles-master",
  });
  var payload = [{ id: drm.id, name: drm.name }];
  if (user.attributes.tipo[0] == "Cliente") {
    const cliente = await config.kcAdminClient.roles.findOneByName({
      name: "Cliente",
    });
    payload.push({ id: cliente.id, name: "cliente" });
    await config.kcAdminClient.users
    .addRealmRoleMappings({ id: token_sub, roles: payload })
    .catch((err) => {
      console.log(err.message);
    });
  } else if (user.attributes.tipo[0] == "Fornitore") {
    const fornitore = await config.kcAdminClient.roles.findOneByName({
      name: "Fornitore",
    });
    payload.push({ id: fornitore.id, name: "fornitore" });
    await config.kcAdminClient.users
    .addRealmRoleMappings({ id: token_sub, roles: payload })
    .catch((err) => {
      console.log(err.message);
    });
  }
  

  return true;
}

async function Update_user(enable_body, id_user) {
  await config.kcAdminClient.auth(config.credentials);
  var payload = { enabled: enable_body };

  const user = await config.kcAdminClient.users.update(
    { id: id_user, realm: "inbook" },
    payload
  );

  return true;
}

delete config.keycloak["authenticated"];

config.keycloak.authenticated = function (req) {
  Assign_Roles_to_users(req.kauth.grant.access_token.content.sub);
};

delete config.keycloak["accessDenied"];
config.keycloak.accessDenied = function (req, res) {
  console.log(Date.now()," TENTATIVO DI ACCESSO A RISORSA NON AUTORIZZATA ID USER: ", req.kauth.grant.access_token.content.sub);
  res.redirect("/?Accesso_non_consentito_rieffettua_login");
};

module.exports = config.keycloak;

module.exports.Assign_Roles_to_users = Assign_Roles_to_users;
module.exports.Update_user = Update_user;
