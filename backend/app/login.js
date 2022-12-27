//da  aggiustare, bisogna usare il pattern api ed il modulo config

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
  //If user has already logged in (There is an Authorization header with the token), so verify the token
  
  if(request.headers.authorization){ 
    token_received = request.headers.authorization.split(' ')[1]; //Eliminates Bearer
    console.log('token received:', token_received)
    try{
      decoded = config.jwt.verify(token_received,config.SECRET);
      response.status(200).json(["Already logged in ", decoded]);
      return
    }
    catch(error){
      console.log(error)
      response.status(401).json("Wrong Authorization token");
      return
    }
  }


  // Capture the input fields
  const username = request.body.username;
  const password = request.body.password;

  // Ensure the input fields exists and are not empty
  
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    config.pool.query(
      "SELECT password,email FROM utente WHERE username = ?",
      [username],
      function (error, results) {
        // If there is an issue with the query, output the error
        if (error) {
          console.log(error);
          response.status(500).json(error);
          return;
        }
        // If the account exists
        if (results.length != 0 && results[0].password == password) {
          // Authenticate the user
          const token = config.jwt.sign(
            {
              username: username,
              email: results[0].email,
            },
            config.SECRET
          );
          response.status(200).json({ token: token });
        } else {
          response.status(409).json("User/password wrong!");
        }
      }
    );
  } else {
    response.status(400).json("Error value(s) missing");
  }
});

module.exports = router;
