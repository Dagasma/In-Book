const config = {};
config.path = require("path");
config.fs = require("fs");
do{
    require("dotenv").config({
    path: config.path.normalize("/server/.env"),
    override: true
    });
  }while(process.env.ROLE_ID === undefined ||  process.env.SECRET_ID === undefined);
  
  var options = {
    apiVersion: "v1", // default
    endpoint: "http://vault:8200",
    // optional client token; can be fetched after valid initialization of the server
  };
  
  var vault = require("node-vault")(options);
  var db_password = "";
  var db_user = "";
  var secret = "";


  vault.approleLogin({
    role_id: process.env.ROLE_ID,
    secret_id: process.env.SECRET_ID,
  })
  .then(async (result) => {
    vault.token = result.auth.client_token;
    await vault.read("kv_inbook/user").then((res) => {
        db_password = res.data.password;
        db_user = res.data.user;
    });
    await vault.read("kv_inbook/keycloak").then((res) => {
        secret = res.data.secret;
    });
    
    let segreti = { 
        DB_PASSWORD: db_password,
        DB_USER: db_user, 
        SECRET: secret
    };
     
    console.log("sto facnedo")
    let data = JSON.stringify(segreti);
    config.fs.writeFileSync('./backend/config/segreti.json', data);

  })
  .catch(console.error);
