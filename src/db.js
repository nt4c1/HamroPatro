//postgres data base connection
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "school_db",
  "postgres",
  "ankit",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;