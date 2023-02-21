const config = require("../config/config");
const cliente = require("./routes_web_pages/cliente");
const fornitore = require("./routes_web_pages/fornitore");
const amministratore = require("./routes_web_pages/amministratore");
const home = require("./routes_web_pages/home");
const app = config.express();
const middleware_custom = require("./middleware_custom");
const middleware_check = require("./middleware_check");
const db = require("./models");

const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", 'text/plain');
  const status = error.status || 500;
  console.log(error.message);
  response.status(status).send("An unexpected error occured, please go back again.");
}


app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());
app.use(config.express.static(config.frontend_path)); //per rilevare tutti i file statici nel frontend

app.use(config.cookieParser(config.SECRET));
app.use(
    config.session({
        maxAge: Date.now() + (3600 * 1000),
        secret: config.SECRET
    })
);
app.use(config.keycloak.middleware()); 


// function customRequestFilter(req, propName) {
//   if(propName !== "headers") return req[propName];

//   const headers = req.headers;

//   if("cookie" in headers){
//     var show_cookie = headers.cookie.split('; ').reduce((prev, current) => {
//       const [name, ...value] = current.split('=');
//       prev[name] = value.join('=');
//       return prev;
//     }, {}).id;

//     headers.cookie = show_cookie;
//   }

//   return headers;
// }


app.use(config.expressWinston.logger({
    transports: [
      new config.winston.transports.File({
        filename: 'backend/logs/combined.log',
      }),
      new config.winston.transports.File({
        filename: 'backend/logs/app-error.log',
        level: 'error',
        format: config.winston.format.combine( config.winston.format.timestamp(), config.winston.format.json()),
      }),
      new config.winston.transports.File({
        filename: 'backend/logs/app-info.log',
        level: 'info',
        format: config.winston.format.combine(config.winston.format.timestamp(), config.winston.format.json()),
      }),
      new config.winston.transports.File({
        filename: 'backend/logs/app-warn.log',
        level: 'warn',
        format: config.winston.format.combine(config.winston.format.timestamp(), config.winston.format.json()),
      })
    ],
//    requestFilter: customRequestFilter,
    meta: true, 
    msg: "HTTPS {{req.method}} {{req.url}}  {{res.statusCode}} ", 
    expressFormat: true, 
    colorize: false, 
    ignoreRoute: function (req, res) { return false; },
    headerBlacklist: [] 
  }));




var sql_views = config.fs.readFileSync(config.db_path + "views.sql", "utf8");

 //connessione al db con sequelize per facilitare operazioni CRUD
 db.sequelize.sync().then(() => {
    console.log("Database connected successfully");
    db.sequelize.query(sql_views);
    })
    .catch((err) => {
    console.log("CIAO2",config.SECRET,config.DB_PASSWORD,config.DB_USER)
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


app.use(errorResponder);

app.listen(config.PORT, () => {
    console.log("[BACKEND] Start listening on port:" + config.PORT);
});
