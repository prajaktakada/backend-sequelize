require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // disable query logs
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

connectDB();

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require("./model/contact")(sequelize, DataTypes);
db.user = require("./model/user")(sequelize, DataTypes);

db.sequelize.sync({});
module.exports = db;
