//student model
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define("Student", {
  name: DataTypes.STRING,
  classNumber: DataTypes.INTEGER,
  section: DataTypes.STRING,
  rollNumber: DataTypes.INTEGER,
  contactDetails: DataTypes.STRING,
});

module.exports = Student;
