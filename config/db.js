// const { Sequelize,DataTypes } = require('sequelize');

// const sequelize = new Sequelize('prajaktanewdb', 'root', 'Prajakta@01', {
//   host: 'localhost',
//   // logging:false, 
//   dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// let db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.contact = require("../model/contact")(DataTypes,sequelize);
// db.user = require("../model/user")(DataTypes,sequelize);

// db.sequelize.sync({});
// module.exports = db;


require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // disable query logs
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.contact = require("../model/contact")(sequelize, DataTypes);
db.user = require("../model/user")(sequelize, DataTypes);

db.sequelize.sync({});
module.exports = db;
