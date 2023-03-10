const config = require("../../config/config");
const initModels = require("./init-models");


sequelize = new config.Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true
    },
   // logging: false
  });



const db = {};



db.Sequelize = config.Sequelize;

db.sequelize = sequelize;

db.models = initModels(db.sequelize,db.Sequelize);

module.exports = db;
