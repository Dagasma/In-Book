const config = require("../config/config");
const cliente = require("./routes_web_pages/cliente");
const fornitore = require("./routes_web_pages/fornitore");
const amministratore = require("./routes_web_pages/amministratore");
const home = require("./routes_web_pages/home");
const app = config.express();
const middleware_custom = require("./middleware_custom");
const middleware_check = require("./middleware_check");
const db = require("./models");


app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());
app.use(config.express.static(config.frontend_path)); //per rilevare tutti i file statici nel frontend

app.use(config.cookieParser(config.SECRET));
app.use(config.session({maxAge: Date.now() + (3600 * 1000),secret: config.SECRET}));

app.use(config.expressWinston.logger({
    transports: [
      new config.winston.transports.Console(),
      new config.winston.transports.File({
        filename: 'combined.log',
      }),
      new config.winston.transports.File({
        filename: 'app-error.log',
        level: 'error',
        format: config.winston.format.combine( config.winston.format.timestamp(), config.winston.format.json()),
      }),
      new config.winston.transports.File({
        filename: 'app-info.log',
        level: 'info',
        format: config.winston.format.combine(config.winston.format.timestamp(), config.winston.format.json()),
      }),
      new config.winston.transports.File({
        filename: 'app-warn.log',
        level: 'warn',
        format: config.winston.format.combine(config.winston.format.timestamp(), config.winston.format.json()),
      })
    ],
    meta: true, 
    msg: "HTTPS {{req.method}} {{req.url}}  {{res.statusCode}} ", 
    expressFormat: true, 
    colorize: false, 
    ignoreRoute: function (req, res) { return false; },
    headerBlacklist: [] 
  }));


app.use(config.keycloak.middleware()); 

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


app.use("/",home);
app.use("/cliente", config.keycloak.protect("realm:cliente"), middleware_check.send_cookie,cliente);
app.use("/fornitore", config.keycloak.protect("realm:fornitore"),middleware_check.send_cookie, fornitore);
app.use("/amministratore",config.keycloak.protect("realm:amministratore"), middleware_check.send_cookie,amministratore);



require("./api/cliente_routes")(app);
require("./api/fornitore_routes")(app);
require("./api/notifiche_routes")(app);
require("./api/orario_attivita_routes")(app);
require("./api/prenotazioni_routes")(app);
require("./api/servizio_routes")(app);
require("./api/votazione_routes")(app);
require("./api/amministratore_routes")(app);

app.listen(config.PORT, () => {
    console.log("[BACKEND] Start listening on port:" + config.PORT);
});
