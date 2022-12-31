// const { request } = require("express");
// var config = require("../../config/config");
// const router = config.express.Router();

// router.get("/", (req, res) => {
//   if (req.body.user != undefined) {
//     config.pool.query(
//       "SELECT * FROM SEGNALAZIONE WHERE username=?",
//       (error, results) => {
//         if (error) {
//           res.status(500).json(error);
//           return;
//         }
//         res.status(200).json(results);
//       }
//     );
//   } else {
//     config.pool.query("SELECT * FROM SEGNALAZIONE", (error, results) => {
//       if (error) {
//         response.status(500).json(error);
//         return;
//       }
//       res.status(200).json(results);
//     });
//   }
// });

// module.exports = router;
