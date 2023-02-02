
const config = {};
require("fix-esm").register();
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
config.baseUrl = "https://inbook.azurewebsites.net";
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
config.frontend_path = config.path.normalize(process.cwd() + "/frontend/"); 
config.db_path = config.path.normalize(process.cwd() + "/backend/database/"); 

require("dotenv").config({
  path: config.path.normalize(process.cwd() + "/backend/config/.env"),
});

async function retrieve() {
    const credential = new DefaultAzureCredential();
  
    const keyVaultName = "inbookvault";
    const url = "https://" + keyVaultName + ".vault.azure.net";
    const client = new SecretClient(url, credential);
  
    // Read the secret we created
    config.SECRET = await client.getSecret('client');
    config.DB_PASSWORD = await client.getSecret('dbpassword');
    console.log("secret: ", secret);
  }

retrieve();
config.DB_HOST = process.env.DB_HOST;
config.DB_USER = process.env.DB_USER;
config.DB_NAME = process.env.DB_NAME;
config.DB_PORT = process.env.DB_PORT;
config.PORT = 4000; 
config.apiLimiter = {
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};


module.exports = config;
