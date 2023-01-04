module.exports = app => {
    const users = require("../controllers/Utente_controller.js");
    

    var router = require("express").Router();
    
    // Create a new User/Fornitore
    router.post("/", users.create);

    // Retrieve all User by tipo
    router.get("/", users.findAll);
  
     //Retrieve a single User by id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
//     // // Delete a users with id
    router.delete("/:id", users.delete);
  
//     // // Delete all users
    router.delete("/", users.deleteAll);


    app.use('/api/Users', router);
   };