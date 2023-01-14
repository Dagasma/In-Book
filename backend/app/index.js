const config = require("../config/config");
const db = require("./models");
const cliente = require("./routes_web_pages/cliente");
const fornitore = require("./routes_web_pages/fornitore");
const amministratore = require("./routes_web_pages/amministratore");

const app = config.express();

app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());
app.use(
    config.session({
        secret: "ad5jmaHyrx8amCnPLfQ1VcFvXfZTWGIu",
        resave: false,
        saveUninitialized: true,
        store: config.memoryStore,
    })
);

app.use(config.keycloak.middleware()); //commentato per testare api

(async () => {
    await config.kcAdminClient.auth({
        username: "admin",
        password: "dagasma10@",
        grantType: "password",
        clientId: "admin-cli",
    });
    config.kcAdminClient.setConfig({ realmName: "inbook" });
})().catch((err) => {
    console.log(err.message);
});
async function ClienteToFornitore(token_sub) {
    const user = await config.kcAdminClient.users.findOne({ id: token_sub });
    const drm = await config.kcAdminClient.roles.findOneByName({name:"default-roles-master"})
    var payload = [drm.id];
    if (user.attributes.tipo[0] == "Cliente") {
      const cliente = await config.kcAdminClient.roles.findOneByName({name:"Cliente"});
      payload.push(cliente.id);
    } else if (user.attributes.tipo[0] == "Fornitore") {
      const fornitore = await config.kcAdminClient.roles.findOneByName({name:"Fornitore"});
      payload.push(fornitore.id);
    } else if (user.attributes.tipo[0] == "Amministratore") {
      const amministratore = await config.kcAdminClient.roles.findOneByName({name:"Amministratore"});
      payload.push(amministratore.id);
    }
    console.log(payload)
    await config.kcAdminClient.users.addRealmRoleMappings({id:token_sub,roles:payload}).catch((err) => {
      console.log(err.message)
    })
    console.log(
        await config.kcAdminClient.users.listRealmRoleMappings({
            id: token_sub,
        })
    );
}

//console.log(config.keycloak.getConfig());

app.use(config.express.static(config.frontend_path)); //per rilevare tutti i file statici nel frontend

var sql_views = config.fs.readFileSync(config.db_path + "views.sql", "utf8");
//connessione al db con sequelize per facilitare operazioni CRUD
db.sequelize
    .sync()
    .then(() => {
        console.log("Database connected successfully");
        db.sequelize.query(sql_views);
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use("/cliente", config.keycloak.protect("realm:cliente"), cliente);
app.use("/fornitore", config.keycloak.protect("realm:fornitore"), fornitore);
app.use(
    "/amministratore",
    config.keycloak.protect("realm:amministratore"),
    amministratore
);

require("./api/cliente_routes")(app);
require("./api/prenotazioni_routes")(app);
app.get("/test", config.keycloak.protect(), function (request, response) {
    ClienteToFornitore(request.kauth.grant.access_token.content.sub).catch(
        (err) => {
            console.log(err.message);
        }
    );
});

app.listen(config.PORT, () => {
    console.log("[BACKEND] Start listening on port:" + config.PORT);
});
