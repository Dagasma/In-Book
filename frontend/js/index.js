const config = require("../config/config");
const login = require("./login");
const register = require("./register");
const home = require("./home");

const app = config.express();

app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());

app.use("/", home);
app.use("/", login);
app.use("/", register);

app.listen(config.PORT, () => {
  console.log("[FRONTEND] Start listening on port:" + config.PORT);
});
