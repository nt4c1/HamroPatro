//teacher model
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Teacher = sequelize.define("Teacher", {
  name: DataTypes.STRING,
  contactDetails: DataTypes.STRING,
});

module.exports = Teacher;
