const config = require("../config/config");
const db = require("./models");
const login = require("./login");
// const register = require("./register");

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

console.log(config.keycloak.getConfig());

app.use(config.express.static(config.frontend_path)); //per rilevare i file css

//connessione al db con sequelize per facilitare operazioni CRUD
db.sequelize.sync()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/test", login);
// app.use("/api/register", register);

require("./api/user_routes")(app);


app.listen(config.PORT, () => {
  console.log("[BACKEND] Start listening on port:" + config.PORT);
});
