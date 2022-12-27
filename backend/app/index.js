const config = require("../config/config");
const segnalazioniRouter = require("./api/segnalazioni");
const login = require("./login");
const register = require("./register");

const app = config.express();

app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());

app.use("/api/segnalazioni", segnalazioniRouter);
app.use("/api/login", login);
app.use("/api/register", register);

app.listen(config.PORT, () => {
  console.log("[BACKEND] Start listening on port:" + config.PORT);
});
