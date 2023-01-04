const config = {};

config.express = require("express");
config.session = require("express-session");
config.path = require("path");
config.cookieParser = require("cookie-parser");
config.bodyParser = require("body-parser");
config.rateLimit = require("express-rate-limit");
config.jwt = require("jsonwebtoken");
config.Sequelize = require("sequelize");
config.Keycloak = require('keycloak-connect');


config.memoryStore = new config.session.MemoryStore();
config.keycloak = new config.Keycloak({ store: config.memoryStore });

config.frontend_path = config.path.normalize(process.cwd() + "/frontend/html/"); 

require("dotenv").config({
  path: config.path.normalize(process.cwd() + "/backend/config/.env"),
});

config.DB_HOST = process.env.DB_HOST;
config.DB_USER = process.env.DB_USER;
config.DB_PASSWORD = process.env.DB_PASSWORD;
config.DB_NAME = process.env.DB_NAME;
config.SECRET = process.env.SECRET;
config.DB_PORT = process.env.DB_PORT;
config.PORT = 8080; 
config.apiLimiter = {
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

module.exports = config;
