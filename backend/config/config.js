
const config = {};
require("fix-esm").register();
config.baseUrl = "http://keycloak.inbook.local:8080";
config.express = require("express");
config.session = require("express-session");
config.path = require("path");
config.cookieParser = require("cookie-parser");
config.bodyParser = require("body-parser");
config.rateLimit = require("express-rate-limit");
config.jwt = require("jsonwebtoken");
config.Sequelize = require("sequelize");
config.Keycloak = require('keycloak-connect');
config.fs = require("node:fs");
config.KcAdminClient= require("@keycloak/keycloak-admin-client").default;
config.kcAdminClient = new config.KcAdminClient();
config.kcAdminClient.setConfig({ realmName: "inbook",
                                 baseUrl: config.baseUrl});

config.memoryStore = new config.session.MemoryStore();
config.keycloak = new config.Keycloak({ store: config.memoryStore,onLoad: 'login-required', checkLoginIframe: false });

config.frontend_path = config.path.normalize(process.cwd() + "/frontend_nuovo/"); 
config.db_path = config.path.normalize(process.cwd() + "/backend/database/"); 

require("dotenv").config({
  path: config.path.normalize(process.cwd() + "/backend/config/.env"),
});

config.DB_HOST = process.env.DB_HOST;
config.DB_USER = process.env.DB_USER;
config.DB_PASSWORD = process.env.DB_PASSWORD;
config.DB_NAME = process.env.DB_NAME;
config.SECRET = process.env.SECRET;
config.DB_PORT = process.env.DB_PORT;
config.PORT = 4000; 
config.apiLimiter = {
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};
config.credentials = {
  grantType: 'client_credentials',
  clientId:'nodejs',
  clientSecret: 'ad5jmaHyrx8amCnPLfQ1VcFvXfZTWGIu',
  offlineToken: true
};

module.exports = config;
