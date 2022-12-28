const config = require("../config/config");
const router = config.express.Router();

router.use(
  config.session({
    secret: config.SECRET,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //One day
    saveUninitialized: true,
  })
);
router.use(config.bodyParser.json());
router.use(config.cookieParser(config.SECRET));
router.use(config.express.urlencoded({ extended: true }));

router.post("/", function (request, response) {
  if (
    request.body.password == undefined ||
    request.body.email == undefined ||
    request.body.username == undefined ||
    request.body.name == undefined ||
    request.body.surname == undefined
  ) {
    // Bad request wrong values
    response.status(400).json("Missing value!");
    return;
  }
  if (request.body.password != request.body.rpassword) {
    response.status(400).json("Password mismatch");
    return;
  }
  config.pool.query(
    "SELECT email FROM utente WHERE email = ? OR username= ?",
    [request.body.email,request.body.username],
    function (error, results) {
      if (error) {
        response.status(500).json(error);
        return;
      }
      if (results.length == 0) {
        // Insert into database data
        const token = config.jwt.sign(
          {
            username: request.body.username,
            email: request.body.email,
          },
          config.SECRET
        );
        // Insertion NULL as first parameter to trigger autoincrement ID
        config.pool.query(
          "INSERT INTO utente(nome,cognome,email,username,password,tipo) VALUES (?,?,?,?,?,'BASE')",
          [
            request.body.name,
            request.body.surname,
            request.body.email,
            request.body.username,
            request.body.password,
          ],
          function (error, results) {
            if (error) {
              response.status(500).json(error);
              return;
            }
            response.status(201).json({ token: token });
          }
        );
      }
      // Conflict: Email alredy exists
      else {
        response.status(409).json("Email and/or username alredy exists");
      }
    }
  );
});

router.get("/", function (request, response) {
  // Render login template
  response.sendFile(config.frontend_path+"/html/register.html");
});

module.exports = router;
