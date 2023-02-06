
const config = {};
require("fix-esm").register();
config.baseUrl = "http://inbook.local";
config.express = require("express");
config.session = require("cookie-session");
config.path = require("path");
config.cookieParser = require("cookie-parser");
config.bodyParser = require("body-parser");
config.rateLimit = require("express-rate-limit");
config.Sequelize = require("sequelize");
config.Keycloak = require('keycloak-connect');
config.fs = require("node:fs");
config.KcAdminClient= require("@keycloak/keycloak-admin-client").default;
config.kcAdminClient = new config.KcAdminClient();
config.kcAdminClient.setConfig({ realmName: "inbook",
                                 baseUrl: config.baseUrl});

config.keycloak = new config.Keycloak({onLoad: 'login-required', checkLoginIframe: false });
config.frontend_path = config.path.normalize(process.cwd() + "/frontend/"); 
config.db_path = config.path.normalize(process.cwd() + "/backend/database/"); 

do{
  require("dotenv").config({
  path: config.path.normalize("/.env"),
  override: true
  });

}while(process.env.ROLE_ID === undefined ||  process.env.SECRET_ID === undefined);


var options = {
  apiVersion: "v1", // default
  endpoint: "http://vault:8200",
  // optional client token; can be fetched after valid initialization of the server
};

// get new instance of the client
var vault = require("node-vault")(options);

config.funzione  = async () => {
  const result = await vault.approleLogin({
      role_id: process.env.ROLE_ID,
      secret_id: process.env.SECRET_ID,
  })

  vault.token = result.auth.client_token;

  await vault.read("kv_inbook/user").then((res) => {
          config.DB_PASSWORD = res.data.password;
          config.DB_USER = res.data.user;
      });
  await vault.read("kv_inbook/keycloak").then((res) => {
          config.SECRET = res.data.secret;
  });

  console.log(config.DB_USER,config.DB_PASSWORD," prese le cred")

}


config.DB_HOST = process.env.DB_HOST;
config.DB_NAME = process.env.DB_NAME;
config.DB_PORT = process.env.DB_PORT;
config.PORT = 4000; 
config.apiLimiter = {
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};
config.credentials = {
  grantType: 'client_credentials',
  clientId:'nodejs',
  clientSecret: config.SECRET,
  offlineToken: true
};

module.exports = config;
