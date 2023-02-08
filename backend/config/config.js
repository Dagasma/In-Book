const config = {};
require("fix-esm").register();
config.baseUrl = "https://inbook.azurewebsites.net";
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
config.frontend_path = config.path.normalize(process.cwd() + "/server/frontend/"); 
config.db_path = config.path.normalize(process.cwd() + "/server/backend/database/"); 

require("dotenv").config({
  path: config.path.normalize("/server/.env"),
  override: true
  });


let rawdata = config.fs.readFileSync("segreti.json");
const dati_vault = JSON.parse(rawdata);
config.SECRET = dati_vault.SECRET;
config.DB_PASSWORD = dati_vault.DB_PASSWORD;
config.DB_USER = dati_vault.DB_USER;

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


