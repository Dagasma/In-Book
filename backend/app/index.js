const config = require("../config/config");
const db = require("./models");
const cliente = require("./routes_web_pages/cliente")
const fornitore = require("./routes_web_pages/fornitore")
const amministratore = require("./routes_web_pages/amministratore")

const app = config.express();


app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());
app.use(config.session({
  secret: 'ad5jmaHyrx8amCnPLfQ1VcFvXfZTWGIu',
  resave: false,
  saveUninitialized: true,
  store: config.memoryStore
}));

app.use(config.keycloak.middleware()); //commentato per testare api



(async () => {
  await config.kcAdminClient.auth({
  username: 'admin',
  password: 'dagasma10@',
  grantType: 'password',
  clientId: 'admin-cli'
  });
  const users = await config.kcAdminClient.users.find();
  console.log(users);
}) ();



//console.log(config.keycloak.getConfig());

app.use(config.express.static(config.frontend_path)); //per rilevare tutti i file statici nel frontend


var sql_views = config.fs.readFileSync(config.db_path + 'views.sql', 'utf8');
//connessione al db con sequelize per facilitare operazioni CRUD
db.sequelize.sync()
  .then(() => {
    console.log("Database connected successfully");
    db.sequelize.query(sql_views);
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



app.use("/cliente",cliente)
app.use("/fornitore",config.keycloak.protect('realm:fornitore'),fornitore)
app.use("/amministratore",config.keycloak.protect('realm:amministratore'),amministratore)

require("./api/cliente_routes")(app);
require("./api/prenotazioni_routes")(app);

app.listen(config.PORT, () => {
  console.log("[BACKEND] Start listening on port:" + config.PORT);
});
